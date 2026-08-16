/**
 * getGreeting
 * -----------
 * Returns "Good morning" / "Good afternoon" / "Good evening"
 * based on the current time. Small detail, but it's what makes
 * the dashboard feel personal instead of static.
 */
export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
