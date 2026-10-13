export function Mark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 3 L28 28 H20.8 L16 17.2 L11.2 28 H4 L16 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="miter"
      />
      <path d="M10 28 H22" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16" cy="20.5" r="1.15" fill="currentColor" />
    </svg>
  );
}
