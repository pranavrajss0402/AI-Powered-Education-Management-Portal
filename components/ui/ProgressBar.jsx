/**
 * ProgressBar
 * -----------
 * A simple horizontal bar showing "how much of something is done" —
 * used for attendance %, course completion, syllabus progress, etc.
 *
 * Props:
 * - value: number from 0–100
 * - tone: "teal" | "sage" | "amber" (controls the fill color)
 * - label: optional text shown above the bar (e.g. "Attendance")
 */
const tones = {
  teal: "bg-teal-500",
  sage: "bg-sage-400",
  amber: "bg-amber-400",
};

export default function ProgressBar({ value = 0, tone = "teal", label }) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div>
      {label && (
        <div className="flex items-center justify-between mb-1.5 text-sm">
          <span className="text-ink-700">{label}</span>
          <span className="text-ink-500 font-mono text-xs">{clamped}%</span>
        </div>
      )}
      <div className="h-2 w-full rounded-full bg-canvas overflow-hidden">
        <div
          className={`h-full rounded-full ${tones[tone]} transition-all duration-500 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
