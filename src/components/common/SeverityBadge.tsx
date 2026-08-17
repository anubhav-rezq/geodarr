import React from 'react';
import { SeverityLevel } from '../../types';

interface SeverityBadgeProps {
  level: SeverityLevel;
  score?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({
  level,
  score,
  size = 'md',
  showLabel = true,
  className = ''
}) => {
  const getColors = () => {
    switch (level) {
      case 'CRITICAL':
        return {
          bg: 'bg-red-50',
          text: 'text-red-700',
          border: 'border-red-200',
          dot: 'bg-[#DC2626]',
          label: 'CRITICAL'
        };
      case 'HIGH':
        return {
          bg: 'bg-orange-50',
          text: 'text-orange-700',
          border: 'border-orange-200',
          dot: 'bg-[#F97316]',
          label: 'HIGH'
        };
      case 'MEDIUM':
        return {
          bg: 'bg-amber-50',
          text: 'text-amber-700',
          border: 'border-amber-200',
          dot: 'bg-[#F59E0B]',
          label: 'MEDIUM'
        };
      case 'LOW':
      default:
        return {
          bg: 'bg-emerald-50',
          text: 'text-emerald-700',
          border: 'border-emerald-200',
          dot: 'bg-[#22C55E]',
          label: 'LOW'
        };
    }
  };

  const style = getColors();

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px] font-bold',
    md: 'px-2.5 py-1 text-[11px] font-bold',
    lg: 'px-3.5 py-1.5 text-xs font-bold'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm border font-bold uppercase tracking-wider whitespace-nowrap ${style.bg} ${style.text} ${style.border} ${sizeClasses[size]} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot} shrink-0 animate-pulse`} />
      {showLabel && <span>{style.label}</span>}
      {typeof score === 'number' && (
        <span className="font-mono font-bold opacity-90 border-l border-current/25 pl-1.5 ml-0.5">
          {score}/100
        </span>
      )}
    </span>
  );
};
