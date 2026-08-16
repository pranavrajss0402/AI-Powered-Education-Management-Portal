/**
 * Card
 * ----
 * The base "surface" component. Almost everything visual in this app
 * (a course tile, an assignment row, a stat block) sits inside a Card.
 *
 * Why a wrapper instead of just writing the classes everywhere?
 * If we ever want to change how cards look (shadow, radius, padding),
 * we change it in ONE place instead of hunting through every page.
 *
 * Props:
 * - children: whatever you want to put inside the card
 * - className: extra Tailwind classes to tweak a specific instance
 * - padded: set to false if you want to control padding yourself
 *           (useful for cards that have a full-bleed header image, etc.)
 * - as: which HTML element to render as (defaults to 'div')
 */
export default function Card({ children, className = "", padded = true, as: Tag = "div" }) {
  return (
    <Tag
      className={`bg-surface border border-line rounded-2xl shadow-soft ${
        padded ? "p-5" : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
