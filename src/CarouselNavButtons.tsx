import React from 'react';

export interface CarouselNavButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  prevLabel?: string;
  nextLabel?: string;
  variant?: 'light' | 'dark'; // 'light': borda branca sobre fundo lavanda/colorido, 'dark': borda marrom sobre fundo creme
  className?: string;
}

/**
 * Botões circulares reutilizáveis de navegação (← e →)
 * - 44px de diâmetro
 * - Borda de 1px
 * - Espaço de 8px entre eles
 * - Hover com inversão de cores (transição de 0.3s)
 * - Desabilitado: opacidade de 40%, cursor-not-allowed
 */
export const CarouselNavButtons: React.FC<CarouselNavButtonsProps> = ({
  onPrev,
  onNext,
  canPrev,
  canNext,
  prevLabel = 'Item anterior',
  nextLabel = 'Próximo item',
  variant = 'light',
  className = '',
}) => {
  const isDark = variant === 'dark';

  const baseStyle =
    'w-[44px] h-[44px] rounded-full border flex items-center justify-center transition-all duration-300 select-none';

  // Variante Light (especialistas): borda branca, hover bg-white texto lavanda
  const lightEnabled =
    'border-white bg-transparent text-white cursor-pointer hover:bg-white hover:text-[#ADA3F2] active:scale-95 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2';
  const lightDisabled = 'border-white bg-transparent text-white opacity-40 cursor-not-allowed';

  // Variante Dark (reviews): borda #7A3314, hover bg-#7A3314 texto creme #FBF3E4
  const darkEnabled =
    'border-[#7A3314] bg-transparent text-[#7A3314] cursor-pointer hover:bg-[#7A3314] hover:text-[#FBF3E4] active:scale-95 focus-visible:outline-2 focus-visible:outline-[#7A3314] focus-visible:outline-offset-2';
  const darkDisabled = 'border-[#7A3314] bg-transparent text-[#7A3314] opacity-40 cursor-not-allowed';

  const prevClass = `${baseStyle} ${
    isDark
      ? canPrev
        ? darkEnabled
        : darkDisabled
      : canPrev
      ? lightEnabled
      : lightDisabled
  }`;

  const nextClass = `${baseStyle} ${
    isDark
      ? canNext
        ? darkEnabled
        : darkDisabled
      : canNext
      ? lightEnabled
      : lightDisabled
  }`;

  return (
    <div className={`flex items-center gap-2 flex-shrink-0 ${className}`} role="group" aria-label="Controles de navegação">
      {/* Botão Anterior (←) */}
      <button
        type="button"
        aria-label={prevLabel}
        disabled={!canPrev}
        onClick={onPrev}
        className={prevClass}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      </button>

      {/* Botão Próximo (→) */}
      <button
        type="button"
        aria-label={nextLabel}
        disabled={!canNext}
        onClick={onNext}
        className={nextClass}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>
    </div>
  );
};
