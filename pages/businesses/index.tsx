import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/layout/AdminLayout";
import Topbar from "@/components/common/Topbar";
import FilterTabs from "@/components/common/FilterTabs";
import BusinessTable from "@/components/businesses/BusinessTable";
import { businesses, BusinessStatus } from "@/data/businesses";

const businessFilters: { id: "all" | BusinessStatus; label: string }[] = [
  { id: "all", label: "All Businesses" },
  { id: "activeMember", label: "Active Members" },
  { id: "pastSponsor", label: "Past Sponsors" },
  { id: "yetToSupport", label: "Yet to Support" }
];

const BusinessesPage = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBusinesses = useMemo(() => {
    const normalized = searchTerm.toLowerCase();
    return businesses.filter((business) => {
      const matchesFilter =
        activeFilter === "all" ||
        business.status === activeFilter;

      const matchesSearch =
        !normalized ||
        business.companyName.toLowerCase().includes(normalized) ||
        business.contactName.toLowerCase().includes(normalized) ||
        business.linkedEvents.some((event) =>
          event.toLowerCase().includes(normalized)
        );

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchTerm]);

  const header = (
    <div className="space-y-4">
      <Topbar
        title="Businesses"
        ctaLabel="Add new sponsor"
        onAdd={() => {
          // TODO: Hook into sponsor onboarding workflow.
        }}
        onSearch={setSearchTerm}
        searchPlaceholder="Search by company, contact, or event"
      />
      <FilterTabs
        activeId={activeFilter}
        tabs={businessFilters.map((filter) => ({
          ...filter,
          badgeCount:
            filter.id === "all"
              ? businesses.length
              : businesses.filter((business) =>
                  business.status === filter.id
                ).length
        }))}
        onTabChange={setActiveFilter}
      />
    </div>
  );

  return (
    <AdminLayout header={header}>
      <BusinessTable
        data={filteredBusinesses}
        onView={(business) => {
          router.push(`/businesses/${business.id}`);
        }}
        onEmail={(business) => {
          // TODO: Replace with integrated email template action.
          if (typeof window !== "undefined") {
            window.location.href = `mailto:${business.email}`;
          }
        }}
      />
    </AdminLayout>
  );
};

export default BusinessesPage;

