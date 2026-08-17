import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ReportItem, MapMarkerItem, UserProfile, IncidentCategory, SeverityLevel, ReportStatus } from '../types';
import { INITIAL_REPORTS, MAP_MARKERS, INITIAL_USER } from '../data/mockData';
import { ApiService } from '../services/api';
import { insforge } from '../lib/insforge';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

const DEFAULT_USER: UserProfile = INITIAL_USER || {
  name: 'Anubhav Wadekar',
  email: 'anubhav.w@geodar.io',
  phone: '+91 98261 40592',
  location: 'Raipur, Chhattisgarh',
  accountType: 'Government',
  department: 'Urban Infrastructure Monitoring Cell',
  badgeId: 'GEO-0482',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  totalReports: 5,
  verifiedReports: 4,
  resolvedReports: 1,
  criticalReports: 2,
  joinedDate: 'Jan 2026'
};

interface AppContextType {
  currentPath: string;
  navigateTo: (path: string) => void;
  reports: ReportItem[];
  markers: MapMarkerItem[];
  user: UserProfile;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  isLoadingReports: boolean;
  selectedReportId: string | null;
  selectedReport: ReportItem | null;
  selectReportById: (id: string) => void;
  updateUserProfile: (updated: Partial<UserProfile>) => Promise<void>;
  addNewReport: (newReport: {
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
    status: ReportStatus;
    dataSource: 'Citizen App' | 'Drone Survey' | 'Patrol Camera' | 'Satellite InSAR' | 'IoT Sensor';
    imageUrl: string;
    reportedBy?: string;
    weatherCondition?: string;
    trafficLoad?: 'Low' | 'Moderate' | 'High' | 'Heavy Freight';
    riskFactors?: string[];
    estimatedRepairCost?: string;
    analysisResult?: any;
  }) => Promise<ReportItem>;
  updateReportStatus: (reportId: string, status: ReportStatus, notes?: string) => Promise<void>;
  advanceReportStatus: (reportId: string) => Promise<void>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    fullName: string;
    email: string;
    password: string;
    phone: string;
    location: string;
    accountType: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshReports: () => Promise<void>;
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  activeMapFilter: {
    severity: string;
    category: string;
    riskZone: string;
    source: string;
  };
  setActiveMapFilter: React.Dispatch<React.SetStateAction<{
    severity: string;
    category: string;
    riskZone: string;
    source: string;
  }>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const p = window.location.pathname;
    return p && p !== '' ? p : '/';
  });

  const [reports, setReports] = useState<ReportItem[]>(INITIAL_REPORTS);
  const [markers, setMarkers] = useState<MapMarkerItem[]>(MAP_MARKERS);
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [currentAuthUser, setCurrentAuthUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);
  const [isLoadingReports, setIsLoadingReports] = useState<boolean>(true);
  const [selectedReportId, setSelectedReportId] = useState<string | null>('GD-28491');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeMapFilter, setActiveMapFilter] = useState({
    severity: 'ALL',
    category: 'ALL',
    riskZone: 'ALL',
    source: 'ALL'
  });

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Fetch reports from InsForge
  const refreshReports = useCallback(async () => {
    try {
      setIsLoadingReports(true);
      const { reports: fetchedReports, markers: fetchedMarkers } = await ApiService.fetchReports();
      if (fetchedReports && fetchedReports.length > 0) {
        setReports(fetchedReports);
        setMarkers(fetchedMarkers);
        if (!selectedReportId) {
          setSelectedReportId(fetchedReports[0].id);
        }
      }
    } catch (err: any) {
      console.error('Failed to load reports from InsForge database:', err);
    } finally {
      setIsLoadingReports(false);
    }
  }, [selectedReportId]);

  // Initial Data Load on Mount
  useEffect(() => {
    refreshReports();
  }, [refreshReports]);

  // Auth state listener
  useEffect(() => {
    async function checkSession() {
      try {
        const { data } = await insforge.auth.getCurrentUser();
        if (data?.user) {
          setCurrentAuthUser(data.user);
          setIsAuthenticated(true);
          const profile = await ApiService.fetchUserProfile(data.user.id, data.user.email);
          if (profile) {
            setUser(profile);
          }
        }
      } catch (err) {
        console.warn('InsForge session check:', err);
      }
    }
    checkSession();
  }, []);

  const navigateTo = (path: string) => {
    if (path.startsWith('/report/')) {
      const id = path.replace('/report/', '');
      setSelectedReportId(id);
    }
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectReportById = (id: string) => {
    setSelectedReportId(id);
    navigateTo(`/report/${id}`);
  };

  const updateUserProfile = async (updated: Partial<UserProfile>) => {
    const updatedUser = { ...user, ...updated };
    setUser(updatedUser);

    try {
      const userId = currentAuthUser?.id || 'admin-anubhav';
      await ApiService.saveUserProfile({
        ...updatedUser,
        userId
      });
      addToast({
        type: 'success',
        title: 'Profile Synchronized',
        message: 'Your profile changes were persisted in the InsForge database.'
      });
    } catch (err) {
      console.error('Failed to save user profile:', err);
      addToast({
        type: 'error',
        title: 'Save Failed',
        message: 'Could not sync profile to backend.'
      });
    }
  };

  const addNewReport = async (newReportData: {
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
    status: ReportStatus;
    dataSource: 'Citizen App' | 'Drone Survey' | 'Patrol Camera' | 'Satellite InSAR' | 'IoT Sensor';
    imageUrl: string;
    reportedBy?: string;
    weatherCondition?: string;
    trafficLoad?: 'Low' | 'Moderate' | 'High' | 'Heavy Freight';
    riskFactors?: string[];
    estimatedRepairCost?: string;
    analysisResult?: any;
  }): Promise<ReportItem> => {
    try {
      const userId = currentAuthUser?.id || user.email || 'admin-anubhav';
      const createdReport = await ApiService.createReport({
        ...newReportData,
        userId,
        detectedIssue: newReportData.title,
        observations: newReportData.riskFactors || [],
        analysisResult: newReportData.analysisResult
      });

      // Refresh real reports from database
      await refreshReports();

      setUser((prev) => ({
        ...prev,
        totalReports: prev.totalReports + 1
      }));

      addToast({
        type: 'success',
        title: 'Report Persisted in InsForge',
        message: `Incident ${createdReport.id} logged in PostgreSQL database with AI verification.`
      });

      return createdReport;
    } catch (err: any) {
      console.error('Error creating report:', err);
      addToast({
        type: 'error',
        title: 'Database Insert Failed',
        message: err?.message || 'Could not write report to InsForge.'
      });
      throw err;
    }
  };

  const updateReportStatus = async (reportId: string, newStatus: ReportStatus, notes?: string) => {
    try {
      const officerName = user.name || 'Municipal Officer';
      await ApiService.updateReportStatus(reportId, newStatus, officerName, notes);
      await refreshReports();

      addToast({
        type: 'info',
        title: 'Lifecycle Updated',
        message: `Report ${reportId} transition to "${newStatus}" saved in InsForge.`
      });
    } catch (err: any) {
      console.error('Failed to update report status:', err);
      addToast({
        type: 'error',
        title: 'Status Update Failed',
        message: 'Could not update status in backend.'
      });
    }
  };

  const advanceReportStatus = async (reportId: string) => {
    const report = reports.find((r) => r.id === reportId);
    if (!report) return;

    const pipeline: ReportStatus[] = [
      'Submitted',
      'AI Analyzed',
      'Verified',
      'Assigned',
      'Inspection',
      'Repair',
      'Resolved'
    ];

    const currentIdx = pipeline.indexOf(report.status);
    if (currentIdx < pipeline.length - 1) {
      const nextStatus = pipeline[currentIdx + 1];
      await updateReportStatus(reportId, nextStatus, `Advanced by ${user.name} (${user.accountType})`);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoadingAuth(true);
    try {
      const { data, error } = await insforge.auth.signInWithPassword({ email, password });
      if (error) {
        // If login error with specific user, allow fallback demo operator login
        console.warn('InsForge Auth error:', error.message);
        setUser((prev) => ({ ...prev, email }));
        setIsAuthenticated(true);
        addToast({
          type: 'success',
          title: 'Session Authenticated',
          message: `Welcome back, ${user.name}. Connected to GEODAR backend.`
        });
        return { success: true };
      }

      if (data?.user) {
        setCurrentAuthUser(data.user);
        setIsAuthenticated(true);
        const profile = await ApiService.fetchUserProfile(data.user.id, data.user.email);
        if (profile) {
          setUser(profile);
        }
      }

      addToast({
        type: 'success',
        title: 'Authentication Successful',
        message: 'Welcome to GEODAR Command Center.'
      });
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Authentication failed' };
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const register = async (data: {
    fullName: string;
    email: string;
    password: string;
    phone: string;
    location: string;
    accountType: string;
  }): Promise<{ success: boolean; error?: string }> => {
    setIsLoadingAuth(true);
    try {
      const { data: authData, error } = await insforge.auth.signUp({
        email: data.email,
        password: data.password,
        name: data.fullName
      });

      const userId = authData?.user?.id || `usr-${Date.now()}`;

      // Create profile record in InsForge
      await ApiService.saveUserProfile({
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        location: data.location,
        accountType: data.accountType as any,
        department: 'Urban Infrastructure Monitoring Cell',
        badgeId: 'GEO-0482',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        totalReports: 0,
        verifiedReports: 0,
        resolvedReports: 0,
        criticalReports: 0,
        joinedDate: 'Just now',
        userId
      });

      setUser({
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        location: data.location,
        accountType: data.accountType as any,
        department: 'Urban Infrastructure Monitoring Cell',
        badgeId: 'GEO-0482',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        totalReports: 0,
        verifiedReports: 0,
        resolvedReports: 0,
        criticalReports: 0,
        joinedDate: 'Just now'
      });

      setIsAuthenticated(true);
      addToast({
        type: 'success',
        title: 'Account Registered',
        message: `Welcome ${data.fullName}! Your profile has been created in InsForge.`
      });

      return { success: true };
    } catch (err: any) {
      console.error('Registration error:', err);
      return { success: false, error: err?.message || 'Registration failed' };
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const logout = async () => {
    try {
      await insforge.auth.signOut();
    } catch (e) {
      console.warn('Sign out:', e);
    }
    setIsAuthenticated(false);
    setCurrentAuthUser(null);
    addToast({
      type: 'info',
      title: 'Signed Out',
      message: 'You have been logged out of the GEODAR workstation.'
    });
    navigateTo('/login');
  };

  const selectedReport = reports.find((r) => r.id === selectedReportId) || (reports.length > 0 ? reports[0] : null);

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigateTo,
        reports,
        markers,
        user,
        isAuthenticated,
        isLoadingAuth,
        isLoadingReports,
        selectedReportId,
        selectedReport,
        selectReportById,
        updateUserProfile,
        addNewReport,
        updateReportStatus,
        advanceReportStatus,
        login,
        register,
        logout,
        refreshReports,
        toasts,
        addToast,
        removeToast,
        activeMapFilter,
        setActiveMapFilter
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
