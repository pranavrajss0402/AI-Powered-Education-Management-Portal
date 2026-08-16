import { useState } from "react";
import { NavLink } from "react-router-dom";
import Avatar from "../ui/Avatar.jsx";

/**
 * Topbar
 * ------
 * Sits above the page content on every screen size. On desktop it's
 * mostly just "who's logged in". On mobile — where the Sidebar is
 * hidden to save space — it also holds the menu button that opens
 * the same navigation links in a simple dropdown.
 *
 * We keep the mobile menu logic here (a plain useState boolean)
 * rather than reaching for a routing library or animation library.
 * `open` is either true or false — when true, we show the dropdown.
 *
 * Props:
 * - user: { name, role }  — who's currently logged in
 * - items: same nav array used by the Sidebar, so mobile users get
 *          the exact same links
 */
export default function Topbar({ user, items = [] }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-surface/95 backdrop-blur-sm px-5 py-3 md:px-8">
      {/* Mobile menu button — only visible below md breakpoint */}
      <button
        className="md:hidden text-sm font-medium text-ink-700 rounded-lg px-3 py-2 hover:bg-canvas"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="Toggle navigation menu"
      >
        {open ? "Close" : "Menu"}
      </button>

      <p className="hidden md:block text-sm text-ink-500">
        {new Date().toLocaleDateString("en-IN", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
      </p>

      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-ink-900 leading-tight">{user?.name}</p>
          <p className="text-xs text-ink-500 leading-tight">{user?.role}</p>
        </div>
        <Avatar name={user?.name} size="sm" />
      </div>

      {/* Mobile dropdown nav — only rendered when open */}
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-surface border-b border-line px-3 py-2 space-y-0.5 shadow-card">
          {items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path.split("/").length <= 2}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-xl px-3.5 py-2.5 text-sm ${
                  isActive ? "bg-teal-50 text-teal-600 font-medium" : "text-ink-700"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
