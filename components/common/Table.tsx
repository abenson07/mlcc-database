import { ReactNode } from "react";
import clsx from "clsx";

export type TableColumn<T> = {
  key: keyof T | string;
  header: string;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (item: T) => ReactNode;
};

type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  emptyState?: ReactNode;
  rowAction?: (item: T) => ReactNode;
  caption?: string;
  selectedId?: string | number;
  onRowClick?: (item: T) => void;
};

const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  emptyState,
  rowAction,
  caption,
  selectedId,
  onRowClick
}: TableProps<T>) => {
  if (data.length === 0 && emptyState) {
    return <div className="rounded-lg border border-dashed border-primary-300 bg-cream-100 p-12 text-center text-sm text-neutral-600">{emptyState}</div>;
  }

  return (
    <div className="rounded-lg border border-primary-200 bg-cream-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="divide-y divide-primary-200" style={{ tableLayout: 'fixed', width: '100%', minWidth: '900px' }}>
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead className="bg-cream-100">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  scope="col"
                  className={clsx(
                    "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-primary-800",
                    column.align === "center" && "text-center",
                    column.align === "right" && "text-right"
                  )}
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
              {rowAction && (
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-primary-800">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-200 bg-cream-100">
            {data.map((item, index) => {
              const isSelected = selectedId !== undefined && String(item.id ?? index) === String(selectedId);
              return (
                <tr
                  key={String(item.id ?? index)}
                  className={clsx(
                    "transition-colors",
                    onRowClick && "cursor-pointer",
                    isSelected 
                      ? "bg-primary-200" 
                      : "bg-cream-100 hover:bg-primary-100"
                  )}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className={clsx(
                        "px-4 py-3 text-sm text-neutral-700",
                        column.align === "center" && "text-center",
                        column.align === "right" && "text-right"
                      )}
                      style={{ width: column.width }}
                    >
                      {column.render
                        ? column.render(item)
                        : String(item[column.key as keyof T] ?? "")}
                    </td>
                  ))}
                  {rowAction && (
                    <td className="px-4 py-3 text-right text-sm text-neutral-600">
                      {rowAction(item)}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

