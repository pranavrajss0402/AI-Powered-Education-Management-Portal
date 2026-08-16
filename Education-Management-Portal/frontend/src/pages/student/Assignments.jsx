import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import StatusPill from "../../components/ui/StatusPill.jsx";
import { getStudentAssignments } from "../../services/api.js";

// Filter tabs shown above the list — same pattern as the Courses page.
const FILTERS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "submitted", label: "Submitted" },
  { key: "graded", label: "Graded" },
  { key: "overdue", label: "Overdue" },
];

// Maps a status to how its StatusPill should look. Kept as one small
// lookup table instead of an if/else chain repeated in the card.
const STATUS_STYLE = {
  pending: { tone: "neutral", label: "Pending" },
  submitted: { tone: "neutral", label: "Submitted" },
  graded: { tone: "positive", label: "Graded" },
  overdue: { tone: "alert", label: "Overdue" },
};

/**
 * AssignmentCard
 * --------------
 * One assignment, shown as a row-style Card. Local to this page —
 * its exact fields (marks, due label, teacher) are specific to how
 * assignments are described here.
 */
function AssignmentCard({ assignment }) {
  const style = STATUS_STYLE[assignment.status];
  const marksLabel =
    assignment.status === "graded"
      ? `${assignment.marksObtained} / ${assignment.maxMarks}`
      : `Out of ${assignment.maxMarks}`;

  return (
    <Card className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink-900">{assignment.title}</p>
        <p className="text-xs text-ink-500 mt-0.5">
          {assignment.subject} · {assignment.teacher}
        </p>
        <p className="text-xs text-ink-500 mt-1">{assignment.dueIn} · Marks: {marksLabel}</p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <StatusPill tone={style.tone}>{style.label}</StatusPill>
        <Link to={`/student/assignments/${assignment.id}`}>
          <Button variant="secondary" className="!px-3 !py-1.5 text-xs">
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
}

/**
 * Assignments (list)
 * ------------------
 * Same data-fetch and search/filter pattern as the Courses page:
 * fetch once on mount, then apply `search` + `activeFilter` together
 * to the full list on every render.
 *
 * The four summary counts at the top are derived directly from the
 * same `assignments` list — no separate API call needed for them.
 */
export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    getStudentAssignments().then((result) => {
      setAssignments(result);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p className="text-ink-500 text-sm">Loading your assignments…</p>;
  }

  const visibleAssignments = assignments.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.subject.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "all" || a.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const summary = {
    dueSoon: assignments.filter((a) => a.dueSoon).length,
    pending: assignments.filter((a) => a.status === "pending").length,
    submitted: assignments.filter((a) => a.status === "submitted").length,
    graded: assignments.filter((a) => a.status === "graded").length,
  };

  const attentionCount = summary.dueSoon + assignments.filter((a) => a.status === "overdue").length;

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-semibold">Assignments</h1>
        <p className="text-ink-500 mt-1">Stay on top of your work and upcoming deadlines.</p>
        {attentionCount > 0 && (
          <p className="text-sm text-amber-600 mt-2">
            {attentionCount} assignment{attentionCount > 1 ? "s" : ""} need{attentionCount === 1 ? "s" : ""} your attention
          </p>
        )}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="text-center">
          <p className="text-2xl font-display text-ink-900">{summary.dueSoon}</p>
          <p className="text-xs text-ink-500 mt-0.5">Due soon</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-display text-ink-900">{summary.pending}</p>
          <p className="text-xs text-ink-500 mt-0.5">Pending</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-display text-ink-900">{summary.submitted}</p>
          <p className="text-xs text-ink-500 mt-0.5">Submitted</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-display text-ink-900">{summary.graded}</p>
          <p className="text-xs text-ink-500 mt-0.5">Graded</p>
        </Card>
      </div>

      {/* Search + filter tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or subject"
          className="w-full sm:w-72 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm
            text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />

        <div className="flex flex-wrap gap-1.5">
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

      {/* Assignment list */}
      <div className="space-y-3">
        {visibleAssignments.length === 0 ? (
          <p className="text-sm text-ink-500 py-8 text-center">
            {activeFilter === "all"
              ? `No assignments match "${search}".`
              : "Nice! Nothing here right now."}
          </p>
        ) : (
          visibleAssignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))
        )}
      </div>
    </div>
  );
}
