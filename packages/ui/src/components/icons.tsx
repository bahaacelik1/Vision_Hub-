import type { SVGProps } from 'react';

const svg = (props: SVGProps<SVGSVGElement>) => ({
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...props,
});

export const Home = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20h14V9.5" /></svg>
);
export const Search = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);
export const Bell = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><path d="M6 8a6 6 0 0 1 12 0c0 6 2 8 2 8H4s2-2 2-8Z" /><path d="M10 20a2 2 0 0 0 4 0" /></svg>
);
export const Mail = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 7 9-7" /></svg>
);
export const Sun = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
);
export const Moon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></svg>
);
export const Briefcase = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /></svg>
);
export const Rocket = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><path d="M14 3s7 3 7 7l-4 1-4 4-1 4c-4 0-7-7-7-7l3-3 3-3Z" /><circle cx="15" cy="9" r="1.5" /><path d="m4 15-1 6 6-1" /></svg>
);
export const FileText = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6M8 13h8M8 17h5" /></svg>
);
export const GraduationCap = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><path d="m2 10 10-5 10 5-10 5-10-5Z" /><path d="M6 12v5c2 2 10 2 12 0v-5" /></svg>
);
export const Building = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M8 8h2M14 8h2M8 12h2M14 12h2M8 16h2M14 16h2" /></svg>
);
export const School = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><path d="m3 10 9-5 9 5-9 5-9-5Z" /><path d="M12 15v6M5 12v6h14v-6" /></svg>
);
export const Calendar = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
);
export const User = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6" /></svg>
);
export const Compass = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><circle cx="12" cy="12" r="9" /><path d="m15 9-2 5-5 2 2-5 5-2Z" /></svg>
);
export const Users = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><circle cx="9" cy="8" r="4" /><path d="M2 21c1-4 4-6 7-6s6 2 7 6" /><path d="M16 3.5a4 4 0 0 1 0 8M22 21c-.6-3-2.6-5-5-6" /></svg>
);
export const Plus = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><path d="M12 5v14M5 12h14" /></svg>
);
export const Activity = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><path d="M3 12h4l3-8 4 16 3-8h4" /></svg>
);
export const ChevronRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><path d="m9 6 6 6-6 6" /></svg>
);
export const ChevronLeft = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><path d="m15 6-6 6 6 6" /></svg>
);
export const Check = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><path d="m5 12 5 5 9-11" /></svg>
);
export const X = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const Eye = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
);
export const EyeOff = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><path d="M3 3l18 18M10.6 6.2A10 10 0 0 1 22 12c-.7 1.4-1.9 3-3.5 4.2M6.6 6.6C4.3 8 3 10.6 2 12c1.4 2.9 5 7 10 7 1.8 0 3.5-.5 4.9-1.3" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></svg>
);
export const MapPin = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><path d="M12 22s-8-7-8-13a8 8 0 1 1 16 0c0 6-8 13-8 13Z" /><circle cx="12" cy="9" r="3" /></svg>
);
export const Clock = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const Bookmark = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><path d="M6 3h12v18l-6-4-6 4V3Z" /></svg>
);
export const Star = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><path d="m12 3 2.6 5.8 6.4.7-4.8 4.3 1.4 6.2L12 17l-5.6 3 1.4-6.2L3 9.5l6.4-.7L12 3Z" /></svg>
);
export const Settings = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" /></svg>
);
export const LogOut = (p: SVGProps<SVGSVGElement>) => (
  <svg {...svg(p)}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg>
);
