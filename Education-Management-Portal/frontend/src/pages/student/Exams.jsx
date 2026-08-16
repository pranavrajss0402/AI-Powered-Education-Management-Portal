import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import StatusPill from "../../components/ui/StatusPill.jsx";
import { getStudentExams } from "../../services/api.js";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "upcoming", label: "Upcoming" },
  { key: "completed", label: "Completed" },
];

const STATUS_STYLE = {
  upcoming: { tone: "warning", label: "Upcoming" },
  completed: { tone: "positive", label: "Completed" },
};

/**
 * ExamCard
 * --------
 * One exam, shown as a row-style Card. Local to this page — its fields
 * (date, time, duration, type) are specific to how exams are listed here.
 */
function ExamCard({ exam }) {
  const style = STATUS_STYLE[exam.status];

  return (
    <Card className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink-900">{exam.title}</p>
        <p className="text-xs text-ink-500 mt-0.5">{exam.subject}</p>
        <p className="text-xs text-ink-500 mt-1">
          {exam.date} · {exam.startTime} · {exam.duration} · {exam.examType}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <StatusPill tone={style.tone}>{style.label}</StatusPill>
        <Link to={`/student/exams/${exam.id}`}>
          <Button variant="secondary" className="!px-3 !py-1.5 text-xs">
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
}

/**
 * Exams (list)
 * ------------
 * Same data-fetch and search/filter pattern as Assignments and Courses:
 * fetch once on mount, then apply `search` + `activeFilter` together
 * to the full list on every render.
 */
export default function Exams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    getStudentExams().then((result) => {
      setExams(result);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p className="text-ink-500 text-sm">Loading your exams…</p>;
  }

  const visibleExams = exams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(search.toLowerCase()) ||
      exam.subject.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "all" || exam.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const upcomingExams = exams
    .filter((e) => e.status === "upcoming")
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const completedExams = exams.filter((e) => e.status === "completed");
  const nextExam = upcomingExams[0];

  const nextExamMessage = nextExam
    ? `Your next exam is ${nextExam.subject} on ${nextExam.date.slice(0, -5)}.`
    : null;

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-semibold">Exams</h1>
        <p className="text-ink-500 mt-1">See what's coming up and what you've already finished.</p>
        {nextExamMessage && (
          <p className="text-sm text-amber-600 mt-2">{nextExamMessage}</p>
        )}
        {upcomingExams.length > 0 && (
          <p className="text-sm text-ink-500 mt-1">
            You have {upcomingExams.length} upcoming exam{upcomingExams.length > 1 ? "s" : ""}.
          </p>
        )}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="text-center">
          <p className="text-2xl font-display text-ink-900">{upcomingExams.length}</p>
          <p className="text-xs text-ink-500 mt-0.5">Upcoming</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-display text-ink-900">{completedExams.length}</p>
          <p className="text-xs text-ink-500 mt-0.5">Completed</p>
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

      {/* Exam list */}
      <div className="space-y-3">
        {visibleExams.length === 0 ? (
          <p className="text-sm text-ink-500 py-8 text-center">
            {activeFilter === "all"
              ? `No exams match "${search}".`
              : "Nothing here right now."}
          </p>
        ) : (
          visibleExams.map((exam) => <ExamCard key={exam.id} exam={exam} />)
        )}
      </div>
    </div>
  );
}
