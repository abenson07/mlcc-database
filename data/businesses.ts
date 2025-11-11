export type SponsorshipLevel = "Gold" | "Silver" | "Bronze" | "In-Kind";
export type BusinessStatus = "activeMember" | "pastSponsor" | "yetToSupport";

export type Business = {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  sponsorshipTags: SponsorshipLevel[];
  linkedEvents: string[];
  address: string;
  notes: string;
  status: BusinessStatus;
};

export const businesses: Business[] = [
  {
    id: "business-001",
    companyName: "Maplewood Market",
    contactName: "Sophia Nguyen",
    email: "sophia@maplewoodmarket.com",
    phone: "(555) 123-4567",
    sponsorshipTags: ["Gold"],
    linkedEvents: ["Harvest Festival"],
    address: "88 Market Street, Maplewood",
    notes: "Primary sponsor for food donations.",
    status: "activeMember"
  },
  {
    id: "business-002",
    companyName: "Lakeside Fitness",
    contactName: "Marcus Stone",
    email: "marcus@lakesidefitness.com",
    phone: "(555) 987-6543",
    sponsorshipTags: ["Silver", "In-Kind"],
    linkedEvents: ["Community Fun Run"],
    address: "12 Lakeside Drive, Maplewood",
    notes: "Provides volunteer training space.",
    status: "activeMember"
  },
  {
    id: "business-003",
    companyName: "Corner Cafe",
    contactName: "Priya Patel",
    email: "priya@cornercafe.com",
    phone: "(555) 246-8101",
    sponsorshipTags: ["Bronze"],
    linkedEvents: ["Volunteer Appreciation Night"],
    address: "45 Elm Avenue, Maplewood",
    notes: "Offers discounted catering for volunteer events.",
    status: "pastSponsor"
  },
  {
    id: "business-004",
    companyName: "Sunrise Printing",
    contactName: "Diego Martinez",
    email: "diego@sunriseprinting.com",
    phone: "(555) 112-2020",
    sponsorshipTags: ["In-Kind"],
    linkedEvents: ["Newsletter Distribution"],
    address: "19 Industrial Way, Maplewood",
    notes: "Handles newsletter printing each month.",
    status: "yetToSupport"
  }
];

export const getBusinessById = (id: string) =>
  businesses.find((business) => business.id === id);

// TODO: Replace mock data with API integration once backend endpoints are available.

