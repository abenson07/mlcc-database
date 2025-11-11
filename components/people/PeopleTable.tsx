import { ReactNode } from "react";
import Badge from "@/components/common/Badge";
import Table, { TableColumn } from "@/components/common/Table";
import Button from "@/components/common/Button";
import { Person } from "@/data/people";

type PeopleTableProps = {
  data: Person[];
  onEdit?: (person: Person) => void;
  onView?: (person: Person) => void;
};

const membershipVariants: Record<Person["membershipType"], "default" | "success" | "info"> = {
  Resident: "default",
  Member: "info",
  Volunteer: "success",
  Partner: "default"
};

const columns: TableColumn<Person>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "address", header: "Address" },
  { key: "membershipType", header: "Membership" },
  { key: "volunteerInterests", header: "Volunteer Interests", width: "240px" }
];

const PeopleTable = ({ data, onEdit, onView }: PeopleTableProps) => (
  <Table
    columns={columns}
    data={data}
    caption="People directory for the MLCC community"
    rowAction={(person) => (
      <div className="flex justify-end gap-2">
        {/* TODO: Replace inline actions with modal or drawer once edit/view flows exist */}
        <Button variant="ghost" size="sm" onClick={() => onView?.(person)}>
          View
        </Button>
        <Button variant="secondary" size="sm" onClick={() => onEdit?.(person)}>
          Edit
        </Button>
      </div>
    )}
  />
);

const renderers: Partial<Record<keyof Person, (person: Person) => ReactNode>> = {
  membershipType: (person) => (
    <Badge variant={membershipVariants[person.membershipType]}>
      {person.membershipType}
    </Badge>
  ),
  volunteerInterests: (person) => (
    <div className="flex flex-wrap gap-1">
      {person.volunteerInterests.map((interest) => (
        <span
          key={interest}
          className="rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-600"
        >
          {interest}
        </span>
      ))}
    </div>
  )
};

// Extend column renderers with custom content
columns.forEach((column) => {
  const renderer = renderers[column.key as keyof Person];
  if (renderer) {
    column.render = renderer;
  }
});

export default PeopleTable;

