import { useEffect, useState } from "react";
import Card from "../../components/ui/Card.jsx";
import StatusPill from "../../components/ui/StatusPill.jsx";
import ProgressBar from "../../components/ui/ProgressBar.jsx";
import InsightCard from "../../components/ui/InsightCard.jsx";
import TrendChart from "../../components/ui/TrendChart.jsx";
import { getStudentAttendance } from "../../services/api.js";

const SUBJECT_STATUS_STYLE = {
  good: { tone: "positive", label: "Good" },
  "needs-attention": { tone: "warning", label: "Needs Attention" },
  critical: { tone: "alert", label: "Critical" },
};

const RECORD_STATUS_STYLE = {
  present: { tone: "positive", label: "Present" },
  absent: { tone: "alert", label: "Absent" },
  late: { tone: "warning", label: "Late" },
};

const SUBJECT_STATUS_FILTERS = ["good", "needs-attention", "critical"];
const RECORD_STATUS_FILTERS = ["present", "absent", "late"];

const selectClass =
  "w-full sm:w-auto rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-teal-400";

/**
 * SubjectRow
 * ----------
 * One subject's attendance with teacher, counts, percentage bar, and status.
 */
function SubjectRow({ subject }) {
  const style = SUBJECT_STATUS_STYLE[subject.status];
  const barTone =
    subject.status === "critical" ? "amber" : subject.status === "needs-attention" ? "amber" : "teal";

  return (
    <div className="flex flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0 lg:w-48 shrink-0">
        <p className="text-sm font-medium text-ink-900">{subject.name}</p>
        <p className="text-xs text-ink-500 mt-0.5">{subject.teacher}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-ink-500 lg:flex-1">
        <div>
          <span className="block text-ink-900 font-medium">{subject.totalClasses}</span>
          Total classes
        </div>
        <div>
          <span className="block text-ink-900 font-medium">{subject.present}</span>
          Present
        </div>
        <div>
          <span className="block text-ink-900 font-medium">{subject.absent}</span>
          Absent
        </div>
        <div>
          <span className="block text-ink-900 font-medium">{subject.late}</span>
          Late
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:w-64 shrink-0">
        <div className="flex-1 min-w-0">
          <ProgressBar value={subject.percentage} tone={barTone} />
        </div>
        <StatusPill tone={style.tone}>{style.label}</StatusPill>
      </div>
    </div>
  );
}

/**
 * Attendance (Student)
 * ---------------------
 * Fetch once on mount, then apply subject / month / status filters
 * client-side — same pattern as Assignments and Courses.
 */
export default function Attendance() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    getStudentAttendance()
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-ink-500 text-sm">Loading your attendance…</p>;
  }

  if (error || !data) {
    return (
      <div className="text-center py-20">
        <p className="font-display text-xl text-ink-900">Couldn't load attendance</p>
        <p className="text-sm text-ink-500 mt-2">Please refresh the page and try again.</p>
      </div>
    );
  }

  const { overall, insight, subjects, recent, weeklyTrend } = data;

  const months = [...new Set(recent.map((r) => r.month))];

  const filteredSubjects = subjects.filter((subject) => {
    const matchesSubject = subjectFilter === "all" || subject.name === subjectFilter;
    const matchesStatus =
      statusFilter === "all" ||
      !SUBJECT_STATUS_FILTERS.includes(statusFilter) ||
      subject.status === statusFilter;
    return matchesSubject && matchesStatus;
  });

  const filteredRecent = recent.filter((record) => {
    const matchesSubject = subjectFilter === "all" || record.subject === subjectFilter;
    const matchesMonth = monthFilter === "all" || record.month === monthFilter;
    const matchesStatus =
      statusFilter === "all" ||
      !RECORD_STATUS_FILTERS.includes(statusFilter) ||
      record.status === statusFilter;
    return matchesSubject && matchesMonth && matchesStatus;
  });

  const attentionSubjects = subjects.filter(
    (s) => s.status === "needs-attention" || s.status === "critical",
  );

  const trendImproving =
    weeklyTrend[weeklyTrend.length - 1].percentage >= weeklyTrend[0].percentage;

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-semibold">Attendance</h1>
        <p className="text-ink-500 mt-1">
          Keep track of your attendance and stay on top of your classes.
        </p>
      </div>

      {/* Overall attendance */}
      <section>
        <Card>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:justify-between">
              <div>
                <p className="text-sm text-ink-700">Overall attendance</p>
                <p className="text-5xl font-display text-ink-900 mt-1">{overall.percentage}%</p>
              </div>
              <p className="text-sm text-ink-600 max-w-md">{insight}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 pt-4 border-t border-line">
              <div>
                <p className="text-lg font-medium text-ink-900">{overall.totalClasses}</p>
                <p className="text-xs text-ink-500 mt-0.5">Total classes</p>
              </div>
              <div>
                <p className="text-lg font-medium text-ink-900">{overall.present}</p>
                <p className="text-xs text-ink-500 mt-0.5">Present</p>
              </div>
              <div>
                <p className="text-lg font-medium text-ink-900">{overall.absent}</p>
                <p className="text-xs text-ink-500 mt-0.5">Absent</p>
              </div>
              <div>
                <p className="text-lg font-medium text-ink-900">{overall.late}</p>
                <p className="text-xs text-ink-500 mt-0.5">Late</p>
              </div>
              <div>
                <p className="text-lg font-medium text-ink-900">{overall.attended}</p>
                <p className="text-xs text-ink-500 mt-0.5">Classes attended</p>
              </div>
              <div>
                <p className="text-lg font-medium text-ink-900">{overall.missed}</p>
                <p className="text-xs text-ink-500 mt-0.5">Classes missed</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className={selectClass}
          aria-label="Filter by subject"
        >
          <option value="all">All subjects</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>

        <select
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className={selectClass}
          aria-label="Filter by month"
        >
          <option value="all">All months</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={selectClass}
          aria-label="Filter by status"
        >
          <option value="all">All statuses</option>
          <optgroup label="Record status">
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
          </optgroup>
          <optgroup label="Subject status">
            <option value="good">Good</option>
            <option value="needs-attention">Needs Attention</option>
            <option value="critical">Critical</option>
          </optgroup>
        </select>
      </div>

      {/* Subject-wise attendance */}
      <section>
        <h2 className="text-base font-semibold mb-3">By subject</h2>
        <Card padded={false}>
          {filteredSubjects.length === 0 ? (
            <p className="text-sm text-ink-500 py-8 text-center">No subjects match your filters.</p>
          ) : (
            filteredSubjects.map((subject, i) => (
              <div
                key={subject.id}
                className={i !== filteredSubjects.length - 1 ? "border-b border-line" : ""}
              >
                <SubjectRow subject={subject} />
              </div>
            ))
          )}
        </Card>
      </section>

      {/* Recent attendance */}
      <section>
        <h2 className="text-base font-semibold mb-3">Recent attendance</h2>
        <Card padded={false}>
          {filteredRecent.length === 0 ? (
            <p className="text-sm text-ink-500 py-8 text-center">
              No attendance records match your filters.
            </p>
          ) : (
            filteredRecent.map((record, i) => {
              const style = RECORD_STATUS_STYLE[record.status];
              return (
                <div
                  key={`${record.date}-${record.subject}-${record.session}`}
                  className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 py-3.5 ${
                    i !== filteredRecent.length - 1 ? "border-b border-line" : ""
                  }`}
                >
                  <div className="min-w-0">
                    <p className="text-sm text-ink-900">{record.subject}</p>
                    <p className="text-xs text-ink-500 mt-0.5">{record.session}</p>
                    <p className="text-xs text-ink-500 mt-0.5 font-mono">{record.date}</p>
                  </div>
                  <StatusPill tone={style.tone}>{style.label}</StatusPill>
                </div>
              );
            })
          )}
        </Card>
      </section>

      {/* Trend */}
      <section>
        <h2 className="text-base font-semibold mb-3">Attendance trend</h2>
        <Card>
          <p className="text-sm text-ink-500 mb-4">
            {trendImproving
              ? "Your attendance has been improving over the past few weeks — keep it up."
              : "Your attendance has dipped a little recently. Showing up to the next few classes will help."}
          </p>
          <TrendChart data={weeklyTrend.map((w) => ({ label: w.label, value: w.percentage }))} />
        </Card>
      </section>

      {/* Subjects needing attention */}
      {attentionSubjects.length > 0 && (
        <section>
          <h2 className="text-base font-semibold mb-3">Subjects needing attention</h2>
          <div className="space-y-3">
            {attentionSubjects.map((subject) => (
              <InsightCard
                key={subject.id}
                subject={subject.name}
                tone="warning"
                message={`Your attendance is ${subject.percentage}%. Attending the next few classes will help you get back on track.`}
                actions={[
                  `Don't miss the next ${subject.name} class`,
                  `Aim to reach at least 75% in ${subject.name}`,
                ]}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
