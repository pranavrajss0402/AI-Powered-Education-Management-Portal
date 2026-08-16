import { useEffect, useState } from "react";
import Card from "../../components/ui/Card.jsx";
import StatusPill from "../../components/ui/StatusPill.jsx";
import InsightCard from "../../components/ui/InsightCard.jsx";
import { getStudentDashboard } from "../../services/api.js";
import { getGreeting } from "../../utils/greeting.js";

/**
 * Dashboard (Student)
 * -------------------
 * The first thing a student sees after logging in. The goal is for
 * it to read like a short, honest daily briefing — not a wall of
 * stat cards. Three simple questions, in order:
 *   1. What's happening today?      -> Today's classes
 *   2. What's waiting for me?       -> Assignments due soon
 *   3. How am I actually doing?     -> Attendance + course highlight + insight
 *
 * Data fetching pattern (this is a common React pattern worth learning):
 * - `data`    holds the response once it arrives
 * - `loading` is true until the request finishes, so we can show
 *             a lightweight loading state instead of a blank page
 * - useEffect with an empty dependency array `[]` means:
 *             "run this once, right after the component first renders"
 */
export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudentDashboard().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p className="text-ink-500 text-sm">Loading your dashboard…</p>;
  }

  const { student, todaysClasses, assignmentsDue, attendance, courseHighlight, insights } = data;

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-semibold">
          {getGreeting()}, {student.name.split(" ")[0]} 👋
        </h1>
        <p className="text-ink-500 mt-1">Here's how you're doing today.</p>
      </div>

      {/* Today's classes */}
      <section>
        <h2 className="text-base font-semibold mb-3">Today</h2>
        <Card padded={false}>
          {todaysClasses.map((cls, i) => (
            <div
              key={cls.subject}
              className={`flex items-center justify-between px-5 py-4 ${
                i !== todaysClasses.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-sm font-mono text-ink-500 w-20 shrink-0">{cls.time}</span>
                <div>
                  <p className="text-sm font-medium text-ink-900">{cls.subject}</p>
                  <p className="text-xs text-ink-500 mt-0.5">{cls.room}</p>
                </div>
              </div>
              <StatusPill tone="neutral">Upcoming</StatusPill>
            </div>
          ))}
        </Card>
      </section>

      {/* Assignments waiting */}
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-base font-semibold">Waiting for you</h2>
          <span className="text-sm text-ink-500">
            {assignmentsDue.length} assignments are waiting for you
          </span>
        </div>
        <Card padded={false}>
          {assignmentsDue.map((a, i) => (
            <div
              key={a.id}
              className={`flex items-center justify-between px-5 py-4 ${
                i !== assignmentsDue.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <div>
                <p className="text-sm font-medium text-ink-900">{a.title}</p>
                <p className="text-xs text-ink-500 mt-0.5">{a.course}</p>
              </div>
              <span className="text-xs text-amber-600 font-medium">{a.dueIn}</span>
            </div>
          ))}
        </Card>
      </section>

      {/* How you're doing */}
      <section>
        <h2 className="text-base font-semibold mb-3">How you're doing</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <p className="text-sm text-ink-700">{attendance.note}</p>
            <p className="mt-2 text-2xl font-display text-ink-900">{attendance.overall}%</p>
            <p className="text-xs text-ink-500 mt-0.5">Overall attendance</p>
          </Card>
          <Card>
            <p className="text-sm text-ink-700">{courseHighlight.message}</p>
          </Card>
        </div>
      </section>

      {/* AI insight teaser */}
      {insights.length > 0 && (
        <section>
          <h2 className="text-base font-semibold mb-3">Worth focusing on</h2>
          <div className="space-y-3">
            {insights.map((insight) => (
              <InsightCard key={insight.subject} {...insight} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
