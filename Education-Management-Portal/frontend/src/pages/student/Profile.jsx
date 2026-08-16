import { useEffect, useState } from "react";
import Card from "../../components/ui/Card.jsx";
import Avatar from "../../components/ui/Avatar.jsx";
import StatusPill from "../../components/ui/StatusPill.jsx";
import ProgressBar from "../../components/ui/ProgressBar.jsx";
import { getStudentProfile } from "../../services/api.js";

/**
 * Field
 * -----
 * A tiny local helper (not in components/ui because it's specific
 * to this label/value layout) — renders one "label above value" pair.
 * Kept inline here since Profile.jsx is the only place that needs it.
 */
function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-ink-500">{label}</p>
      <p className="text-sm text-ink-900 mt-1">{value}</p>
    </div>
  );
}

/**
 * Profile (Student)
 * -----------------
 * A read-only view of the student's own details. Split into three
 * plain sections — personal info, academic info, and a small
 * snapshot — rather than one long form. Nothing here is editable
 * yet; AK hasn't defined an update-profile endpoint, so this page
 * only reads data for now.
 *
 * Same fetch pattern as Dashboard.jsx: fetch once on mount, show a
 * lightweight loading line until it resolves.
 */
export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudentProfile().then((result) => {
      setProfile(result);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p className="text-ink-500 text-sm">Loading your profile…</p>;
  }

  const { academic, snapshot } = profile;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Avatar name={profile.name} size="lg" />
        <div>
          <h1 className="text-2xl font-semibold">{profile.name}</h1>
          <p className="text-ink-500 text-sm mt-1">
            {profile.rollNumber} · {academic.course}
          </p>
          <div className="mt-2">
            <StatusPill tone="neutral">
              Semester {academic.semester} · Section {academic.section}
            </StatusPill>
          </div>
        </div>
      </div>

      {/* Snapshot */}
      <section>
        <h2 className="text-base font-semibold mb-3">Snapshot</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <p className="text-2xl font-display text-ink-900">{snapshot.cgpa}</p>
            <p className="text-xs text-ink-500 mt-0.5">Current CGPA</p>
          </Card>
          <Card>
            <ProgressBar value={snapshot.attendance} label="Attendance" tone="teal" />
          </Card>
        </div>
      </section>

      {/* Personal details */}
      <section>
        <h2 className="text-base font-semibold mb-3">Personal details</h2>
        <Card>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Email" value={profile.email} />
            <Field label="Phone" value={profile.phone} />
            <Field label="Date of birth" value={profile.dateOfBirth} />
            <Field label="Blood group" value={profile.bloodGroup} />
            <Field label="Address" value={profile.address} />
          </div>
        </Card>
      </section>

      {/* Academic details */}
      <section>
        <h2 className="text-base font-semibold mb-3">Academic details</h2>
        <Card>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Course" value={academic.course} />
            <Field label="Batch" value={academic.batch} />
            <Field label="Semester" value={academic.semester} />
            <Field label="Section" value={academic.section} />
            <Field label="Faculty advisor" value={academic.advisor} />
          </div>
        </Card>
      </section>
    </div>
  );
}
