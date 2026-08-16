/**
 * ComingSoon
 * ----------
 * Temporary placeholder for pages we haven't built yet (Profile,
 * My Courses, Assignments, etc.). This lets the sidebar links work
 * end-to-end right now instead of 404ing, without pretending those
 * pages are finished. Each one gets swapped out for a real page in
 * a later step.
 *
 * Props:
 * - title: name of the page, e.g. "Profile"
 */
export default function ComingSoon({ title }) {
  return (
    <div className="text-center py-20">
      <p className="font-display text-xl text-ink-900">{title}</p>
      <p className="text-sm text-ink-500 mt-2">This page is coming up in the next step.</p>
    </div>
  );
}
