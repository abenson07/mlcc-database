import { useMemo, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import Topbar from "@/components/common/Topbar";
import FilterTabs from "@/components/common/FilterTabs";
import RouteTable from "@/components/routes/RouteTable";
import DelivererTable from "@/components/routes/DelivererTable";
import OpenRoutesTable from "@/components/routes/OpenRoutesTable";
import { deliverers, openRoutes, routes } from "@/data/routes";

type TabOption = "byRoute" | "byDeliverer" | "openRoutes";

const routeTabs = [
  { id: "byRoute", label: "By Route" },
  { id: "byDeliverer", label: "By Deliverer" },
  { id: "openRoutes", label: "Open Routes" }
];

const RoutesPage = () => {
  const [activeTab, setActiveTab] = useState<TabOption>("byRoute");
  const [searchTerm, setSearchTerm] = useState("");

  const normalizedSearch = searchTerm.toLowerCase();

  const filteredRoutes = useMemo(() => {
    if (!normalizedSearch) return routes;
    return routes.filter(
      (route) =>
        route.name.toLowerCase().includes(normalizedSearch) ||
        route.dropoffLocation.toLowerCase().includes(normalizedSearch) ||
        route.distributor?.toLowerCase().includes(normalizedSearch)
    );
  }, [normalizedSearch]);

  const filteredDeliverers = useMemo(() => {
    if (!normalizedSearch) return deliverers;
    return deliverers.filter(
      (deliverer) =>
        deliverer.name.toLowerCase().includes(normalizedSearch) ||
        deliverer.status.toLowerCase().includes(normalizedSearch)
    );
  }, [normalizedSearch]);

  const filteredOpenRoutes = useMemo(() => {
    if (!normalizedSearch) return openRoutes;
    return openRoutes.filter(
      (route) =>
        route.name.toLowerCase().includes(normalizedSearch) ||
        route.dropoffLocation.toLowerCase().includes(normalizedSearch)
    );
  }, [normalizedSearch]);

  const header = (
    <div className="space-y-4">
      <Topbar
        title="Routes"
        ctaLabel="Add new route"
        onAdd={() => {
          // TODO: Launch route creation wizard when backend endpoints exist.
        }}
        onSearch={setSearchTerm}
        searchPlaceholder="Search by route, deliverer, or dropoff location"
      />
      <FilterTabs
        activeId={activeTab}
        tabs={routeTabs.map((tab) => ({
          ...tab,
          badgeCount:
            tab.id === "byRoute"
              ? routes.length
              : tab.id === "byDeliverer"
              ? deliverers.length
              : openRoutes.length
        }))}
        onTabChange={(id) => setActiveTab(id as TabOption)}
      />
    </div>
  );

  return (
    <AdminLayout header={header}>
      {activeTab === "byRoute" && (
        <RouteTable
          data={filteredRoutes}
          onAssign={(route) => {
            // TODO: Connect to assignment workflow.
            console.info("assign route", route.id);
          }}
          onPrint={(route) => {
            // TODO: Generate printable route sheet.
            console.info("print route", route.id);
          }}
        />
      )}
      {activeTab === "byDeliverer" && (
        <DelivererTable
          data={filteredDeliverers}
          routes={routes}
          searchTerm={searchTerm}
          onSkip={(deliverer) => {
            // TODO: Implement skip deliverer action.
            console.info("skip deliverer", deliverer.id);
          }}
          onUnassign={(deliverer) => {
            // TODO: Implement unassign deliverer action.
            console.info("unassign deliverer", deliverer.id);
          }}
          onSkipRoute={(route) => {
            // TODO: Implement skip route action.
            console.info("skip route", route.id);
          }}
          onUnassignRoute={(route) => {
            // TODO: Implement unassign route action.
            console.info("unassign route", route.id);
          }}
        />
      )}
      {activeTab === "openRoutes" && (
        <OpenRoutesTable
          data={filteredOpenRoutes}
          onAssign={(route) => {
            // TODO: Connect to volunteer assignment flow.
            console.info("assign open route", route.id);
          }}
        />
      )}
    </AdminLayout>
  );
};

export default RoutesPage;

