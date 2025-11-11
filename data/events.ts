export type Event = {
  id: string;
  name: string;
  date: string;
  location: string;
  attendees: number;
  volunteersNeeded: number;
  notes?: string;
};

export const events: Event[] = [
  {
    id: "event-001",
    name: "Harvest Festival",
    date: "2024-10-12",
    location: "Maplewood Park",
    attendees: 250,
    volunteersNeeded: 20,
    notes: "Coordinate with Maplewood Market for booth layout."
  },
  {
    id: "event-002",
    name: "Community Fun Run",
    date: "2024-06-01",
    location: "Lakeside Trail",
    attendees: 180,
    volunteersNeeded: 15,
    notes: "Partnering with Lakeside Fitness for warm-up sessions."
  }
];

// TODO: Replace mock data with API integration once backend endpoints are available.

