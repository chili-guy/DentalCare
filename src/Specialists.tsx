import React, { useRef, useState, useEffect, useCallback } from 'react';

export interface Specialist {
  id: string;
  name: string;
  specialty: string;
  bgColor: string;
  image: string;
  fallbackImage?: string;
}

export const SPECIALISTS: Specialist[] = [
  {
    id: 'dr-john-smith',
    name: 'Dr. John Smith',
    specialty: 'Especialista em Ortodontia',
    bgColor: '#F2A97A',
    image: '/specialists/dr-john-smith.jpg',
    fallbackImage:
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=85&w=800',
  },
  {
    id: 'dr-david-kim',
    name: 'Dr. David Kim',
    specialty: 'Especialista em Endodontia',
    bgColor: '#E8D5FB',
    image: '/specialists/dr-david-kim.jpg',
    fallbackImage:
      'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=85&w=800',
  },
  {
    id: 'dr-sarah-lee',
    name: 'Dra. Sarah Lee',
    specialty: 'Especialista em Periodontia',
    bgColor: '#F6D98B',
    image: '/specialists/dr-sarah-lee.jpg',
    fallbackImage:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=85&w=800',
  },
  {
    id: 'dr-steven-lee',
    name: 'Dr. Steven Lee',
    specialty: 'Odontologia Estética',
    bgColor: '#C3D5FA',
    image: '/specialists/dr-steven-lee.jpg',
    fallbackImage:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=85&w=800',
  },
];

export interface SpecialistsProps {
  specialists?: Specialist[];
  className?: string;
}

/**
 * Seção <Specialists />
 *
 * Especificações implementadas fielmente:
 * - Fundo lavanda: #ADA3F2
 * - Todo o texto em branco
 * - Fonte dos títulos ("Instrument Sans" ou "Inter Tight")
 * - Container max-w-[1100px], centralizado, px-[5vw], py-[120px]
 * - Cabeçalho:
 *   - Título "Nossos Especialistas" à esquerda: clamp(2.5rem, 6vw, 4.5rem), peso 400, tracking -0.03em
 *   - Botões circulares (← e →) de 44px com borda branca de 1px, alinhados verticalmente ao centro do título
 *   - Espaço de 8px entre os botões
 *   - Hover: fundo branco e seta #ADA3F2 (transição 0.3s)
 *   - Estado desabilitado (início/fim): opacidade 40%, sem hover
 *   - Ocultos no desktop (≥ 1024px) e visíveis apenas quando o carrossel está ativo (< 1024px)
 *   - Margem entre cabeçalho e cards: ~64px
 * - Dados: SPECIALISTS com no máximo 4 itens (.slice(0, 4))
 * - Card do especialista:
 *   - Círculo perfeito com cor pastel de fundo
 *   - Foto enquadrada do peito para cima, object-cover e object-position: top
 *   - Nome abaixo do círculo: 17px, peso 500, centralizado, mt-4 (16px)
 *   - Especialidade: 12px, opacidade 85%, centralizado, mt-1 (4px)
 *   - Hover no card: círculo escala 1.04 e foto sobe 4px (transição 0.4s)
 * - Layout responsivo:
 *   - Desktop (≥ 1024px): grade de 4 colunas iguais, gap 24px, círculos 100% da largura (aspect-square)
 *   - Tablet (768px a 1023px): carrossel mostrando 2.5 cards (terceiro cortado à direita)
 *   - Mobile (< 768px): carrossel mostrando 1.3 cards
 *   - Scroll nativo com scroll-snap-type: x mandatory e scroll-snap-align: start, sem scrollbar visível
 *   - Setas rolam exatamente 1 card por clique com scroll suave
 * - Acessibilidade:
 *   - Botões com aria-label "Especialista anterior" e "Próximo especialista"
 *   - Fotos com alt "Foto de [Nome]"
 *   - Semântica <ul> e <li>
 */
export const Specialists: React.FC<SpecialistsProps> = ({
  specialists = SPECIALISTS,
  className = '',
}) => {
  // Garantir no máximo 4 especialistas
  const activeSpecialists = specialists.slice(0, 4);

  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Checa e atualiza os limites de scroll do carrossel
  const checkScrollBounds = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    // Margem de tolerância de 4px para lidar com subpixels
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    checkScrollBounds();
    el.addEventListener('scroll', checkScrollBounds, { passive: true });
    window.addEventListener('resize', checkScrollBounds);

    return () => {
      el.removeEventListener('scroll', checkScrollBounds);
      window.removeEventListener('resize', checkScrollBounds);
    };
  }, [checkScrollBounds]);

  const scrollByCard = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const firstCard = el.querySelector('li') as HTMLElement | null;
    if (!firstCard) return;

    // Largura do card + gap (24px)
    const cardWidth = firstCard.offsetWidth + 24;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;

    el.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      aria-label="Nossos Especialistas"
      className={`w-full bg-[#ADA3F2] text-white font-hero py-[120px] overflow-hidden select-none ${className}`}
    >
      <div className="max-w-[1100px] mx-auto px-[5vw]">
        {/* ============================================================== */}
        {/* CABEÇALHO: Título à esquerda e botões à direita (< 1024px)    */}
        {/* ============================================================== */}
        <div className="flex items-center justify-between gap-4 mb-[64px]">
          <h2
            className="font-normal text-white tracking-[-0.03em] leading-none"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            }}
          >
            Nossos Especialistas
          </h2>

          {/* Botões de navegação: Ocultos no desktop (lg:hidden), visíveis abaixo de 1024px */}
          <div className="flex lg:hidden items-center gap-2 flex-shrink-0" aria-label="Controles do carrossel">
            {/* Botão Anterior (←) */}
            <button
              type="button"
              aria-label="Especialista anterior"
              disabled={!canScrollLeft}
              onClick={() => scrollByCard('left')}
              className={`w-[44px] h-[44px] rounded-full border border-white flex items-center justify-center transition-all duration-300 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 ${
                !canScrollLeft
                  ? 'opacity-40 cursor-not-allowed'
                  : 'bg-transparent text-white cursor-pointer hover:bg-white hover:text-[#ADA3F2] active:scale-95'
              }`}
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
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>

            {/* Botão Próximo (→) */}
            <button
              type="button"
              aria-label="Próximo especialista"
              disabled={!canScrollRight}
              onClick={() => scrollByCard('right')}
              className={`w-[44px] h-[44px] rounded-full border border-white flex items-center justify-center transition-all duration-300 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 ${
                !canScrollRight
                  ? 'opacity-40 cursor-not-allowed'
                  : 'bg-transparent text-white cursor-pointer hover:bg-white hover:text-[#ADA3F2] active:scale-95'
              }`}
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
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* LISTA DE CARDS: Grade no Desktop e Carrossel Snap em Telas Menores */}
        {/* ============================================================== */}
        <ul
          ref={scrollContainerRef}
          role="list"
          className="
            /* Desktop (≥ 1024px): Grade fixa de 4 colunas */
            lg:grid lg:grid-cols-4 lg:gap-6
            /* Tablet e Mobile (< 1024px): Carrossel horizontal scroll-snap */
            flex gap-6 overflow-x-auto overflow-y-hidden
            snap-x snap-mandatory scroll-smooth
            no-scrollbar
            -mx-[5vw] px-[5vw] lg:mx-0 lg:px-0
          "
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {activeSpecialists.map((specialist) => (
            <li
              key={specialist.id}
              className="
                group cursor-pointer flex-shrink-0 snap-start
                /* Mobile (< 768px): 1.3 cards visíveis */
                w-[calc((100vw-10vw-24px)/1.3)]
                /* Tablet (768px a 1023px): 2.5 cards visíveis */
                md:w-[calc((100vw-10vw-48px)/2.5)]
                /* Desktop (≥ 1024px): 100% da coluna */
                lg:w-auto
              "
            >
              {/* Círculo perfeito com cor pastel de fundo */}
              <div
                className="w-full aspect-square rounded-full overflow-hidden relative shadow-sm transition-transform duration-[400ms] ease-out group-hover:scale-[1.04]"
                style={{
                  backgroundColor: specialist.bgColor,
                }}
              >
                <img
                  src={specialist.image}
                  alt={`Foto de ${specialist.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    if (specialist.fallbackImage && e.currentTarget.src !== specialist.fallbackImage) {
                      e.currentTarget.src = specialist.fallbackImage;
                    }
                  }}
                  className="w-full h-full object-cover object-top transition-transform duration-[400ms] ease-out group-hover:-translate-y-1"
                />
              </div>

              {/* Nome do Especialista */}
              <h3 className="text-[17px] font-medium text-white text-center mt-4 leading-tight tracking-tight">
                {specialist.name}
              </h3>

              {/* Especialidade */}
              <p className="text-[12px] text-white/85 text-center mt-1 leading-normal tracking-wide">
                {specialist.specialty}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
