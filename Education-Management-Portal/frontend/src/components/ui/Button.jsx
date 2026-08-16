/**
 * Button
 * ------
 * A single button component with a few "variants" (visual styles).
 * Instead of writing long className strings every time we need a button,
 * we just write <Button variant="primary">Save</Button>.
 *
 * Props:
 * - variant: "primary" | "secondary" | "ghost"  (defaults to "primary")
 * - as: renders as a <button> by default, but pass as="a" style usage
 *       is handled by the caller if ever needed (kept simple for now)
 * - ...rest: any other prop (onClick, type, disabled, etc.) is passed
 *   straight through to the underlying <button>
 */
const variants = {
  primary:
    "bg-teal-500 text-white hover:bg-teal-600 active:bg-teal-700",
  secondary:
    "bg-white text-ink-700 border border-line hover:bg-canvas",
  ghost:
    "bg-transparent text-teal-500 hover:bg-teal-50",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...rest
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5
        text-sm font-medium transition-colors duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
