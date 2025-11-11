import { ReactNode } from "react";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Table, { TableColumn } from "@/components/common/Table";
import { Business } from "@/data/businesses";

type BusinessTableProps = {
  data: Business[];
  onView?: (business: Business) => void;
  onEmail?: (business: Business) => void;
};

const columns: TableColumn<Business>[] = [
  { key: "companyName", header: "Company" },
  { key: "contactName", header: "Primary Contact" },
  { key: "email", header: "Email" },
  { key: "phone", header: "Phone" },
  { key: "sponsorshipTags", header: "Sponsorship Tags", width: "220px" },
  { key: "linkedEvents", header: "Linked Events", width: "220px" }
];

const renderers: Partial<Record<keyof Business, (business: Business) => ReactNode>> = {
  sponsorshipTags: (business) => (
    <div className="flex flex-wrap gap-1">
      {business.sponsorshipTags.map((tag) => (
        <Badge key={tag} variant="info">
          {tag}
        </Badge>
      ))}
    </div>
  ),
  linkedEvents: (business) => (
    <div className="flex flex-wrap gap-1">
      {business.linkedEvents.map((event) => (
        <span
          key={event}
          className="rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-600"
        >
          {event}
        </span>
      ))}
    </div>
  ),
  email: (business) => (
    <a href={`mailto:${business.email}`} className="text-primary-600 hover:underline">
      {business.email}
    </a>
  ),
  phone: (business) => (
    <a href={`tel:${business.phone}`} className="text-neutral-700 hover:text-neutral-900">
      {business.phone}
    </a>
  )
};

columns.forEach((column) => {
  const renderer = renderers[column.key as keyof Business];
  if (renderer) {
    column.render = renderer;
  }
});

const BusinessTable = ({ data, onView, onEmail }: BusinessTableProps) => (
  <Table
    columns={columns}
    data={data}
    caption="Local business sponsors and partners"
    rowAction={(business) => (
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={() => onEmail?.(business)}>
          Email
        </Button>
        <Button variant="secondary" size="sm" onClick={() => onView?.(business)}>
          View
        </Button>
      </div>
    )}
  />
);

export default BusinessTable;

