import { ReactNode, useMemo, useState } from "react";
import CopyableText from "@/components/common/CopyableText";
import Table, { TableColumn } from "@/components/common/Table";
import Button from "@/components/common/Button";
import { Person, DuplicateMembership, TierInfo } from "@/data/people";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

type PeopleTableProps = {
  data: Person[];
  selectedId?: string;
  onRowClick?: (person: Person) => void;
  onClose?: () => void;
  showMembersColumns?: boolean;
  showDuplicatesView?: boolean;
  duplicateMemberships?: DuplicateMembership[];
};

const defaultColumns: TableColumn<Person>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "address", header: "Address" }
];

const membersColumns: TableColumn<Person>[] = [
  { key: "name", header: "Name" },
  { key: "membershipTier", header: "Tier" },
  { key: "lastRenewal", header: "Last Renewal Date" },
  { key: "address", header: "Address" },
  { key: "email", header: "Email" }
];

// Type for duplicate membership table rows
type DuplicateRow = {
  id: string;
  email: string;
  personName?: string;
  membershipCount: number;
  tiers: TierInfo[];
};

const duplicatesColumns: TableColumn<DuplicateRow>[] = [
  { key: "email", header: "Email / Person" },
  { key: "membershipCount", header: "Memberships" },
  { key: "tiers", header: "Tiers" }
];

// Component for rendering tier with hover and click-to-copy
const TierBadge = ({ tierInfo }: { tierInfo: TierInfo }) => {
  const { copyToClipboard } = useCopyToClipboard();
  const [showTooltip, setShowTooltip] = useState(false);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "No renewal date";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleClick = () => {
    if (tierInfo.stripeSubscriptionId) {
      copyToClipboard(tierInfo.stripeSubscriptionId, "Subscription ID copied to clipboard!");
    } else {
      copyToClipboard("", "No subscription ID available");
    }
  };

  return (
    <span className="relative inline-block">
      <span
        className="cursor-pointer text-primary-700 hover:text-primary-800 hover:underline transition-colors"
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {tierInfo.tier}
      </span>
      {showTooltip && (
        <div className="absolute z-10 px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-lg bottom-full left-1/2 transform -translate-x-1/2 mb-1 whitespace-nowrap">
          {tierInfo.lastRenewal ? `Renewed: ${formatDate(tierInfo.lastRenewal)}` : "No renewal date"}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </span>
  );
};

const PeopleTable = ({ 
  data, 
  selectedId, 
  onRowClick, 
  onClose, 
  showMembersColumns = false,
  showDuplicatesView = false,
  duplicateMemberships = []
}: PeopleTableProps) => {
  const columns = useMemo(() => {
    if (showDuplicatesView) {
      return duplicatesColumns;
    }
    return showMembersColumns ? membersColumns : defaultColumns;
  }, [showMembersColumns, showDuplicatesView]);

  // Transform duplicate memberships into table rows
  const duplicateRows: DuplicateRow[] = useMemo(() => {
    if (!duplicateMemberships || duplicateMemberships.length === 0) {
      return [];
    }
    return duplicateMemberships.map((dup, index) => ({
      id: `duplicate-${index}`,
      email: dup.email,
      personName: dup.personName,
      membershipCount: dup.membershipCount,
      tiers: dup.tiers
    }));
  }, [duplicateMemberships]);

  const personRenderers: Partial<Record<keyof Person, (person: Person) => ReactNode>> = {
    email: (person) => (
      <CopyableText
        text={person.email || ""}
        successMessage="Email copied to clipboard!"
        className="cursor-pointer text-primary-700 hover:underline"
      />
    ),
    membershipTier: (person) => (
      <span>{person.membershipTier || "-"}</span>
    ),
    lastRenewal: (person) => {
      if (!person.lastRenewal) return <span>-</span>;
      const date = new Date(person.lastRenewal);
      return <span>{date.toLocaleDateString()}</span>;
    },
    address: (person) => (
      <span>{person.address || "-"}</span>
    )
  };

  const duplicateRenderers: Partial<Record<keyof DuplicateRow, (row: DuplicateRow) => ReactNode>> = {
    email: (row) => (
      <div>
        {row.personName ? (
          <div>
            <div className="font-medium">{row.personName}</div>
            <CopyableText
              text={row.email}
              successMessage="Email copied to clipboard!"
              className="text-sm text-gray-600 cursor-pointer hover:underline"
            />
          </div>
        ) : (
          <CopyableText
            text={row.email}
            successMessage="Email copied to clipboard!"
            className="cursor-pointer text-primary-700 hover:underline"
          />
        )}
      </div>
    ),
    membershipCount: (row) => (
      <span>{row.membershipCount}</span>
    ),
    tiers: (row) => {
      if (!row.tiers || row.tiers.length === 0) {
        return <span>-</span>;
      }
      return (
        <div className="flex flex-wrap gap-2 items-center">
          {row.tiers.map((tierInfo, index) => (
            <span key={index} className="inline-flex items-center">
              <TierBadge tierInfo={tierInfo} />
              {index < row.tiers.length - 1 && (
                <span className="mx-1 text-gray-400">,</span>
              )}
            </span>
          ))}
        </div>
      );
    }
  };

  const getCaption = () => {
    if (showDuplicatesView) {
      return "Active memberships with duplicate emails";
    }
    return showMembersColumns ? "Active members directory" : "People directory for the MLCC community";
  };

  // Render duplicates view
  if (showDuplicatesView) {
    const columnsWithRenderers = duplicatesColumns.map((column) => {
      const renderer = duplicateRenderers[column.key as keyof DuplicateRow];
      return renderer ? { ...column, render: renderer } : column;
    });

    return (
      <Table<DuplicateRow>
        columns={columnsWithRenderers}
        data={duplicateRows}
        caption={getCaption()}
        selectedId={selectedId}
      />
    );
  }

  // Render regular people view
  const columnsWithRenderers = columns.map((column) => {
    const renderer = personRenderers[column.key as keyof Person];
    return renderer ? { ...column, render: renderer } : column;
  });

  return (
    <Table<Person>
      columns={columnsWithRenderers}
      data={data}
      caption={getCaption()}
      selectedId={selectedId}
      onRowClick={onRowClick}
      rowAction={(person) => {
        const isSelected = selectedId === person.id;
        if (!isSelected) return null;
        return (
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={(e) => {
              e.stopPropagation();
              onClose?.();
            }}>
              Close
            </Button>
          </div>
        );
      }}
    />
  );
};

export default PeopleTable;

