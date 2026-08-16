import { useEffect, useState } from "react";
import Card from "../../components/ui/Card.jsx";
import StatusPill from "../../components/ui/StatusPill.jsx";
import ProgressBar from "../../components/ui/ProgressBar.jsx";
import InsightCard from "../../components/ui/InsightCard.jsx";
import TrendChart from "../../components/ui/TrendChart.jsx";
import { getStudentGrades } from "../../services/api.js";

const STATUS_STYLE = {
  good: { tone: "positive", label: "Good" },
  "needs-attention": { tone: "warning", label: "Needs Attention" },
  critical: { tone: "alert", label: "Critical" },
};

const selectClass =
  "w-full sm:w-auto rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-teal-400";

/**
 * SubjectGradeRow
 * ---------------
 * One subject's grade breakdown — local to this page.
 */
function SubjectGradeRow({ subject }) {
  const style = STATUS_STYLE[subject.status];
  const barTone =
    subject.status === "critical" || subject.status === "needs-attention" ? "amber" : "teal";

  return (
    <div className="flex flex-col gap-4 px-5 py-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="min-w-0 xl:w-44 shrink-0">
        <p className="text-sm font-medium text-ink-900">{subject.name}</p>
        <p className="text-xs text-ink-500 mt-0.5">{subject.teacher}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs text-ink-500 flex-1">
        <div>
          <span className="block text-ink-900 font-medium">
            {subject.internalMarks}/{subject.maxInternalMarks}
          </span>
          Internal
        </div>
        <div>
          <span className="block text-ink-900 font-medium">
            {subject.assignmentMarks}/{subject.maxAssignmentMarks}
          </span>
          Assignment
        </div>
        <div>
          <span className="block text-ink-900 font-medium">
            {subject.examinationMarks}/{subject.maxExaminationMarks}
          </span>
          Examination
        </div>
        <div>
          <span className="block text-ink-900 font-medium">
            {subject.totalMarks}/{subject.maxMarks}
          </span>
          Total
        </div>
        <div>
          <span className="block text-ink-900 font-medium">{subject.percentage}%</span>
          Percentage
        </div>
        <div>
          <span className="block text-ink-900 font-medium">{subject.grade}</span>
          Grade
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 xl:w-56 shrink-0">
        <div className="flex-1 min-w-0">
          <ProgressBar value={subject.percentage} tone={barTone} />
        </div>
        <StatusPill tone={style.tone}>{style.label}</StatusPill>
      </div>
    </div>
  );
}

/**
 * Grades (Student)
 * ----------------
 * Fetch once on mount, then filter by semester and subject client-side.
 */
export default function Grades() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [semesterFilter, setSemesterFilter] = useState("sem5");
  const [subjectFilter, setSubjectFilter] = useState("all");

  useEffect(() => {
    getStudentGrades()
      .then((result) => {
        setData(result);
        setSemesterFilter(result.defaultSemester);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-ink-500 text-sm">Loading your grades…</p>;
  }

  if (error || !data) {
    return (
      <div className="text-center py-20">
        <p className="font-display text-xl text-ink-900">Couldn't load grades</p>
        <p className="text-sm text-ink-500 mt-2">Please refresh the page and try again.</p>
      </div>
    );
  }

  const { semesters, overall, subjects, recentResults, subjectComparison, performanceTrend, insights, semesterOverall } =
    data;

  const semesterSubjects = subjects.filter((s) => s.semester === semesterFilter);
  const semesterResults = recentResults.filter((r) => r.semester === semesterFilter);
  const activeOverall = semesterOverall[semesterFilter] || overall;

  const filteredSubjects = semesterSubjects.filter(
    (subject) => subjectFilter === "all" || subject.name === subjectFilter,
  );

  const filteredResults = semesterResults.filter(
    (result) => subjectFilter === "all" || result.subject === subjectFilter,
  );

  const chartData =
    semesterFilter === data.defaultSemester
      ? subjectComparison
      : semesterSubjects.map((s) => ({
          label: s.name.length > 10 ? s.name.split(" ")[0] : s.name,
          value: s.percentage,
        }));

  const trendImproving =
    performanceTrend[performanceTrend.length - 1].value >= performanceTrend[0].value;

  const semesterInsight =
    semesterFilter === data.defaultSemester
      ? overall.insight
      : `In ${semesters.find((s) => s.key === semesterFilter)?.label}, you averaged ${activeOverall.percentage}%.`;

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-semibold">Grades</h1>
        <p className="text-ink-500 mt-1">
          See how you're performing across your courses and track your academic progress.
        </p>
      </div>

      {/* Overall performance */}
      <section>
        <Card>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:justify-between">
              <div>
                <p className="text-sm text-ink-700">Overall performance</p>
                <p className="text-5xl font-display text-ink-900 mt-1">{activeOverall.percentage}%</p>
                <p className="text-sm text-ink-500 mt-1">
                  Term GPA {activeOverall.termGpa} · CGPA {activeOverall.cgpa}
                </p>
              </div>
              <p className="text-sm text-ink-600 max-w-md">{semesterInsight}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-line">
              <div>
                <p className="text-lg font-medium text-ink-900">{activeOverall.totalSubjects}</p>
                <p className="text-xs text-ink-500 mt-0.5">Total subjects</p>
              </div>
              <div>
                <p className="text-lg font-medium text-ink-900">{activeOverall.passedSubjects}</p>
                <p className="text-xs text-ink-500 mt-0.5">Passed subjects</p>
              </div>
              <div>
                <p className="text-lg font-medium text-ink-900">{activeOverall.needsAttentionCount}</p>
                <p className="text-xs text-ink-500 mt-0.5">Need attention</p>
              </div>
              <div>
                <p className="text-lg font-medium text-ink-900 capitalize">{activeOverall.recentPerformance}</p>
                <p className="text-xs text-ink-500 mt-0.5">Recent performance</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
        <select
          value={semesterFilter}
          onChange={(e) => setSemesterFilter(e.target.value)}
          className={selectClass}
          aria-label="Filter by semester"
        >
          {semesters.map((sem) => (
            <option key={sem.key} value={sem.key}>
              {sem.label}
            </option>
          ))}
        </select>

        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className={selectClass}
          aria-label="Filter by subject"
        >
          <option value="all">All subjects</option>
          {semesterSubjects.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Strongest & weakest */}
      <section className="grid gap-4 sm:grid-cols-2">
        <Card>
          <p className="text-xs text-ink-500">Strongest subject</p>
          <p className="text-sm font-medium text-ink-900 mt-1">
            {activeOverall.strongest.name} is currently your strongest subject at{" "}
            {activeOverall.strongest.percentage}%.
          </p>
        </Card>
        <Card>
          <p className="text-xs text-ink-500">Needs attention</p>
          <p className="text-sm font-medium text-ink-900 mt-1">
            {activeOverall.weakest.name} is currently at {activeOverall.weakest.percentage}%. A little extra
            practice before the next assessment could help.
          </p>
        </Card>
      </section>

      {/* Subject-wise grades */}
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
                <SubjectGradeRow subject={subject} />
              </div>
            ))
          )}
        </Card>
      </section>

      {/* Grade visualization */}
      <section className="grid gap-4 lg:grid-cols-2">
        <div>
          <h2 className="text-base font-semibold mb-3">Subject comparison</h2>
          <Card>
            <TrendChart data={chartData} tone="teal" />
          </Card>
        </div>
        <div>
          <h2 className="text-base font-semibold mb-3">Performance trend</h2>
          <Card>
            <p className="text-sm text-ink-500 mb-4">
              {trendImproving
                ? "Your scores have been trending upward across recent assessments."
                : "Your recent scores dipped slightly — a focused review before the next test could help."}
            </p>
            <TrendChart data={performanceTrend} tone="sage" />
          </Card>
        </div>
      </section>

      {/* Recent results */}
      <section>
        <h2 className="text-base font-semibold mb-3">Recent results</h2>
        <Card padded={false}>
          {filteredResults.length === 0 ? (
            <p className="text-sm text-ink-500 py-8 text-center">No results match your filters.</p>
          ) : (
            filteredResults.map((result, i) => (
              <div
                key={result.id}
                className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 ${
                  i !== filteredResults.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink-900">{result.name}</p>
                  <p className="text-xs text-ink-500 mt-0.5">
                    {result.subject} · {result.date}
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <p className="text-sm font-medium text-ink-900">
                      {result.marksObtained} / {result.maxMarks}
                    </p>
                    <p className="text-xs text-ink-500 mt-0.5">{result.percentage}%</p>
                  </div>
                  <StatusPill tone="positive">{result.grade}</StatusPill>
                </div>
              </div>
            ))
          )}
        </Card>
      </section>

      {/* Performance insights */}
      <section>
        <h2 className="text-base font-semibold mb-3">Worth knowing</h2>
        <div className="space-y-3">
          {insights.map((message, i) => (
            <InsightCard
              key={message}
              subject={i === 0 ? "Overall" : i === 1 ? "Computer Networks" : "DBMS"}
              tone={i === 1 ? "positive" : "warning"}
              message={message}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
