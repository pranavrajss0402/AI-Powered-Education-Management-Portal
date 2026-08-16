import { useEffect, useState } from "react";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import StatusPill from "../../components/ui/StatusPill.jsx";
import ProgressBar from "../../components/ui/ProgressBar.jsx";
import InsightCard from "../../components/ui/InsightCard.jsx";
import { getStudentCourses } from "../../services/api.js";

// The filter tabs shown above the course grid. Kept as a plain array
// (like studentNav.js) so adding a new filter later is one line, not
// a rewritten switch statement.
const FILTERS = [
  { key: "all", label: "All" },
  { key: "in-progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
];

/**
 * CourseCard
 * ----------
 * One subject, shown as a Card. Local to this page (not added to
 * components/ui) because the layout — progress + attendance + next
 * class + a status pill — is specific to how a course is described
 * here, not something reused elsewhere yet.
 */
function CourseCard({ course }) {
  const isCompleted = course.status === "completed";

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-ink-900">{course.subjectName}</p>
          <p className="text-xs text-ink-500 mt-0.5 font-mono">{course.code} · {course.teacher}</p>
        </div>
        {isCompleted ? (
          <StatusPill tone="positive">Completed</StatusPill>
        ) : course.needsAttention ? (
          <StatusPill tone="warning">Needs attention</StatusPill>
        ) : (
          <StatusPill tone="neutral">On track</StatusPill>
        )}
      </div>

      <ProgressBar value={course.progress} tone={isCompleted ? "sage" : "teal"} label="Progress" />

      <div className="flex items-center justify-between text-sm">
        <span className="text-ink-500">Attendance</span>
        <span className="font-mono text-ink-700">{course.attendance}%</span>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-line">
        <span className="text-xs text-ink-500">
          {course.nextClass ? `Next class: ${course.nextClass}` : "No more classes"}
        </span>
        <Button variant="ghost" className="!px-3 !py-1.5 text-xs">
          View Course
        </Button>
      </div>
    </Card>
  );
}

/**
 * Courses (My Courses)
 * ---------------------
 * Shows every subject the student is enrolled in. Two independent
 * pieces of local state drive what's visible:
 *  - `search`      the text typed into the search box
 *  - `activeFilter` which tab is selected (all / in-progress / completed)
 *
 * Both are applied together, in render, to the full course list —
 * there's no need for a separate "filtered courses" state, since
 * this list is small and recomputing it on every render is cheap
 * and easy to follow.
 */
export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    getStudentCourses().then((result) => {
      setCourses(result);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p className="text-ink-500 text-sm">Loading your courses…</p>;
  }

  // Apply the search box and the active filter tab together.
  const visibleCourses = courses.filter((course) => {
    const matchesSearch =
      course.subjectName.toLowerCase().includes(search.toLowerCase()) ||
      course.code.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "all" || course.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Pick which course to highlight in "Continue Learning":
  // prefer one explicitly flagged as needing attention, otherwise
  // fall back to the in-progress course with the least progress.
  const focusCourse =
    courses.find((c) => c.needsAttention) ||
    [...courses]
      .filter((c) => c.status === "in-progress")
      .sort((a, b) => a.progress - b.progress)[0];

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-semibold">My Courses</h1>
        <p className="text-ink-500 mt-1">
          Keep track of your subjects and how you're progressing.
        </p>
      </div>

      {/* Search + filter tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by subject or course code"
          className="w-full sm:w-72 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm
            text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />

        <div className="flex gap-1.5">
          {FILTERS.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`rounded-xl px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${
                activeFilter === filter.key
                  ? "bg-teal-500 text-white"
                  : "bg-surface text-ink-500 border border-line hover:bg-canvas"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Continue Learning */}
      {focusCourse && (
        <section>
          <h2 className="text-base font-semibold mb-3">Continue Learning</h2>
          <div className="flex gap-3 rounded-2xl border border-line bg-surface p-5">
            <div className="w-1 rounded-full bg-teal-500 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-ink-900">{focusCourse.subjectName}</p>
              <p className="text-xs text-ink-500 mt-0.5 font-mono">
                {focusCourse.code} · {focusCourse.teacher}
              </p>
              <div className="mt-3 max-w-sm">
                <ProgressBar value={focusCourse.progress} tone="teal" label="Progress" />
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="primary">Continue</Button>
            </div>
          </div>
        </section>
      )}

      {/* Course grid */}
      <section>
        <h2 className="text-base font-semibold mb-3">
          {activeFilter === "all" ? "All subjects" : FILTERS.find((f) => f.key === activeFilter).label}
        </h2>

        {visibleCourses.length === 0 ? (
          <p className="text-sm text-ink-500 py-8 text-center">
            No courses match "{search}".
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>

      {/* Insight */}
      <section>
        <h2 className="text-base font-semibold mb-3">Worth focusing on</h2>
        <div className="space-y-3">
          <InsightCard
            subject="Java Programming"
            tone="positive"
            message="Your last two test scores were above class average — keep it up."
          />
          <InsightCard
            subject="DBMS"
            tone="warning"
            message="Progress has slowed a little compared to your other subjects this week."
            actions={["Review Unit 3 — Normalization", "Catch up on the pending assignment"]}
          />
        </div>
      </section>
    </div>
  );
}
