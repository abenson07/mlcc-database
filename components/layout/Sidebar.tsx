import Link from "next/link";
import { useRouter } from "next/router";

const navItems = [
  { href: "/people", label: "Neighbors" },
  { href: "/routes", label: "Routes" },
  { href: "/businesses", label: "Businesses" }
];

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-neutral-200 bg-white lg:block">
      <div className="flex h-full flex-col">
        <div className="border-b border-neutral-200 px-6 py-6">
          <span className="text-lg font-semibold text-primary-700">MLCC</span>
          <p className="text-sm text-neutral-500">Community Dashboard</p>
        </div>
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = router.pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary-100 text-primary-700"
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="border-t border-neutral-200 px-6 py-6 text-sm text-neutral-500">
          <p>Built for MLCC community coordinators.</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

