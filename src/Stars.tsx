import React from 'react';

export interface StarsProps {
  rating: number; // Ex: 4.5, 5, 4.8
  className?: string;
}

/**
 * Componente <Stars />
 * - 5 ícones SVG de 14px
 * - Cor marrom escuro #5A2E22, gap de 4px
 * - Suporte a notas fracionadas (ex.: 4.5 mostra a última estrela com metade esquerda preenchida e metade direita com 35% de opacidade)
 * - Acessibilidade: aria-label "Nota X de 5" (formatado em pt-BR com vírgula)
 */
export const Stars: React.FC<StarsProps> = ({ rating, className = '' }) => {
  const formattedRating = rating.toFixed(1).replace('.', ',');
  const clipId = React.useId().replace(/:/g, '');

  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      role="img"
      aria-label={`Nota ${formattedRating} de 5`}
    >
      {[1, 2, 3, 4, 5].map((starIndex) => {
        // Estrela totalmente preenchida
        if (rating >= starIndex) {
          return (
            <svg
              key={starIndex}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="#5A2E22"
              className="w-[14px] h-[14px] flex-shrink-0"
              aria-hidden="true"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          );
        }

        // Estrela parcialmente preenchida (ex: 4.5 -> starIndex 5)
        const diff = rating - (starIndex - 1);
        if (diff > 0 && diff < 1) {
          const starClipPathId = `${clipId}-star-${starIndex}`;
          return (
            <div key={starIndex} className="relative w-[14px] h-[14px] flex-shrink-0" aria-hidden="true">
              <svg width="0" height="0" className="absolute">
                <defs>
                  <clipPath id={starClipPathId} clipPathUnits="objectBoundingBox">
                    <rect x="0" y="0" width={diff} height="1" />
                  </clipPath>
                </defs>
              </svg>
              {/* Metade ou fração com opacidade 35% por baixo */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="#5A2E22"
                className="w-[14px] h-[14px] absolute inset-0 opacity-35"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {/* Parte preenchida de 100% clipada */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="#5A2E22"
                className="w-[14px] h-[14px] absolute inset-0"
                style={{ clipPath: `url(#${starClipPathId})` }}
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
          );
        }

        // Estrela vazia (35% opacidade)
        return (
          <svg
            key={starIndex}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="#5A2E22"
            className="w-[14px] h-[14px] flex-shrink-0 opacity-35"
            aria-hidden="true"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      })}
    </div>
  );
};
