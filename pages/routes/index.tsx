import { useMemo, useState, useRef, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import Topbar from "@/components/common/Topbar";
import FilterTabs from "@/components/common/FilterTabs";
import RouteTable from "@/components/routes/RouteTable";
import DelivererTable from "@/components/routes/DelivererTable";
import OpenRoutesTable from "@/components/routes/OpenRoutesTable";
import RouteDetailCard from "@/components/routes/RouteDetailCard";
import { deliverers } from "@/data/routes";
import { useRoutes } from "@/hooks/useRoutes";

type TabOption = "byRoute" | "byDeliverer" | "openRoutes";

const routeTabs = [
  { id: "byRoute", label: "By Route" },
  { id: "byDeliverer", label: "By Deliverer" },
  { id: "openRoutes", label: "Open Routes" }
];

const RoutesPage = () => {
  const { routes, loading, error } = useRoutes();
  const [activeTab, setActiveTab] = useState<TabOption>("byRoute");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const normalizedSearch = searchTerm.toLowerCase();

  const filteredRoutes = useMemo(() => {
    if (!normalizedSearch) return routes;
    return routes.filter(
      (route) =>
        route.name.toLowerCase().includes(normalizedSearch) ||
        route.dropoffLocation.toLowerCase().includes(normalizedSearch) ||
        route.distributor?.toLowerCase().includes(normalizedSearch)
    );
  }, [normalizedSearch, routes]);

  const filteredDeliverers = useMemo(() => {
    if (!normalizedSearch) return deliverers;
    return deliverers.filter(
      (deliverer) =>
        deliverer.name.toLowerCase().includes(normalizedSearch) ||
        deliverer.status.toLowerCase().includes(normalizedSearch)
    );
  }, [normalizedSearch]);

  const filteredOpenRoutes = useMemo(() => {
    const openRoutes = routes.filter((route) => route.status === "Open");
    if (!normalizedSearch) return openRoutes;
    return openRoutes.filter(
      (route) =>
        route.name.toLowerCase().includes(normalizedSearch) ||
        route.dropoffLocation.toLowerCase().includes(normalizedSearch)
    );
  }, [normalizedSearch, routes]);

  // Reset selected route when switching tabs
  const handleTabChange = (id: string) => {
    setActiveTab(id as TabOption);
    setSelectedRouteId(null);
  };

  const header = (
    <div className="space-y-4">
      <Topbar
        title="Routes"
        ctaLabel="Add new deliverer"
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
              : routes.filter((route) => route.status === "Open").length
        }))}
        onTabChange={handleTabChange}
      />
    </div>
  );

  const selectedRoute = selectedRouteId
    ? filteredRoutes.find((r) => r.id === selectedRouteId)
    : null;

  const selectedRouteDeliverer = selectedRoute
    ? deliverers.find((d) => d.name === selectedRoute.distributor) || null
    : null;

  // Scroll card into view when it's opened
  useEffect(() => {
    if (selectedRoute && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedRouteId]);

  if (loading) {
    return (
      <AdminLayout header={header}>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="text-lg text-gray-600">Loading routes...</div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout header={header}>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="text-lg text-red-600 mb-2">Error loading routes</div>
            <div className="text-sm text-gray-600">{error}</div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout header={header}>
      {activeTab === "byRoute" && (
        <div className="flex gap-6">
          <div className={selectedRoute ? "w-2/3 transition-all duration-300" : "w-full transition-all duration-300"}>
            <RouteTable
              data={filteredRoutes}
              deliverers={deliverers}
              selectedId={selectedRouteId || undefined}
              onRowClick={(route) => {
                setSelectedRouteId(route.id);
              }}
              onClose={() => {
                setSelectedRouteId(null);
              }}
            />
          </div>
          {selectedRoute && (
            <div ref={cardRef} className="w-1/3 transition-all duration-300 sticky top-8 self-start">
              <RouteDetailCard
                route={selectedRoute}
                deliverer={selectedRouteDeliverer}
                onClose={() => {
                  setSelectedRouteId(null);
                }}
              />
            </div>
          )}
        </div>
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

