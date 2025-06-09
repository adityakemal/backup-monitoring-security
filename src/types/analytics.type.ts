export interface AnalyticsEmployeeDailyInsight {
  id: number;
  employee: Employee;
  date: string;
  risk_score: number;
  productivity_score: number;
  summary: string;
  behavioral_patterns: string[];
  violations: any[];
}

export interface Employee {
  id: number;
  full_name: string;
  role: string;
  groups: Group[];
  devices: Device[];
}

export interface Group {
  id: number;
  name: string;
  description: string;
}

export interface Device {
  id: number;
  device_identifier: string;
  device_name: string;
  description: string;
}
