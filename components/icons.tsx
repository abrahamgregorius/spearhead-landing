import type { SVGProps } from "react";

/* Compact inline icon set (stroke-based, no external dependency). */

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 16, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const Sun = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </Icon>
);

export const Moon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </Icon>
);

export const Menu = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
);

export const Close = (p: IconProps) => (
  <Icon {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Icon>
);

export const Search = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-3.8-3.8" />
  </Icon>
);

export const Calendar = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
    <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
  </Icon>
);

export const Download = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3v11m0 0 4-4m-4 4-4-4" />
    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
  </Icon>
);

export const Sparkles = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z" />
    <path d="M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z" />
  </Icon>
);

export const ArrowRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 12h15m0 0-6-6m6 6-6 6" />
  </Icon>
);

export const ArrowUpRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M7 17 17 7m0 0h-8m8 0v8" />
  </Icon>
);

export const TrendUp = (p: IconProps) => (
  <Icon {...p}>
    <path d="m3 17 6-6 4 4 8-8" />
    <path d="M15 7h6v6" />
  </Icon>
);

export const TrendDown = (p: IconProps) => (
  <Icon {...p}>
    <path d="m3 7 6 6 4-4 8 8" />
    <path d="M15 17h6v-6" />
  </Icon>
);

export const Check = (p: IconProps) => (
  <Icon {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </Icon>
);

export const ChevronDown = (p: IconProps) => (
  <Icon {...p}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);

export const ChevronUp = (p: IconProps) => (
  <Icon {...p}>
    <path d="m6 15 6-6 6 6" />
  </Icon>
);

export const ChevronLeft = (p: IconProps) => (
  <Icon {...p}>
    <path d="m15 6-6 6 6 6" />
  </Icon>
);

export const ChevronRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="m9 6 6 6-6 6" />
  </Icon>
);

export const LayoutDashboard = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="3" width="8" height="10" rx="1.5" />
    <rect x="13" y="3" width="8" height="6" rx="1.5" />
    <rect x="13" y="11" width="8" height="10" rx="1.5" />
    <rect x="3" y="15" width="8" height="6" rx="1.5" />
  </Icon>
);

export const ChartLine = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 3v16a2 2 0 0 0 2 2h16" />
    <path d="m7 14 4-4 3 3 5-6" />
  </Icon>
);

export const Megaphone = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 11v3a1 1 0 0 0 1 1h2l3.6 4.1a1 1 0 0 0 1.4.1V5.8a1 1 0 0 0-1.4.1L6 10H4a1 1 0 0 0-1 1z" />
    <path d="M15 8.5a5 5 0 0 1 0 7M18 6a9 9 0 0 1 0 12" />
  </Icon>
);

export const Gear = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.11-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1.11 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h.01a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.01a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1z" />
  </Icon>
);

export const Send = (p: IconProps) => (
  <Icon {...p}>
    <path d="m22 2-7 20-4-9-9-4 20-7z" />
    <path d="M22 2 11 13" />
  </Icon>
);

export const Bot = (p: IconProps) => (
  <Icon {...p}>
    <rect x="4" y="8" width="16" height="12" rx="3" />
    <path d="M12 8V4m0 0h3M9 13v2m6-2v2" />
    <circle cx="12" cy="2.5" r="1" />
  </Icon>
);

export const User = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5" />
  </Icon>
);

export const Target = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
  </Icon>
);

export const Users = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20c1.2-3 3.7-4.5 6.5-4.5s5.3 1.5 6.5 4.5" />
    <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18.5 15.7c1.6.8 2.7 2.2 3.3 4.3" />
  </Icon>
);

export const MouseClick = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 3.5v3M4.6 5.6l2.1 2.1M3.5 10h3M14.6 5.6l-2.1 2.1" />
    <path d="m10 11 10.5 4.2-4.6 1.7-1.7 4.6L10 11z" />
  </Icon>
);

export const Dollar = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 2v20" />
    <path d="M17 6.5c-.8-1.5-2.6-2.3-5-2.3-2.8 0-4.7 1.3-4.7 3.4 0 4.6 10 2.2 10 7 0 2.2-2 3.6-5.3 3.6-2.7 0-4.6-.9-5.5-2.6" />
  </Icon>
);

export const Zap = (p: IconProps) => (
  <Icon {...p}>
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
  </Icon>
);

export const Info = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5m0-8.5v.5" />
  </Icon>
);

export const Filter = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 5h18l-7 8v5.5L10 20v-7L3 5z" />
  </Icon>
);

export const Refresh = (p: IconProps) => (
  <Icon {...p}>
    <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
  </Icon>
);

export const Flag = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 21V4m0 0 5.5 1.5a4 4 0 0 0 3-.4l.8-.5a4 4 0 0 1 3.6-.2L19 5v9l-1.1-.5a4 4 0 0 0-3.6.2l-.8.5a4 4 0 0 1-3 .4L5 13" />
  </Icon>
);

export const Layers = (p: IconProps) => (
  <Icon {...p}>
    <path d="m12 2 9 5-9 5-9-5 9-5z" />
    <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
  </Icon>
);

export const Play = (p: IconProps) => (
  <Icon {...p}>
    <path d="M7 4.5v15l13-7.5-13-7.5z" />
  </Icon>
);

export const Plus = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

export const Copy = (p: IconProps) => (
  <Icon {...p}>
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </Icon>
);

export const ShieldCheck = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 2 4.5 5v6c0 4.8 3.2 8.6 7.5 10 4.3-1.4 7.5-5.2 7.5-10V5L12 2z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);

export const Gauge = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.5 18a9 9 0 1 1 15 0" />
    <path d="m12 13 3.5-3.5" />
    <circle cx="12" cy="13" r="1.3" fill="currentColor" stroke="none" />
  </Icon>
);
