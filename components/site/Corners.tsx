export function Corners({
  className = "",
  color = "border-cyan/35",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <span className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <span className={`absolute left-0 top-0 h-2.5 w-2.5 border-l border-t ${color}`} />
      <span className={`absolute right-0 top-0 h-2.5 w-2.5 border-r border-t ${color}`} />
      <span className={`absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l ${color}`} />
      <span className={`absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r ${color}`} />
    </span>
  );
}
