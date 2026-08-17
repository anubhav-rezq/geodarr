export type SeverityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type IncidentCategory = 
  | 'Pothole'
  | 'Road Crack'
  | 'Road Damage'
  | 'Waterlogging'
  | 'Drainage'
  | 'Bridge Damage'
  | 'Street Infrastructure'
  | 'Other';

export type ReportStatus = 
  | 'Submitted'
  | 'AI Analyzed'
  | 'Verified'
  | 'Assigned'
  | 'Inspection'
  | 'Repair'
  | 'Resolved';

export type AccountType = 'Citizen' | 'Field Worker' | 'Government';

export interface ReportItem {
  id: string;
  category: IncidentCategory;
  title: string;
  description: string;
  visualSeverity: number; // 0 - 100
  contextualRisk: number; // 0 - 100
  priorityScore: number; // 0 - 100
  aiConfidence: number; // 0 - 100
  severityLevel: SeverityLevel;
  location: {
    city: string;
    state: string;
    ward: string;
    landmark: string;
    lat: number;
    lng: number;
  };
  status: ReportStatus;
  dataSource: 'Citizen App' | 'Drone Survey' | 'Patrol Camera' | 'Satellite InSAR' | 'IoT Sensor';
  submittedAt: string;
  updatedAt: string;
  imageUrl: string;
  reportedBy: string;
  assignedOfficer?: string;
  inspectionNotes?: string;
  estimatedRepairCost?: string;
  timeline: {
    step: ReportStatus;
    completed: boolean;
    timestamp?: string;
    note?: string;
  }[];
  riskFactors?: string[];
  weatherCondition?: string;
  trafficLoad?: 'Low' | 'Moderate' | 'High' | 'Heavy Freight';
}

export interface MapMarkerItem {
  id: string;
  reportId: string;
  title: string;
  category: IncidentCategory;
  severityLevel: SeverityLevel;
  severityScore: number;
  priorityScore: number;
  aiConfidence: number;
  lat: number;
  lng: number;
  xPercent: number; // For custom vector GIS canvas
  yPercent: number; // For custom vector GIS canvas
  locationText: string;
  status: ReportStatus;
  source: string;
  imageUrl: string;
  riskZone: string;
}

export interface InfrastructureAsset {
  id: string;
  name: string;
  type: string;
  zone: string;
  healthScore: number;
  activeIssues: number;
  criticalIssues: number;
  lastInspectionDate: string;
  nextScheduledReview: string;
  failureRiskNext30Days: number;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  accountType: AccountType;
  department?: string;
  badgeId?: string;
  avatarUrl: string;
  totalReports: number;
  verifiedReports: number;
  resolvedReports: number;
  criticalReports: number;
  joinedDate: string;
}

export interface AIAnalysisResult {
  detectedCategory: IncidentCategory;
  visualSeverity: number;
  contextualRisk: number;
  finalPriority: number;
  aiConfidence: number;
  classification: SeverityLevel;
  detectedFeatures: string[];
  recommendation: string;
  failureProbability30d: number;
  riskFactors: string[];
}
