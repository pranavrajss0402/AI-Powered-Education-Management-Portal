/**
 * studentNav
 * ----------
 * Single source of truth for the student sidebar links.
 * Keeping this as a plain array (instead of hardcoding <Link> tags
 * inside the Sidebar component) means:
 *  - adding a new page later = add one line here
 *  - the "active" highlighting logic can loop over this list
 *
 * `path` matches what we'll register in the router later.
 */
export const studentNav = [
  { label: "Dashboard", path: "/student" },
  { label: "Profile", path: "/student/profile" },
  { label: "My Courses", path: "/student/courses" },
  { label: "Assignments", path: "/student/assignments" },
  { label: "Attendance", path: "/student/attendance" },
  { label: "Exams", path: "/student/exams" },
  { label: "Grades", path: "/student/grades" },
  { label: "My Progress", path: "/student/progress" },
  { label: "Recommendations", path: "/student/recommendations" },
];
