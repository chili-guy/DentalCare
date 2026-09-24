import React, { useRef, useState, useEffect, useCallback } from 'react';
import { CarouselNavButtons } from './CarouselNavButtons';
import { Stars } from './Stars';

export interface ReviewItem {
  id: string;
  category: 'Dentistry' | 'Orthodontics' | 'Periodontics';
  categoryLabel: string;
  categoryBg: string;
  title: string;
  text: string;
  author: string;
  rating: number;
}

export const REVIEWS: ReviewItem[] = [
  {
    id: 'review-1',
    category: 'Dentistry',
    categoryLabel: 'Odontologia Geral',
    categoryBg: '#F6D98B',
    title: 'Eu estava nervoso com o canal, mas a equipe foi incrível',
    text: 'A Dra. foi extremamente delicada e garantiu meu conforto durante todo o procedimento. Recomendo essa clínica a qualquer pessoa com total confiança.',
    author: 'Guy Hawkins',
    rating: 4.5,
  },
  {
    id: 'review-2',
    category: 'Orthodontics',
    categoryLabel: 'Ortodontia',
    categoryBg: '#E8D5FB',
    title: 'Transformou meu sorriso e minha autoestima por completo',
    text: 'O tratamento ortodôntico foi muito mais rápido e previsível do que imaginei. Toda a equipe é pontual, gentil e verdadeiramente atenciosa.',
    author: 'Robert Fox',
    rating: 5.0,
  },
  {
    id: 'review-3',
    category: 'Periodontics',
    categoryLabel: 'Periodontia',
    categoryBg: '#C3D5FA',
    title: 'Cuidado gengival de excelência e alívio imediato',
    text: 'Estava sentindo sensibilidade e sangramento gengival há meses. A avaliação foi precisa, o tratamento impecável e hoje sinto conforto absoluto.',
    author: 'Jacob Jones',
    rating: 4.5,
  },
  {
    id: 'review-4',
    category: 'Dentistry',
    categoryLabel: 'Odontologia Estética',
    categoryBg: '#F6D98B',
    title: 'Clareamento impecável e restaurações estéticas perfeitas',
    text: 'Fiz a troca de antigas restaurações escuras por resina estética combinada com clareamento. O resultado ficou ultra natural e com acabamento de primeira linha.',
    author: 'Camila Rodrigues',
    rating: 5.0,
  },
  {
    id: 'review-5',
    category: 'Orthodontics',
    categoryLabel: 'Ortodontia Digital',
    categoryBg: '#E8D5FB',
    title: 'Alinhadores modernos com acompanhamento impecável',
    text: 'Excelente infraestrutura tecnológica! O escaneamento 3D inicial eliminou a necessidade de moldes desconfortáveis e o resultado superou minhas expectativas.',
    author: 'Marcus Vinicius',
    rating: 5.0,
  },
  {
    id: 'review-6',
    category: 'Periodontics',
    categoryLabel: 'Periodontia Preventiva',
    categoryBg: '#C3D5FA',
    title: 'Atendimento humanizado que tira qualquer medo de dentista',
    text: 'Profissionais altamente capacitados e ambiente acolhedor. Explicaram cada detalhe com calma e carinho. Recomendo de olhos fechados.',
    author: 'Mariana Duarte',
    rating: 4.5,
  },
];

export interface ReviewsProps {
  reviews?: ReviewItem[];
  className?: string;
}

/**
 * Componente <Reviews />
 *
 * Especificações implementadas fielmente:
 * - Fundo creme: #FBF3E4 (mesmo da seção de serviços)
 * - Cor de texto principal: marrom-telha #7A3314
 * - Fontes:
 *   - Títulos, nomes e tags: "Instrument Sans" ou "Inter Tight" (.font-hero)
 *   - Texto da avaliação: fonte serifada "Crimson Pro" / "EB Garamond" (.font-review)
 * - Container max-w ~1100px, centralizado, px-[5vw], py-[120px]
 * - Cabeçalho:
 *   - Título "1800+ Avaliações" à esquerda: clamp(2.5rem, 6vw, 4.5rem), peso 500, letter-spacing -0.03em, cor #7A3314
 *   - Animação de contagem numérica de 0 a 1800 (~1.5s com ease-out) via IntersectionObserver (com prefers-reduced-motion exibe direto)
 *   - À direita, dois botões circulares (← e →) 44px, borda #7A3314, variante "dark", desabilitado 40% no início/fim
 *   - Margem entre cabeçalho e cards: ~56px
 * - Card de avaliação:
 *   - Fundo branco, border-radius 24px, padding 24px, min-h ~340px
 *   - Layout em coluna com rodapé empurrado para a base (flex flex-col justify-between)
 *   - Tag da categoria: pílula, px-3 py-1, texto 11px, borda 1px #7A3314 com 60% opacidade, cor de fundo pastel (#F6D98B, #E8D5FB, #C3D5FA)
 *   - Título: 19px, peso 400, line-height 1.3, cor #7A3314, mt-5 (20px)
 *   - Texto da avaliação: .font-review, 15px, line-height 1.45, cor #5A3A2E, mt-3 (12px)
 *   - Rodapé: nome à esquerda (12px, #7A3314) e <Stars rating={x} /> à direita (14px, #5A2E22, gap 4px, fracionadas)
 * - Carrossel nativo:
 *   - Desktop (≥ 1024px): 3 cards visíveis, gap 20px
 *   - Tablet (768px a 1023px): 2,2 cards visíveis (o terceiro cortado à direita)
 *   - Mobile (< 768px): 1,15 card visível
 *   - scroll-snap-type: x mandatory, scroll-snap-align: start, sem scrollbar, suporte a swipe
 *   - Setas rolam 1 card por clique com scroll suave
 * - Interação e entrada:
 *   - Hover no card: sobe 4px com sombra suave (0 16px 32px rgba(122,51,20,0.10)), transição 0.3s
 *   - Entrada dos cards em sequência ao entrar na viewport (fade + subida 20px, 0.1s de atraso)
 * - Acessibilidade: h2, ul/li, blockquote com cite para o nome, aria-labels completos, 100% em pt-BR
 */
export const Reviews: React.FC<ReviewsProps> = ({
  reviews = REVIEWS,
  className = '',
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLUListElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [displayCount, setDisplayCount] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Animação de contagem de 0 a 1800
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);

            if (prefersReducedMotion) {
              setDisplayCount(1800);
              return;
            }

            // Animar de 0 até 1800 em ~1500ms com easing ease-out
            const startTime = performance.now();
            const duration = 1500;
            const targetCount = 1800;

            const animateCount = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // easeOutQuart: 1 - (1 - x)^4
              const easeOut = 1 - Math.pow(1 - progress, 4);
              const currentVal = Math.round(easeOut * targetCount);
              setDisplayCount(currentVal);

              if (progress < 1) {
                requestAnimationFrame(animateCount);
              } else {
                setDisplayCount(targetCount);
              }
            };

            requestAnimationFrame(animateCount);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Monitoramento do carrossel para habilitar/desabilitar botões
  const checkScrollBounds = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < maxScroll - 6);
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

    // Largura do card + gap (20px)
    const cardWidth = firstCard.offsetWidth + 20;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;

    el.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="reviews"
      ref={sectionRef}
      aria-label="Avaliações dos Pacientes"
      className={`w-full bg-[#FBF3E4] text-[#7A3314] font-hero py-[100px] md:py-[120px] select-none overflow-hidden ${className}`}
    >
      <div className="max-w-[1100px] mx-auto px-[5vw]">
        {/* ============================================================== */}
        {/* CABEÇALHO: Título à esquerda com contador e setas à direita    */}
        {/* ============================================================== */}
        <div className="flex items-center justify-between gap-4 mb-[56px]">
          <h2
            className="font-medium text-[#7A3314] tracking-[-0.03em] leading-none"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            }}
          >
            {isVisible ? `${displayCount}+` : '0+'} Avaliações
          </h2>

          {/* Botões circulares (← e →) variante dark */}
          <CarouselNavButtons
            onPrev={() => scrollByCard('left')}
            onNext={() => scrollByCard('right')}
            canPrev={canScrollLeft}
            canNext={canScrollRight}
            prevLabel="Avaliação anterior"
            nextLabel="Próxima avaliação"
            variant="dark"
          />
        </div>

        {/* ============================================================== */}
        {/* CARROSSEL NATIVO DE AVALIAÇÕES                                 */}
        {/* ============================================================== */}
        <ul
          ref={scrollContainerRef}
          role="list"
          className="
            flex gap-5 overflow-x-auto overflow-y-hidden
            snap-x snap-mandatory scroll-smooth
            no-scrollbar
            -mx-[5vw] px-[5vw] lg:mx-0 lg:px-0
          "
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {reviews.map((item, index) => (
            <li
              key={item.id}
              className="
                flex-shrink-0 snap-start
                /* Mobile (< 768px): 1.15 cards visíveis */
                w-[calc((100vw-10vw-20px)/1.15)]
                /* Tablet (768px a 1023px): 2.2 cards visíveis */
                md:w-[calc((100vw-10vw-40px)/2.2)]
                /* Desktop (≥ 1024px): 3 cards visíveis com gap de 20px */
                lg:w-[calc((100%-40px)/3)]
              "
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <blockquote
                className={`
                  bg-white rounded-[24px] p-6 min-h-[340px] h-full
                  flex flex-col justify-between
                  shadow-[0_4px_20px_rgba(122,51,20,0.04)]
                  transition-all duration-300 ease-out
                  hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(122,51,20,0.10)]
                  motion-reduce:transition-none motion-reduce:hover:translate-y-0
                  ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-5'
                  }
                `}
              >
                {/* Topo do Card: Tag da Categoria + Título + Mensagem */}
                <div className="flex flex-col items-start">
                  {/* Tag da categoria com fundo pastel */}
                  <span
                    className="inline-block px-3 py-1 rounded-full text-[11px] font-medium tracking-wide border border-[#7A3314]/60 text-[#7A3314]"
                    style={{
                      backgroundColor: item.categoryBg,
                    }}
                  >
                    {item.categoryLabel}
                  </span>

                  {/* Título da avaliação */}
                  <h3 className="text-[19px] font-normal leading-[1.3] text-[#7A3314] mt-5 tracking-tight">
                    {item.title}
                  </h3>

                  {/* Texto da avaliação em fonte serifada */}
                  <p className="font-review text-[15px] leading-[1.45] text-[#5A3A2E] mt-3">
                    "{item.text}"
                  </p>
                </div>

                {/* Rodapé do Card: Autor à esquerda e Estrelas à direita */}
                <footer className="flex items-center justify-between gap-3 pt-6 border-t border-[#7A3314]/10 mt-6">
                  <cite className="not-italic text-[12px] font-medium text-[#7A3314]">
                    {item.author}
                  </cite>

                  <Stars rating={item.rating} />
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Reviews;
