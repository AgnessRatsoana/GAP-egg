import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  taglineColor?: string;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = true,
  taglineColor = 'var(--color-brown)',
  className = '',
}) => {
  const iconSize = size === 'sm' ? 32 : size === 'lg' ? 48 : 38;
  const titleFontSize = size === 'sm' ? '18px' : size === 'lg' ? '26px' : '22px';
  const tagFontSize = size === 'sm' ? '9px' : size === 'lg' ? '11px' : '10px';

  return (
    <div
      className={`logo-container ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: size === 'sm' ? '10px' : '12px',
        userSelect: 'none',
      }}
    >
      {/* Handcrafted Emblem SVG: Sanctuary Crescent + Rising Horizon Sun + Renewal Leaf */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <defs>
          {/* Aegean Sea Gradient */}
          <linearGradient id="seaGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#367A8F" />
            <stop offset="100%" stopColor="#22596B" />
          </linearGradient>

          {/* Warm Sun Gold Gradient */}
          <linearGradient id="sunGrad" x1="16" y1="12" x2="32" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E5A872" />
            <stop offset="100%" stopColor="#C27450" />
          </linearGradient>

          {/* Botanical Sage Gradient */}
          <linearGradient id="sageGrad" x1="20" y1="20" x2="34" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4E8468" />
            <stop offset="100%" stopColor="#2B5440" />
          </linearGradient>
        </defs>

        {/* Outer Circular Haven / Haven Arc with Soft Drop */}
        <circle cx="24" cy="24" r="22" stroke="url(#seaGrad)" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="3 3" />
        
        {/* Protective Sanctuary Crescent Outer Shell */}
        <path
          d="M 12 28 C 10 18, 20 8, 32 10 C 37 11, 40 14, 40 14 C 40 14, 35 12, 28 14 C 18 16, 14 24, 18 33 C 21 39, 29 41, 35 38 C 40 35, 42 30, 42 30 C 42 30, 38 37, 30 39 C 20 41, 13 36, 12 28 Z"
          fill="url(#seaGrad)"
          opacity="0.9"
        />

        {/* Rising Warm Sun (Dawn of Inner Peace) */}
        <circle cx="27" cy="20" r="6" fill="url(#sunGrad)" />

        {/* Sprouting Renewal Leaf (Returning to oneself) */}
        <path
          d="M 22 34 C 20 27, 26 21, 33 19 C 34 26, 29 32, 22 34 Z"
          fill="url(#sageGrad)"
        />
        
        {/* Subtle Water Reflection Ripple */}
        <path
          d="M 16 35 C 20 34, 24 36, 28 35 C 32 34, 35 35, 37 35"
          stroke="#367A8F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
      </svg>

      {/* Brand Text Lockup */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          className="font-serif"
          style={{
            fontSize: titleFontSize,
            fontWeight: 600,
            letterSpacing: '0.08em',
            color: 'var(--text-heading)',
            textTransform: 'uppercase',
            lineHeight: 1.1,
          }}
        >
          GAP A MONTH
        </div>
        {showTagline && (
          <div
            style={{
              fontSize: tagFontSize,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: taglineColor,
              marginTop: '3px',
              fontWeight: 600,
              fontFamily: 'var(--font-sans)',
            }}
          >
            A season to return to yourself
          </div>
        )}
      </div>
    </div>
  );
};
