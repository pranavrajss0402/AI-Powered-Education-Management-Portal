import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import StatusPill from "../../components/ui/StatusPill.jsx";
import { getStudentAssignmentById, submitAssignment } from "../../services/api.js";

const STATUS_STYLE = {
  pending: { tone: "neutral", label: "Pending" },
  submitted: { tone: "neutral", label: "Submitted" },
  graded: { tone: "positive", label: "Graded" },
  overdue: { tone: "alert", label: "Overdue" },
};

/**
 * SubmissionPanel
 * ----------------
 * The part of the page that changes depending on where the
 * assignment stands. Kept as its own function (not a separate file,
 * since it's only used here) to keep AssignmentDetail's main body
 * readable — three clearly separate cases instead of one big
 * tangle of conditionals inline.
 *
 * Props:
 * - assignment: the current assignment object
 * - onSubmitted: called with the updated assignment after a
 *   successful mock submission, so the parent page can update state
 */
function SubmissionPanel({ assignment, onSubmitted }) {
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Already graded — show the result, nothing left to do.
  if (assignment.status === "graded") {
    return (
      <Card>
        <p className="text-sm font-medium text-ink-900">
          You scored {assignment.marksObtained} / {assignment.maxMarks}
        </p>
        <p className="text-xs text-ink-500 mt-1">
          Submitted on {assignment.submittedOn} · {assignment.submissionFileName}
        </p>
      </Card>
    );
  }

  // Already submitted, waiting to be graded.
  if (assignment.status === "submitted") {
    return (
      <Card>
        <p className="text-sm font-medium text-ink-900">You've submitted this assignment.</p>
        <p className="text-xs text-ink-500 mt-1">
          Submitted on {assignment.submittedOn} · {assignment.submissionFileName}
        </p>
        <p className="text-xs text-ink-500 mt-2">It's waiting to be graded.</p>
      </Card>
    );
  }

  // Pending or overdue — show the upload + submit UI.
  const handleSubmit = async () => {
    if (!file) return;
    setSubmitting(true);
    const updated = await submitAssignment(assignment.id, file.name);
    setSubmitting(false);
    onSubmitted(updated);
  };

  return (
    <Card>
      <p className="text-sm font-medium text-ink-900">Submit your work</p>
      <p className="text-xs text-ink-500 mt-1">
        Choose a file from your device, then submit it below.
      </p>

      <label className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-dashed border-line px-4 py-3 cursor-pointer hover:bg-canvas">
        <span className="text-sm text-ink-700 truncate">
          {file ? file.name : "Choose a file to upload"}
        </span>
        <span className="text-xs text-teal-500 font-medium shrink-0">Browse</span>
        <input
          type="file"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </label>

      <div className="mt-4">
        <Button onClick={handleSubmit} disabled={!file || submitting}>
          {submitting ? "Submitting…" : "Submit assignment"}
        </Button>
      </div>
    </Card>
  );
}

/**
 * AssignmentDetail
 * ----------------
 * Shows one assignment in full: description, due date, max marks,
 * instructions, and the submission panel above.
 *
 * `useParams()` reads the `:id` piece out of the URL
 * (e.g. "/student/assignments/asn1" -> id = "asn1"). We use that to
 * ask the API service for exactly that one assignment.
 */
export default function AssignmentDetail() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudentAssignmentById(id).then((result) => {
      setAssignment(result);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <p className="text-ink-500 text-sm">Loading assignment…</p>;
  }

  if (!assignment) {
    return (
      <div className="text-center py-20">
        <p className="font-display text-xl text-ink-900">Assignment not found</p>
        <Link to="/student/assignments" className="text-sm text-teal-500 mt-2 inline-block">
          Back to Assignments
        </Link>
      </div>
    );
  }

  const style = STATUS_STYLE[assignment.status];

  return (
    <div className="space-y-8">
      <div>
        <Link to="/student/assignments" className="text-sm text-teal-500">
          ← Back to Assignments
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{assignment.title}</h1>
          <p className="text-ink-500 mt-1 text-sm">
            {assignment.subject} · {assignment.teacher}
          </p>
        </div>
        <StatusPill tone={style.tone}>{style.label}</StatusPill>
      </div>

      {/* Key details */}
      <Card>
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <p className="text-xs text-ink-500">Due date</p>
            <p className="text-sm text-ink-900 mt-1">{assignment.dueDate}</p>
          </div>
          <div>
            <p className="text-xs text-ink-500">Maximum marks</p>
            <p className="text-sm text-ink-900 mt-1">{assignment.maxMarks}</p>
          </div>
          <div>
            <p className="text-xs text-ink-500">Status</p>
            <p className="text-sm text-ink-900 mt-1">{style.label}</p>
          </div>
        </div>
      </Card>

      {/* Description */}
      <section>
        <h2 className="text-base font-semibold mb-3">Description</h2>
        <Card>
          <p className="text-sm text-ink-700">{assignment.description}</p>
        </Card>
      </section>

      {/* Instructions */}
      <section>
        <h2 className="text-base font-semibold mb-3">Instructions</h2>
        <Card>
          <ul className="space-y-2">
            {assignment.instructions.map((instruction) => (
              <li key={instruction} className="flex items-start gap-2 text-sm text-ink-700">
                <span className="mt-2 h-1 w-1 rounded-full bg-ink-300 shrink-0" />
                {instruction}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* Submission */}
      <section>
        <h2 className="text-base font-semibold mb-3">Your submission</h2>
        <SubmissionPanel assignment={assignment} onSubmitted={setAssignment} />
      </section>
    </div>
  );
}
