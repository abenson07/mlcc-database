import clsx from "clsx";

export type FilterTab = {
  id: string;
  label: string;
  badgeCount?: number;
};

type FilterTabsProps = {
  tabs: FilterTab[];
  activeId: string;
  onTabChange: (id: string) => void;
};

const FilterTabs = ({ tabs, activeId, onTabChange }: FilterTabsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={clsx(
              "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              isActive
                ? "border-primary-200 bg-primary-50 text-primary-700"
                : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900"
            )}
          >
            <span>{tab.label}</span>
            {typeof tab.badgeCount === "number" && (
              <span
                className={clsx(
                  "inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full px-2 text-xs font-semibold",
                  isActive
                    ? "bg-primary-100 text-primary-700"
                    : "bg-neutral-100 text-neutral-600"
                )}
              >
                {tab.badgeCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default FilterTabs;

