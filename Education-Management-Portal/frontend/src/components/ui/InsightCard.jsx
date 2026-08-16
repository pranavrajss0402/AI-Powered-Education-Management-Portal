/**
 * InsightCard
 * -----------
 * This is how "AI Recommendations" are shown to students — but on
 * purpose it does NOT look or sound like a robotic AI feature.
 * No "ANALYSIS COMPLETE", no percentages shouting at you.
 * Just a plain, friendly note about one subject, with a couple of
 * concrete next steps.
 *
 * Props:
 * - subject: e.g. "DBMS"
 * - message: one plain-language sentence, e.g.
 *     "Recent scores have dropped a bit compared to last month."
 * - actions: array of short strings, e.g. ["Review Unit 3", "Practice SQL questions"]
 * - tone: "warning" | "positive" — changes the accent color only
 */
export default function InsightCard({ subject, message, actions = [], tone = "warning" }) {
  const accent = tone === "positive" ? "bg-sage-400" : "bg-amber-400";

  return (
    <div className="flex gap-3 rounded-2xl border border-line bg-surface p-4">
      <div className={`w-1 rounded-full ${accent}`} />
      <div className="flex-1">
        <p className="text-sm font-medium text-ink-900">
          {subject} {tone === "positive" ? "is going well" : "needs a little attention"}
        </p>
        <p className="mt-1 text-sm text-ink-500">{message}</p>

        {actions.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {actions.map((action) => (
              <li key={action} className="flex items-start gap-2 text-sm text-ink-700">
                <span className="mt-2 h-1 w-1 rounded-full bg-ink-300 shrink-0" />
                {action}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
