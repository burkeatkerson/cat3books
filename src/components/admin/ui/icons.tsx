/**
 * Inline SVG icons used across the admin UI (ported from the prototype).
 * Single <Icon name=... /> component keeps stroke styling consistent.
 */

import type { JSX } from "react";

const PATHS: Record<string, JSX.Element> = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="9" />
      <rect x="14" y="3" width="7" height="5" />
      <rect x="14" y="12" width="7" height="9" />
      <rect x="3" y="16" width="7" height="5" />
    </>
  ),
  companies: (
    <>
      <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-3" />
      <path d="M9 9v.01M9 13v.01M9 17v.01" />
    </>
  ),
  contacts: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 8h5M16 12h5M16 16h3" />
    </>
  ),
  clients: (
    <>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20a7 7 0 0 1 14 0" />
      <path d="m9 8 2 2 3-3.5" />
    </>
  ),
  campaigns: <path d="M3 11l18-7-7 18-3-7-8-4z" />,
  automations: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M6 8.5v4a4 4 0 0 0 4 4h5.5M8.5 6H13a4 4 0 0 1 4 4v5.5" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.4 1a7 7 0 0 0-1.7-1l-.4-2.5h-4l-.4 2.5a7 7 0 0 0-1.7 1l-2.4-1-2 3.5 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.5 2.4-1a7 7 0 0 0 1.7 1l.4 2.5h4l.4-2.5a7 7 0 0 0 1.7-1l2.4 1 2-3.5-2-1.5a7 7 0 0 0 .1-1z" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3-3" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  win: <path d="M12 2v20M5 9l7-7 7 7" />,
  note: (
    <>
      <path d="M4 4h16v12l-4 4H4z" />
      <path d="M16 20v-4h4" />
    </>
  ),
  reply: (
    <>
      <path d="M9 17l-5-5 5-5" />
      <path d="M4 12h11a5 5 0 0 1 5 5v1" />
    </>
  ),
  client: <path d="M20 6 9 17l-5-5" />,
  churn: <path d="M18 6 6 18M6 6l12 12" />,
  check: <path d="M5 12l5 5L20 7" />,
};

export type IconName = keyof typeof PATHS;

export function Icon({
  name,
  className = "w-4 h-4",
  strokeWidth = 1.6,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
