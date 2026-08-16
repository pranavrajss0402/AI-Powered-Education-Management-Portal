/**
 * Avatar
 * ------
 * Shows a person's initials in a soft colored circle.
 * We use initials instead of a photo so the app works instantly
 * with mock data — no need for real profile pictures yet.
 *
 * Props:
 * - name: full name, e.g. "Aditi Sharma" -> shows "AS"
 * - size: "sm" | "md" | "lg" (defaults to "md")
 */
const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-16 w-16 text-lg",
};

function getInitials(name = "") {
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Avatar({ name, size = "md" }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-teal-50 text-teal-600 font-medium font-display shrink-0 ${sizes[size]}`}
    >
      {getInitials(name)}
    </div>
  );
}
