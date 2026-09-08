import React from 'react';
import { Link } from 'react-router-dom';
import { useMagnetic } from '@/src/hooks/useMagnetic';
import { useCursor } from '@/src/context/CursorContext';

interface MagneticButtonProps {
  id?: string;
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'pill';
  type?: 'button' | 'submit' | 'reset';
  magneticStrength?: number;
  magneticRadius?: number;
  cursorLabel?: string;
}

export function MagneticButton({
  id,
  children,
  to,
  href,
  onClick,
  className = '',
  variant = 'secondary',
  type = 'button',
  magneticStrength = 0.35,
  magneticRadius = 80,
  cursorLabel,
}: MagneticButtonProps) {
  const magneticRef = useMagnetic<HTMLDivElement>({
    strength: magneticStrength,
    radius: magneticRadius,
  });
  const { setCursorVariant, resetCursor } = useCursor();

  const handleMouseEnter = () => {
    setCursorVariant('pointer', cursorLabel);
  };

  const handleMouseLeave = () => {
    resetCursor();
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider transition-colors duration-300 select-none';

  const variantStyles = {
    primary:
      'bg-[#f4f4f2] text-[#0c0d0e] hover:bg-[#e87a43] hover:text-[#0c0d0e] px-6 py-3 rounded-full font-medium',
    secondary:
      'border border-[rgba(255,255,255,0.15)] text-[#f4f4f2] hover:border-[#e87a43] hover:text-[#e87a43] px-6 py-3 rounded-full',
    ghost:
      'text-[#8e9298] hover:text-[#f4f4f2] px-3 py-2',
    pill:
      'bg-[#141618] border border-[rgba(255,255,255,0.08)] text-[#f4f4f2] hover:border-[rgba(255,255,255,0.25)] px-4 py-2 rounded-full text-[11px]',
  };

  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${className}`;

  const content = (
    <div
      ref={magneticRef}
      id={id}
      className="inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {to ? (
        <Link to={to} className={combinedClasses} onClick={onClick}>
          {children}
        </Link>
      ) : href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
          onClick={onClick}
        >
          {children}
        </a>
      ) : (
        <button type={type} className={combinedClasses} onClick={onClick}>
          {children}
        </button>
      )}
    </div>
  );

  return content;
}
