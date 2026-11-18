import type { Category } from "@/lib/types";

interface Props {
  category: Category;
  from: string;
  to: string;
  accent: string;
  label: string;
  tint?: string;
}

const shapes: Record<Category, string> = {
  tees: "M60 40 L90 30 Q120 52 150 30 L180 40 L205 78 L178 92 L170 82 L170 190 L70 190 L70 82 L62 92 L35 78 Z",
  hoodies:
    "M55 52 L90 36 Q120 60 150 36 L185 52 L210 110 L182 118 L176 100 L176 196 L64 196 L64 100 L58 118 L30 110 Z M95 40 Q120 80 145 40",
  cargos: "M72 36 L168 36 L180 200 L128 200 L120 96 L112 200 L60 200 Z",
  jackets:
    "M52 48 L92 34 Q120 52 148 34 L188 48 L214 120 L184 128 L178 106 L178 196 L62 196 L62 106 L56 128 L26 120 Z M120 52 L120 196",
  accessories: "M60 120 Q60 60 120 60 Q180 60 180 120 L205 130 L205 148 L35 148 L35 130 Z",
};

export default function ProductArt({ category, from, to, accent, label, tint }: Props) {
  const id = `g-${label.replace(/\W/g, "")}`;
  return (
    <svg viewBox="0 0 240 240" role="img" aria-label={`${label} illustration`} className="h-full w-full">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        <pattern id={`${id}-dots`} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.6" fill={accent} opacity="0.25" />
        </pattern>
      </defs>
      <rect width="240" height="240" fill={`url(#${id})`} />
      <rect width="240" height="240" fill={`url(#${id}-dots)`} />
      <circle cx="198" cy="42" r="26" fill={accent} opacity="0.9" />
      <path d={shapes[category]} fill={tint ?? accent} stroke={accent} strokeWidth="4" strokeLinejoin="round" fillRule="evenodd" transform="translate(5 6)" opacity="0.25" />
      <path d={shapes[category]} fill={tint ?? "#fffdf5"} stroke={accent} strokeWidth="5" strokeLinejoin="round" fillRule="evenodd" />
      <text x="120" y="228" textAnchor="middle" fontSize="16" fontWeight="900" fill={accent} fontFamily="Impact, sans-serif" letterSpacing="3">
        DRIP LAB
      </text>
    </svg>
  );
}
