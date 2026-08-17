import { insforge, uploadToStorage } from '../lib/insforge';
import { ReportItem, MapMarkerItem, UserProfile, IncidentCategory, SeverityLevel, ReportStatus, InfrastructureAsset } from '../types';

/**
 * Coordinate mapping to canvas percentage for Raipur GIS Map
 */
function coordinatesToCanvasPercent(lat: number, lng: number): { xPercent: number; yPercent: number } {
  // Raipur bounds approx: Lat 21.20 to 21.28, Lng 81.60 to 81.70
  const minLat = 21.20;
  const maxLat = 21.28;
  const minLng = 81.60;
  const maxLng = 81.70;

  let x = ((lng - minLng) / (maxLng - minLng)) * 100;
  let y = ((maxLat - lat) / (maxLat - minLat)) * 100;

  // Clamp within visible map region 15% - 85%
  x = Math.max(15, Math.min(85, x));
  y = Math.max(15, Math.min(85, y));

  return { xPercent: Math.round(x), yPercent: Math.round(y) };
}

/**
 * Convert raw database report record into frontend ReportItem
 */
export function formatReportRecord(
  rep: any,
  images: any[] = [],
  analyses: any[] = [],
  history: any[] = []
): ReportItem {
  const repImages = images.filter((img) => img.report_id === rep.id);
  const repAnalysis = analyses.find((a) => a.report_id === rep.id);
  const repHistory = history
    .filter((h) => h.report_id === rep.id)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  const primaryImage = repImages.length > 0
    ? repImages[0].public_or_signed_url
    : 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=900&q=80';

  const defaultSteps: ReportStatus[] = [
    'Submitted',
    'AI Analyzed',
    'Verified',
    'Assigned',
    'Inspection',
    'Repair',
    'Resolved'
  ];

  // Map real status history into timeline steps
  const timeline = defaultSteps.map((step) => {
    const hist = repHistory.find((h) => h.status.toLowerCase() === step.toLowerCase());
    return {
      step,
      completed: Boolean(hist) || isStepPrior(step, rep.status as ReportStatus),
      timestamp: hist?.created_at ? new Date(hist.created_at).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      }) : undefined,
      note: hist?.notes || (step === 'Submitted' ? 'Report logged in GEODAR grid' : undefined)
    };
  });

  const severityLevel = (rep.severity_level?.toUpperCase() || 'MEDIUM') as SeverityLevel;

  return {
    id: rep.report_code || rep.id,
    category: (rep.category || 'Other') as IncidentCategory,
    title: rep.detected_issue || `${rep.category} on ${rep.address ? rep.address.split(',')[0] : 'Municipal Road'}`,
    description: rep.description || 'Infrastructure damage recorded via GEODAR sensor network.',
    visualSeverity: rep.visual_severity || 60,
    contextualRisk: rep.contextual_risk || 55,
    priorityScore: rep.priority_score || 65,
    aiConfidence: rep.ai_confidence || 94,
    severityLevel,
    location: {
      city: 'Raipur',
      state: 'Chhattisgarh',
      ward: rep.ward || 'Ward 34 — Pandri',
      landmark: rep.address || 'Raipur Municipal Area',
      lat: Number(rep.latitude) || 21.2514,
      lng: Number(rep.longitude) || 81.6296
    },
    status: normalizeStatus(rep.status),
    dataSource: (rep.source || 'Citizen App') as any,
    submittedAt: rep.created_at || new Date().toISOString(),
    updatedAt: rep.updated_at || rep.created_at || new Date().toISOString(),
    imageUrl: primaryImage,
    reportedBy: rep.user_id || 'Geodar Operator',
    riskFactors: repAnalysis?.observations || (Array.isArray(rep.ai_observations) ? rep.ai_observations : ['Sub-base moisture risk', 'High transit load']),
    weatherCondition: 'Cloudy, 78% humidity',
    trafficLoad: rep.priority_score > 80 ? 'Heavy Freight' : rep.priority_score > 60 ? 'High' : 'Moderate',
    estimatedRepairCost: rep.visual_severity > 80 ? '₹ 45,000' : '₹ 24,000',
    timeline
  };
}

function normalizeStatus(raw: string): ReportStatus {
  if (!raw) return 'Submitted';
  const clean = raw.trim().toLowerCase();
  if (clean === 'submitted') return 'Submitted';
  if (clean === 'ai analyzed' || clean === 'ai_analyzed' || clean === 'analyzed') return 'AI Analyzed';
  if (clean === 'verified') return 'Verified';
  if (clean === 'assigned') return 'Assigned';
  if (clean === 'inspection') return 'Inspection';
  if (clean === 'repair' || clean === 'in_progress') return 'Repair';
  if (clean === 'resolved' || clean === 'completed') return 'Resolved';
  return 'Submitted';
}

function isStepPrior(step: ReportStatus, currentStatus: ReportStatus): boolean {
  const steps: ReportStatus[] = [
    'Submitted',
    'AI Analyzed',
    'Verified',
    'Assigned',
    'Inspection',
    'Repair',
    'Resolved'
  ];
  const stepIdx = steps.indexOf(step);
  const currentIdx = steps.indexOf(currentStatus);
  return stepIdx <= currentIdx && stepIdx !== -1 && currentIdx !== -1;
}

/**
 * Convert ReportItem into MapMarkerItem
 */
export function formatMapMarker(report: ReportItem): MapMarkerItem {
  const { xPercent, yPercent } = coordinatesToCanvasPercent(report.location.lat, report.location.lng);
  return {
    id: `M-${report.id}`,
    reportId: report.id,
    title: report.title,
    category: report.category,
    severityLevel: report.severityLevel,
    severityScore: report.visualSeverity,
    priorityScore: report.priorityScore,
    aiConfidence: report.aiConfidence,
    lat: report.location.lat,
    lng: report.location.lng,
    xPercent,
    yPercent,
    locationText: `${report.location.landmark}, ${report.location.city}`,
    status: report.status,
    source: report.dataSource,
    imageUrl: report.imageUrl,
    riskZone: report.priorityScore > 80 ? 'Zone 1 — Critical Freight Corridor' : 'Zone 2 — Commercial Arterial'
  };
}

/**
 * Real InsForge Database API Service
 */
export const ApiService = {
  // 1. Fetch All Reports with Associated Data
  async fetchReports(): Promise<{ reports: ReportItem[]; markers: MapMarkerItem[] }> {
    try {
      const { data: reportsData, error: repError } = await insforge.database
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (repError) {
        console.error('Error fetching reports from InsForge:', repError);
        throw repError;
      }

      const { data: imagesData } = await insforge.database
        .from('report_images')
        .select('*');

      const { data: analysisData } = await insforge.database
        .from('report_analysis')
        .select('*');

      const { data: historyData } = await insforge.database
        .from('report_status_history')
        .select('*')
        .order('created_at', { ascending: true });

      const reports: ReportItem[] = (reportsData || []).map((rep: any) =>
        formatReportRecord(rep, imagesData || [], analysisData || [], historyData || [])
      );

      const markers: MapMarkerItem[] = reports.map(formatMapMarker);

      return { reports, markers };
    } catch (err) {
      console.error('ApiService.fetchReports failed:', err);
      throw err;
    }
  },

  // 2. Create a Real Report in InsForge Database
  async createReport(params: {
    category: IncidentCategory;
    title: string;
    description: string;
    visualSeverity: number;
    contextualRisk: number;
    priorityScore: number;
    aiConfidence: number;
    severityLevel: SeverityLevel;
    location: {
      city: string;
      state: string;
      ward: string;
      landmark: string;
      lat: number;
      lng: number;
    };
    imageUrl: string;
    dataSource: string;
    userId: string;
    detectedIssue?: string;
    observations?: string[];
    analysisResult?: any;
  }): Promise<ReportItem> {
    const reportCode = `GD-${Math.floor(10000 + Math.random() * 90000)}`;

    // 1. Insert into reports table
    const { data: insertedReport, error: repErr } = await insforge.database
      .from('reports')
      .insert([
        {
          report_code: reportCode,
          user_id: params.userId,
          category: params.category,
          description: params.description,
          latitude: params.location.lat,
          longitude: params.location.lng,
          address: params.location.landmark,
          ward: params.location.ward,
          status: 'AI Analyzed',
          visual_severity: params.visualSeverity,
          contextual_risk: params.contextualRisk,
          priority_score: params.priorityScore,
          severity_level: params.severityLevel,
          ai_confidence: params.aiConfidence,
          ai_classification: params.severityLevel,
          detected_issue: params.detectedIssue || params.title,
          ai_observations: params.observations || [],
          source: params.dataSource
        }
      ])
      .select();

    if (repErr) {
      console.error('Error inserting report:', repErr);
      throw repErr;
    }

    const reportRow = Array.isArray(insertedReport) ? insertedReport[0] : insertedReport;
    const reportDbId = reportRow?.id;

    // 2. Insert into report_images table
    if (reportDbId && params.imageUrl) {
      await insforge.database.from('report_images').insert([
        {
          report_id: reportDbId,
          storage_path: `reports/${reportCode}/photo.jpg`,
          public_or_signed_url: params.imageUrl,
          image_type: 'primary',
          file_name: `${reportCode}_inspection.jpg`
        }
      ]);
    }

    // 3. Insert into report_analysis table
    if (reportDbId && params.analysisResult) {
      await insforge.database.from('report_analysis').insert([
        {
          report_id: reportDbId,
          model_used: 'gemini-2.5-flash',
          detected_issue: params.analysisResult.detected_issue || params.title,
          classification: params.severityLevel,
          visual_severity: params.visualSeverity,
          ai_confidence: params.aiConfidence,
          observations: params.observations || [],
          structural_integrity_risk: params.analysisResult.structural_integrity_risk || params.visualSeverity,
          traffic_impact_factor: params.analysisResult.traffic_impact_factor || params.contextualRisk,
          weather_vulnerability_factor: params.analysisResult.weather_vulnerability_factor || 80
        }
      ]);
    }

    // 4. Insert into status history
    if (reportDbId) {
      await insforge.database.from('report_status_history').insert([
        {
          report_id: reportDbId,
          status: 'Submitted',
          changed_by: params.userId,
          notes: 'Initial citizen/field camera telemetry uploaded'
        },
        {
          report_id: reportDbId,
          status: 'AI Analyzed',
          changed_by: 'GEODAR GeoAI Engine',
          notes: `Vision model classified as ${params.severityLevel} (${params.aiConfidence}% confidence)`
        }
      ]);
    }

    return formatReportRecord(reportRow, [
      {
        report_id: reportDbId,
        public_or_signed_url: params.imageUrl
      }
    ]);
  },

  // 3. Update Report Status & Record Lifecycle Step
  async updateReportStatus(
    reportCodeOrId: string,
    newStatus: ReportStatus,
    changedBy: string = 'Municipal Officer',
    notes?: string
  ): Promise<void> {
    // First get the report row to get its UUID
    const { data: reps } = await insforge.database
      .from('reports')
      .select('id, report_code')
      .or(`report_code.eq.${reportCodeOrId},id.eq.${reportCodeOrId}`);

    const rep = reps?.[0];
    if (!rep) {
      console.warn('Report not found for status update:', reportCodeOrId);
      return;
    }

    // Update status in reports
    await insforge.database
      .from('reports')
      .update({
        status: newStatus,
        updated_at: new Date().toISOString(),
        ...(newStatus === 'Resolved' ? { resolved_at: new Date().toISOString() } : {})
      })
      .eq('id', rep.id);

    // Insert history row
    await insforge.database.from('report_status_history').insert([
      {
        report_id: rep.id,
        status: newStatus,
        changed_by: changedBy,
        notes: notes || `Advanced to ${newStatus} in municipal pipeline.`
      }
    ]);
  },

  // 4. Fetch User Profile
  async fetchUserProfile(userId: string, email?: string): Promise<UserProfile | null> {
    try {
      const { data: profiles } = await insforge.database
        .from('profiles')
        .select('*')
        .or(`user_id.eq.${userId},email.eq.${email || userId}`);

      const prof = profiles?.[0];
      if (!prof) return null;

      // Count user reports
      const { data: userReps } = await insforge.database
        .from('reports')
        .select('id, status, severity_level')
        .eq('user_id', prof.user_id);

      const totalReports = userReps?.length || 0;
      const verifiedReports = userReps?.filter((r) => r.status === 'Verified' || r.status === 'Assigned' || r.status === 'Resolved').length || 0;
      const resolvedReports = userReps?.filter((r) => r.status === 'Resolved').length || 0;
      const criticalReports = userReps?.filter((r) => r.severity_level === 'CRITICAL').length || 0;

      return {
        name: prof.full_name,
        email: prof.email,
        phone: prof.phone || '+91 98261 40592',
        location: prof.location || 'Raipur, Chhattisgarh',
        accountType: (prof.account_type || 'Government') as any,
        department: 'Urban Infrastructure Monitoring Cell',
        badgeId: 'GEO-0482',
        avatarUrl: prof.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        totalReports,
        verifiedReports,
        resolvedReports,
        criticalReports,
        joinedDate: new Date(prof.created_at || Date.now()).toLocaleDateString('en-IN', {
          month: 'short',
          year: 'numeric'
        })
      };
    } catch (err) {
      console.error('Error fetching user profile:', err);
      return null;
    }
  },

  // 5. Save/Update User Profile
  async saveUserProfile(profile: Partial<UserProfile> & { userId: string }): Promise<void> {
    await insforge.database.from('profiles').upsert([
      {
        user_id: profile.userId,
        full_name: profile.name,
        email: profile.email,
        phone: profile.phone,
        location: profile.location,
        account_type: profile.accountType,
        avatar_url: profile.avatarUrl,
        updated_at: new Date().toISOString()
      }
    ]);
  },

  // 6. Call Server-Side AI Analysis
  async analyzeWithAI(payload: {
    imageData: string;
    category?: string;
    description?: string;
    location?: { lat: number; lng: number; address?: string };
  }) {
    const res = await fetch('/api/ai/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error(`AI analysis server failed with status ${res.status}`);
    }

    const data = await res.json();
    return data;
  },

  // 7. Submit Municipal Client Request / Pilot Inquiry
  async submitClientRequest(params: {
    name: string;
    organization: string;
    email: string;
    phone?: string;
    requestType?: string;
    sector?: string;
    city?: string;
    notes?: string;
    message?: string;
  }) {
    const messageContent = params.message || [
      params.city ? `City/Region: ${params.city}` : '',
      params.notes ? `Requirements: ${params.notes}` : ''
    ].filter(Boolean).join(' | ');

    const { data, error } = await insforge.database.from('client_requests').insert([
      {
        name: params.name,
        organization: params.organization,
        email: params.email,
        phone: params.phone || '',
        request_type: params.sector || params.requestType || 'Pilot Inquiry',
        message: messageContent || 'Municipal deployment inquiry',
        status: 'pending'
      }
    ]);

    if (error) {
      console.error('Error submitting client request:', error);
      throw error;
    }

    return data;
  },

  // 8. Fetch Infrastructure Assets
  async fetchInfrastructureAssets(): Promise<InfrastructureAsset[]> {
    try {
      const { data } = await insforge.database
        .from('infrastructure_assets')
        .select('*');

      if (!data || data.length === 0) return [];

      return data.map((a: any) => ({
        id: a.asset_code,
        name: a.name,
        type: a.type,
        zone: a.ward || 'Raipur City',
        healthScore: a.health_score || 80,
        activeIssues: a.critical_nodes_count || 0,
        criticalIssues: a.failure_risk_30d > 70 ? 2 : 1,
        lastInspectionDate: new Date(a.last_inspected || Date.now()).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),
        nextScheduledReview: 'In 7 days',
        failureRiskNext30Days: a.failure_risk_30d || 20
      }));
    } catch (err) {
      console.error('Error fetching infrastructure assets:', err);
      return [];
    }
  }
};
