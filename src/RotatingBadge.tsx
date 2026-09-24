import React from 'react';

export interface RotatingBadgeProps {
  text?: string;
  size?: number; // diâmetro em px
  className?: string;
  badgeBgColor?: string;
  textColor?: string;
  iconColor?: string;
}

/**
 * Componente de Selo Circular Giratório Reutilizável (<RotatingBadge />)
 * - Círculo com cor personalizável (padrão amarelo-limão #E6EE4F)
 * - Texto circular SVG com rotação lenta contínua (20s)
 * - Ícone minimalista de dente centralizado
 * - Respeita prefers-reduced-motion
 */
export const RotatingBadge: React.FC<RotatingBadgeProps> = ({
  text = 'SUA SAÚDE BUCAL É NOSSA PRIORIDADE MÁXIMA. ',
  size = 105,
  className = '',
  badgeBgColor = '#E6EE4F',
  textColor = '#7A3314',
  iconColor = '#7A3314',
}) => {
  const badgePathId = React.useId().replace(/:/g, '');

  return (
    <div
      className={`relative select-none group flex items-center justify-center ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      title={text.trim()}
    >
      <div
        className="w-full h-full rounded-full flex items-center justify-center relative shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-transform duration-300 group-hover:scale-105"
        style={{
          backgroundColor: badgeBgColor,
        }}
      >
        {/* Texto em path SVG circular com rotação contínua */}
        <svg
          className="absolute inset-0 w-full h-full animate-rotate-slow pointer-events-none motion-reduce:animate-none"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <defs>
            <path
              id={badgePathId}
              d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
              fill="none"
            />
          </defs>
          <text
            style={{
              fill: textColor,
              letterSpacing: '0.04em',
              fontSize: '9.2px',
              fontWeight: 700,
            }}
            className="uppercase"
          >
            <textPath
              href={`#${badgePathId}`}
              startOffset="0%"
              // Ajusta o texto ao perímetro do círculo (2π·36) para nunca cortar
              textLength={226}
              lengthAdjust="spacingAndGlyphs"
            >
              {text}
            </textPath>
          </text>
        </svg>

        {/* Ícone anatômico de dente no centro */}
        <div className="relative z-10 flex items-center justify-center">
          <svg
            style={{
              width: `${Math.round(size * 0.28)}px`,
              height: `${Math.round(size * 0.28)}px`,
              color: iconColor,
            }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 3.5C4.8 3.5 3.5 5.2 3.5 7.8C3.5 10.8 5 12.8 6 14.2C7 15.8 7.5 18.6 8.5 20.4C9.2 21.4 10.2 20.9 11 18.5L12 15.5L13 18.5C13.8 20.9 14.8 21.4 15.5 20.4C16.5 18.6 17 15.8 18 14.2C19 12.8 20.5 10.8 20.5 7.8C20.5 5.2 19.2 3.5 17 3.5C15 3.5 13.5 4.8 12 5.8C10.5 4.8 9 3.5 7 3.5Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
