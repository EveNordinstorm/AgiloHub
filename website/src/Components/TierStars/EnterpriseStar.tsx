interface FreeStarProps {
  className?: string;
}

export const FreeStar = ({ className }: FreeStarProps) => (
  <svg
    className={className ?? "h-20"}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 200 200"
  >
    <polygon points="100 0 116.06 71.03 180.19 39.62 136.07 96.76 200 128.62 128.92 128.87 144.51 200 100 143.15 55.5 200 71.09 128.87 0 128.62 63.93 96.76 19.82 39.62 83.95 71.03 100 0" />
  </svg>
);
