import type { EmployeeRole, TeamMember } from "@/features/settings/types";

const ROLES: EmployeeRole[] = [
  "Software Developer",
  "Product Designer",
  "Mobile Developer",
  "Backend Engineer",
  "QA Engineer",
  "DevOps Engineer",
  "Project Manager",
  "Data Analyst",
];

const FIRST_NAMES = [
  "John",
  "Jane",
  "Alex",
  "Sam",
  "Taylor",
  "Jordan",
  "Morgan",
  "Casey",
  "Riley",
  "Avery",
];
const LAST_NAMES = [
  "Doe",
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
];

function pick<T>(list: T[], i: number): T {
  return list[i % list.length];
}

export const TEAM_MEMBERS: TeamMember[] = Array.from(
  { length: 50 },
  (_, index) => {
    const id = (index + 1).toString();
    const first = pick(FIRST_NAMES, index);
    const last = pick(LAST_NAMES, index * 3 + 1);
    const role = pick(ROLES, index * 2);
    return {
      id,
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@expedier.com`,
      phone: `601${(2379658 + index).toString().slice(-7)}`,
      role,
      hasAvatar: index === 8,
    };
  },
);
