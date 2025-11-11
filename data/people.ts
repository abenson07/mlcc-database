export type Person = {
  id: string;
  name: string;
  email: string;
  address: string;
  membershipType: "Resident" | "Member" | "Volunteer" | "Partner";
  volunteerInterests: string[];
  isMember: boolean;
  householdId?: string;
};

export const people: Person[] = [
  {
    id: "person-001",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    address: "421 Pine Street, Maplewood",
    membershipType: "Resident",
    volunteerInterests: ["Newsletter Delivery", "Event Setup"],
    isMember: true,
    householdId: "household-001"
  },
  {
    id: "person-002",
    name: "Morgan Lee",
    email: "morgan.lee@example.com",
    address: "77 Cedar Avenue, Maplewood",
    membershipType: "Volunteer",
    volunteerInterests: ["Fundraising", "Community Outreach"],
    isMember: false,
    householdId: "household-002"
  },
  {
    id: "person-003",
    name: "Priya Desai",
    email: "priya.desai@example.com",
    address: "19 Birch Road, Maplewood",
    membershipType: "Member",
    volunteerInterests: ["Event Setup"],
    isMember: true,
    householdId: "household-003"
  },
  {
    id: "person-004",
    name: "Jordan Smith",
    email: "jordan.smith@example.com",
    address: "301 Oak Lane, Maplewood",
    membershipType: "Volunteer",
    volunteerInterests: ["Newsletter Delivery"],
    isMember: false,
    householdId: "household-004"
  },
  {
    id: "person-005",
    name: "Cameron Wu",
    email: "cameron.wu@example.com",
    address: "55 Elm Street, Maplewood",
    membershipType: "Resident",
    volunteerInterests: ["Community Garden", "Event Setup"],
    isMember: true,
    householdId: "household-001"
  }
];

// TODO: Replace mock data with API integration once backend endpoints are available.

