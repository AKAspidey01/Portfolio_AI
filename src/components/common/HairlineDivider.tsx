interface HairlineDividerProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function HairlineDivider({
  className = '',
  orientation = 'horizontal',
}: HairlineDividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={`w-[1px] bg-[rgba(255,255,255,0.08)] ${className}`}
      />
    );
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={`h-[1px] w-full bg-[rgba(255,255,255,0.08)] ${className}`}
    />
  );
}
