export type EmployeeRole =
  | "Software Developer"
  | "Product Designer"
  | "Mobile Developer"
  | "Backend Engineer"
  | "QA Engineer"
  | "DevOps Engineer"
  | "Project Manager"
  | "Data Analyst";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: EmployeeRole;
  hasAvatar?: boolean;
}

export type SettingsTab = "profile" | "contacts" | "teams" | "preference";
