import { NavLink } from "react-router-dom";

/**
 * Sidebar
 * -------
 * The left-hand navigation column. It's a generic component —
 * it doesn't know whether it's showing student links or teacher
 * links. It just renders whatever `items` it's given. This means
 * the exact same Sidebar will later be reused for the Teacher
 * layout, just with a different `items` array and `title`.
 *
 * We use React Router's <NavLink> instead of a plain <Link>
 * because NavLink automatically knows if it's the "active" page
 * and gives us an `isActive` flag to style it differently —
 * no manual "which page am I on" logic needed.
 *
 * Props:
 * - title: small label at the top, e.g. "Campus"
 * - subtitle: e.g. "Student"
 * - items: array of { label, path } — see layouts/studentNav.js
 */
export default function Sidebar({ title = "Campus", subtitle, items = [] }) {
  return (
    <aside className="hidden md:flex md:w-60 md:flex-col md:shrink-0 border-r border-line bg-surface">
      <div className="px-6 pt-7 pb-6">
        <p className="font-display text-lg text-ink-900">{title}</p>
        {subtitle && <p className="text-xs text-ink-500 mt-0.5">{subtitle}</p>}
      </div>

      <nav className="flex-1 px-3 space-y-0.5">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path.split("/").length <= 2}
            className={({ isActive }) =>
              `block rounded-xl px-3.5 py-2.5 text-sm transition-colors duration-150 ${
                isActive
                  ? "bg-teal-50 text-teal-600 font-medium"
                  : "text-ink-500 hover:bg-canvas hover:text-ink-700"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
