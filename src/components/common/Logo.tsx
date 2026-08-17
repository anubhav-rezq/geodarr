import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showTagline?: boolean;
  inverted?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  showTagline = false,
  inverted = false,
  className = ''
}) => {
  const iconSizeMap = {
    sm: 24,
    md: 32,
    lg: 44,
    xl: 60
  };

  const currentIconSize = iconSizeMap[size];
  const primaryColor = inverted ? '#ECEBFC' : '#27187E';
  const innerGlobeColor = inverted ? '#7567C7' : '#8E82D5';
  const textColor = inverted ? '#FFFFFF' : '#27187E';
  const taglineColor = inverted ? '#A9A0E2' : '#64647A';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* GEODAR Custom Vector Icon based on official mark */}
      <svg
        width={currentIconSize}
        height={currentIconSize}
        viewBox="0 0 120 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        {/* Ground shadow ripple */}
        <ellipse cx="60" cy="118" rx="34" ry="7" fill={inverted ? 'rgba(255,255,255,0.1)' : '#ECEBFC'} />
        <ellipse cx="60" cy="118" rx="16" ry="3.5" fill={inverted ? 'rgba(255,255,255,0.15)' : '#C5C0EF'} />

        {/* Outer Pin Body & G Form */}
        <path
          d="M60 114C60 114 18 78 18 45C18 21.8 36.8 3 60 3C83.2 3 102 21.8 102 45C102 78 60 114 60 114Z"
          stroke={primaryColor}
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Globe Grid inside */}
        <circle cx="60" cy="45" r="27" fill={inverted ? 'rgba(255,255,255,0.05)' : '#F7F7FF'} />
        <circle cx="60" cy="45" r="27" stroke={innerGlobeColor} strokeWidth="2.5" strokeOpacity="0.6" />
        {/* Globe Longitudes */}
        <ellipse cx="60" cy="45" rx="14" ry="27" stroke={innerGlobeColor} strokeWidth="2" strokeOpacity="0.5" />
        {/* Globe Latitudes */}
        <line x1="33" y1="36" x2="87" y2="36" stroke={innerGlobeColor} strokeWidth="2" strokeOpacity="0.5" />
        <line x1="33" y1="54" x2="87" y2="54" stroke={innerGlobeColor} strokeWidth="2" strokeOpacity="0.5" />

        {/* Bold 'G' Inward Crossbar */}
        <path
          d="M64 45H98"
          stroke={primaryColor}
          strokeWidth="11"
          strokeLinecap="round"
        />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center tracking-[0.22em] font-black text-xl font-sans" style={{ color: textColor }}>
            <span>GEOD</span>
            {/* Custom geometric 'A' with central aperture dot */}
            <span className="relative inline-flex items-center justify-center mx-[0.04em]">
              <span className="font-extrabold">A</span>
              <span 
                className="absolute w-[4px] h-[4px] rounded-full top-[52%] left-[48%] -translate-x-1/2 -translate-y-1/2"
                style={{ backgroundColor: inverted ? '#FFFFFF' : '#27187E' }}
              />
            </span>
            <span>R</span>
          </div>
          {showTagline && (
            <span
              className="text-[9.5px] font-medium tracking-[0.28em] uppercase -mt-0.5"
              style={{ color: taglineColor }}
            >
              understand. predict. protect
            </span>
          )}
        </div>
      )}
    </div>
  );
};
