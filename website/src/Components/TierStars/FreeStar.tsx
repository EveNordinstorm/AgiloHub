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
    <polygon points="118.67 118.67 200 100 118.67 81.33 100 0 81.34 81.33 0 100 81.34 118.67 100 200 118.67 118.67" />
  </svg>
);
