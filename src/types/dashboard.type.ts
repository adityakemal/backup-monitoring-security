// Overview Types
export interface DashboardOverview {
  total_activity_logs: number;
  total_app_usage: number;
  total_website_visits: number;
  total_file_access: number;
  total_usb_events: number;
  total_devices: number;
  totalUsers: number;
  activeUsers: number;
  totalActivities: number;
}

// Device Stats Types
export interface DeviceStats {
  device_identifier: string;
  last_seen: string;
  activity_count: number;
  flagged_count: number;
  app_usage_count: number;
  website_visits: number;
  file_operations: number;
  usb_events: number;
  total_activities: number;
}

// Flagged Activity Types
export interface FlaggedActivity {
  id: number;
  timestamp: string;
  window_title: string;
  is_flagged: boolean;
  confidence: number;
  analysis: string;
  keywords: string[];
}

// Keyword Types
export interface KeywordCount {
  keyword: string;
  count: number;
  word?: string;
}

// Screenshot Types
export interface Screenshot {
  timestamp: string;
  window_title: string;
  url: string;
  is_flagged: boolean;
  confidence: number;
  analysis: string;
  keywords: string[];
  path?: string;
}

// Activity Types
export interface ActivityDistribution {
  label: string;
  count: number;
}

// File Operation Types
export interface FileOperation {
  operation: string;
  count: number;
}

// USB Types
export interface UsbSummary {
  action: string;
  count: number;
}

// Website Types
export interface TopWebsite {
  url: string;
  title: string;
  visit_count: number;
  total_duration: number;
  duration?: string;
  visits?: number;
}

// Application Types
export interface TopApp {
  name: string;
  usage_count: number;
  total_duration: number;
  active_time: number;
  idle_time: number;
  used?: number;
  duration?: string;
  activeDuration?: string;
}

// Main Dashboard Response Type
export interface DashboardResponse {
  overview: DashboardOverview;
  device_stats: DeviceStats[];
  recent_flagged: FlaggedActivity[];
  top_keywords: KeywordCount[];
  recent_screenshots: Screenshot[];
  activity_distribution: ActivityDistribution[];
  file_operations: FileOperation[];
  usb_summary: UsbSummary[];
  top_websites: TopWebsite[];
  top_apps: TopApp[];
}

// Dashboard API Response Type
export type DashboardApiResponse = DashboardResponse;
