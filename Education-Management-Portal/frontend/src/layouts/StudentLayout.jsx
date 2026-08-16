import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar.jsx";
import Topbar from "../components/layout/Topbar.jsx";
import { studentNav } from "./studentNav.js";

/**
 * StudentLayout
 * -------------
 * This is a "layout route" in React Router. Every student page
 * (Dashboard, Profile, Courses, ...) gets rendered INSIDE this
 * component, in place of <Outlet />. That's how we get the same
 * Sidebar + Topbar on every student page without repeating them
 * in each individual page file.
 *
 * Where this connects:
 * - Registered in routes/AppRoutes.jsx as the parent of all
 *   "/student/*" routes.
 * - <Outlet /> is a React Router component — it's a placeholder
 *   that says "render whichever child route matched here".
 *
 * `currentUser` is hardcoded mock data for now. Later, this will
 * come from an AuthContext (after login) instead of being typed
 * in directly — but that's a future step.
 */
const currentUser = {
  name: "Aditi Sharma",
  role: "B.Tech CSE · Semester 5",
};

export default function StudentLayout() {
  return (
    <div className="min-h-screen flex bg-canvas">
      <Sidebar title="Campus" subtitle="Student" items={studentNav} />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar user={currentUser} items={studentNav} />
        <main className="flex-1 px-5 py-6 md:px-8 md:py-8 max-w-5xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
