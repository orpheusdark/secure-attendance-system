export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export const theme = {
  colors: {
    background: '#0B1020',
    surface: '#111827',
    elevated: '#161F32',
    primary: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    live: '#06B6D4',
    muted: '#94A3B8',
    text: '#E6EEF3',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
    hero: 36,
    title: 22,
    base: 16,
    meta: 12,
  },
} as const;

export type ConsoleNavItem = {
  label: string;
  href: string;
  description: string;
  badge?: string;
};

export type EnterpriseMetric = {
  label: string;
  value: string;
  delta: string;
  tone: 'emerald' | 'cyan' | 'amber' | 'rose';
};

export type LiveSignal = {
  label: string;
  value: string;
  tone: 'emerald' | 'cyan' | 'amber' | 'rose';
};

export type FeedItem = {
  title: string;
  detail: string;
  time: string;
  severity: 'low' | 'medium' | 'high';
};

export type SessionRecord = {
  name: string;
  status: 'live' | 'refreshing' | 'locked';
  scans: number;
  trust: number;
};

export type DepartmentRecord = {
  name: string;
  attendance: number;
  risk: number;
};

export type MobileTab = {
  label: string;
  route: string;
  icon: string;
};

export const consoleNavigation: ConsoleNavItem[] = [
  { label: 'Dashboard', href: '/dashboard', description: 'Live operations and enterprise metrics', badge: 'Live' },
  { label: 'Sessions', href: '/dashboard/sessions', description: 'QR sessions, scan volume, and token health' },
  { label: 'Attendance', href: '/dashboard/attendance', description: 'Live records, filters, and trust scores' },
  { label: 'Analytics', href: '/dashboard/analytics', description: 'Charts, trends, and cohort comparisons' },
  { label: 'Fraud Center', href: '/dashboard/fraud-center', description: 'Threat feed, replay checks, and anomaly alerts', badge: 'Radar' },
  { label: 'Notifications', href: '/dashboard/notifications', description: 'Escalations, approvals, and live updates' },
  { label: 'Departments', href: '/dashboard/departments', description: 'Institution performance by faculty' },
  { label: 'Settings', href: '/dashboard/settings', description: 'Security, biometrics, and integrations' },
  { label: 'Admin tools', href: '/dashboard/users', description: 'Users, roles, and compliance controls' },
  { label: 'Reports', href: '/dashboard/reports', description: 'Exports, audit trails, and compliance packs' },
] as const;

export const enterpriseMetrics: EnterpriseMetric[] = [
  { label: 'Attendance integrity', value: '98.4%', delta: '+2.1% this week', tone: 'emerald' },
  { label: 'Active QR sessions', value: '24', delta: '8 refreshing now', tone: 'cyan' },
  { label: 'Fraud attempts blocked', value: '19', delta: '+4 from yesterday', tone: 'rose' },
  { label: 'Median validation', value: '420 ms', delta: 'Below SLA by 38%', tone: 'amber' },
] as const;

export const liveSignals: LiveSignal[] = [
  { label: 'System status', value: 'Trusted online', tone: 'emerald' },
  { label: 'Institution', value: 'Nexus University', tone: 'cyan' },
  { label: 'Fraud radar', value: '2 critical anomalies', tone: 'rose' },
  { label: 'Scan freshness', value: 'Rolling every 18 s', tone: 'amber' },
] as const;

export const fraudFeed: FeedItem[] = [
  { title: 'Replay attempt blocked', detail: 'Token re-use detected from an expired device fingerprint.', time: '1 min ago', severity: 'high' },
  { title: 'GPS drift warning', detail: 'Student device deviated 180m from approved classroom geofence.', time: '5 min ago', severity: 'medium' },
  { title: 'Biometric mismatch', detail: 'Face confidence below policy threshold during late check-in.', time: '9 min ago', severity: 'high' },
  { title: 'Trust restored', detail: 'QR refresh and liveness confirmation completed for Block B.', time: '12 min ago', severity: 'low' },
] as const;

export const sessionRecords: SessionRecord[] = [
  { name: 'Level 200 Design Studio', status: 'live', scans: 84, trust: 97 },
  { name: 'Faculty Council Briefing', status: 'refreshing', scans: 42, trust: 93 },
  { name: 'Network Security Lab', status: 'locked', scans: 31, trust: 99 },
  { name: 'MBA Morning Cohort', status: 'live', scans: 58, trust: 95 },
] as const;

export const departmentRecords: DepartmentRecord[] = [
  { name: 'Engineering', attendance: 96, risk: 11 },
  { name: 'Business', attendance: 92, risk: 18 },
  { name: 'Science', attendance: 89, risk: 23 },
  { name: 'Humanities', attendance: 97, risk: 7 },
] as const;

export const mobileTabs: MobileTab[] = [
  { label: 'Home', route: '/(tabs)/dashboard', icon: 'home' },
  { label: 'Scan', route: '/(tabs)/scan', icon: 'qr-code' },
  { label: 'Analytics', route: '/(tabs)/analytics', icon: 'stats-chart' },
  { label: 'Notifications', route: '/(tabs)/notifications', icon: 'notifications' },
  { label: 'Profile', route: '/(tabs)/profile', icon: 'person' },
] as const;

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}
