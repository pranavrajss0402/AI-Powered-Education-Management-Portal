/**
 * StatusPill
 * ----------
 * A small rounded label used to show a quick status at a glance —
 * e.g. "Needs attention", "On track", "Pending review".
 *
 * We keep a fixed set of "tones" so colors stay consistent everywhere
 * instead of every page picking its own random color for "warning".
 *
 * Props:
 * - tone: "positive" | "warning" | "alert" | "neutral"  (defaults to "neutral")
 * - children: the label text
 */
const tones = {
  positive: "bg-sage-50 text-sage-500",
  warning: "bg-amber-50 text-amber-600",
  alert: "bg-clay-50 text-clay-500",
  neutral: "bg-canvas text-ink-500",
};

export default function StatusPill({ tone = "neutral", children }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
