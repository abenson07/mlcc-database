import { ReactNode } from "react";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Table, { TableColumn } from "@/components/common/Table";
import { Route } from "@/data/routes";

type RouteTableProps = {
  data: Route[];
  onAssign?: (route: Route) => void;
  onPrint?: (route: Route) => void;
};

const statusVariant: Record<Route["status"], "info" | "warning" | "success" | "default"> = {
  Scheduled: "info",
  "In Progress": "warning",
  Completed: "success",
  Open: "default"
};

const columns: TableColumn<Route>[] = [
  { key: "name", header: "Route Name" },
  { key: "leaflets", header: "# Leaflets", align: "right" },
  { key: "dropoffLocation", header: "Dropoff Location" },
  { key: "distributor", header: "Distributor" },
  { key: "status", header: "Status", align: "center" }
];

const renderers: Partial<Record<keyof Route, (route: Route) => ReactNode>> = {
  distributor: (route) =>
    route.distributor ? (
      <span className="text-neutral-800">{route.distributor}</span>
    ) : (
      <span className="text-neutral-400">Unassigned</span>
    ),
  status: (route) => (
    <div className="flex justify-center">
      <Badge variant={statusVariant[route.status]}>{route.status}</Badge>
    </div>
  )
};

columns.forEach((column) => {
  const renderer = renderers[column.key as keyof Route];
  if (renderer) {
    column.render = renderer;
  }
});

const RouteTable = ({ data, onAssign, onPrint }: RouteTableProps) => (
  <Table
    columns={columns}
    data={data}
    caption="Newsletter delivery routes grouped by route"
    rowAction={(route) => (
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={() => onPrint?.(route)}>
          Print
        </Button>
        <Button variant="secondary" size="sm" onClick={() => onAssign?.(route)}>
          Assign
        </Button>
      </div>
    )}
  />
);

export default RouteTable;

