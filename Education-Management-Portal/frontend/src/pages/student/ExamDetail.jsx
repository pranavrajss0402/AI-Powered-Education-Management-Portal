import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "../../components/ui/Card.jsx";
import StatusPill from "../../components/ui/StatusPill.jsx";
import { getStudentExamById } from "../../services/api.js";

const STATUS_STYLE = {
  upcoming: { tone: "warning", label: "Upcoming" },
  completed: { tone: "positive", label: "Completed" },
};

/**
 * ExamDetail
 * ----------
 * Shows one exam in full: schedule, type, instructions, and status.
 * Uses the same fetch-by-id pattern as AssignmentDetail.
 */
export default function ExamDetail() {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudentExamById(id).then((result) => {
      setExam(result);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <p className="text-ink-500 text-sm">Loading exam details…</p>;
  }

  if (!exam) {
    return (
      <div className="text-center py-20">
        <p className="font-display text-xl text-ink-900">Exam not found</p>
        <Link to="/student/exams" className="text-sm text-teal-500 mt-2 inline-block">
          Back to Exams
        </Link>
      </div>
    );
  }

  const style = STATUS_STYLE[exam.status];

  return (
    <div className="space-y-8">
      <div>
        <Link to="/student/exams" className="text-sm text-teal-500">
          ← Back to Exams
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{exam.title}</h1>
          <p className="text-ink-500 mt-1 text-sm">{exam.subject}</p>
        </div>
        <StatusPill tone={style.tone}>{style.label}</StatusPill>
      </div>

      {/* Key details */}
      <Card>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-xs text-ink-500">Date</p>
            <p className="text-sm text-ink-900 mt-1">{exam.date}</p>
          </div>
          <div>
            <p className="text-xs text-ink-500">Start time</p>
            <p className="text-sm text-ink-900 mt-1">{exam.startTime}</p>
          </div>
          <div>
            <p className="text-xs text-ink-500">Duration</p>
            <p className="text-sm text-ink-900 mt-1">{exam.duration}</p>
          </div>
          <div>
            <p className="text-xs text-ink-500">Exam type</p>
            <p className="text-sm text-ink-900 mt-1">{exam.examType}</p>
          </div>
          <div>
            <p className="text-xs text-ink-500">Status</p>
            <p className="text-sm text-ink-900 mt-1">{style.label}</p>
          </div>
        </div>
      </Card>

      {/* Instructions */}
      <section>
        <h2 className="text-base font-semibold mb-3">Instructions</h2>
        <Card>
          <ul className="space-y-2">
            {exam.instructions.map((instruction) => (
              <li key={instruction} className="flex items-start gap-2 text-sm text-ink-700">
                <span className="mt-2 h-1 w-1 rounded-full bg-ink-300 shrink-0" />
                {instruction}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {exam.status === "upcoming" && (
        <p className="text-sm text-ink-500">
          Good luck — make sure you know where to go and what to bring before the day.
        </p>
      )}
    </div>
  );
}
