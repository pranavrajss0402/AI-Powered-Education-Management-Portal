/**
 * TrendChart
 * ----------
 * A small, dependency-free bar chart. The project doesn't have a
 * charting library yet, and this data is simple enough (a handful
 * of weekly percentages) that pulling one in isn't worth it — a
 * plain SVG does the job and keeps bundle size down.
 *
 * It's placed in components/ui (not inside Attendance.jsx) because
 * the shape it takes — an array of { label, value } points, scaled
 * to a 0-100 range — isn't attendance-specific. Grades or Progress
 * could reuse it later for their own trends.
 *
 * Props:
 * - data: array of { label, value } — value expected 0-100
 * - tone: "teal" | "amber" | "sage" (bar color)
 */
const tones = {
  teal: "#2A6664",
  amber: "#D79A45",
  sage: "#6F9A6C",
};

export default function TrendChart({ data = [], tone = "teal" }) {
  const barColor = tones[tone];
  const chartHeight = 120;
  const barWidth = 28;
  const gap = 18;
  const width = data.length * (barWidth + gap) + gap;

  return (
    <svg
      viewBox={`0 0 ${width} ${chartHeight + 28}`}
      className="w-full h-auto"
      role="img"
      aria-label="Weekly attendance trend"
    >
      {/* Faint baseline so bars have something to sit on */}
      <line x1="0" y1={chartHeight} x2={width} y2={chartHeight} stroke="#E7E9EE" strokeWidth="1" />

      {data.map((point, i) => {
        const barHeight = (point.value / 100) * chartHeight;
        const x = gap + i * (barWidth + gap);
        const y = chartHeight - barHeight;

        return (
          <g key={point.label}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              rx={6}
              fill={barColor}
              opacity={i === data.length - 1 ? 1 : 0.55}
            />
            <text
              x={x + barWidth / 2}
              y={chartHeight + 18}
              textAnchor="middle"
              fontSize="10"
              fill="#6B7280"
              fontFamily="Inter, sans-serif"
            >
              {point.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
