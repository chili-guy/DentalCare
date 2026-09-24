import React, { useEffect, useRef, useState } from 'react';

export interface AudienceItem {
  id: string;
  title: string;
  description: string;
  bgColor: string;
  clipShapeId: 'shape-kids' | 'shape-teen' | 'shape-adult';
  image: string;
  fallbackImage?: string;
  alt: string;
}

export const AUDIENCES: AudienceItem[] = [
  {
    id: 'kids',
    title: 'Crianças',
    description:
      'As crianças precisam de atenção especial nos cuidados odontológicos, pois seus dentes e ossos maxilares ainda estão em pleno desenvolvimento.',
    bgColor: '#F2A97A',
    clipShapeId: 'shape-kids',
    image: '/audiences/kids.jpg',
    fallbackImage:
      'https://images.unsplash.com/photo-1758205307836-0829c799890b?auto=format&fit=crop&q=85&w=800',
    alt: 'Dentista examinando os dentes de um menino em atendimento infantil',
  },
  {
    id: 'teen',
    title: 'Adolescentes',
    description:
      'Os adolescentes frequentemente necessitam de tratamento ortodôntico e acompanhamento para corrigir problemas de oclusão ou dentes desalinhados.',
    bgColor: '#F6D98B',
    clipShapeId: 'shape-teen',
    image: '/audiences/teen.jpg',
    fallbackImage:
      'https://images.unsplash.com/photo-1758205308172-fc864545dcf7?auto=format&fit=crop&q=85&w=800',
    alt: 'Dentista examinando os dentes de uma jovem em avaliação ortodôntica',
  },
  {
    id: 'adult',
    title: 'Adultos',
    description:
      'Adultos podem necessitar de diversos tratamentos odontológicos avançados, incluindo próteses, periodontia, implantes e cirurgia oral.',
    bgColor: '#C3D5FA',
    clipShapeId: 'shape-adult',
    image: '/audiences/adult.jpg',
    fallbackImage:
      'https://images.unsplash.com/photo-1663755489920-5e09f66d011a?auto=format&fit=crop&q=85&w=800',
    alt: 'Homem adulto sorrindo durante consulta odontológica',
  },
];

export interface WhoWeHelpProps {
  audiences?: AudienceItem[];
  className?: string;
}

/**
 * Componente <WhoWeHelp />
 *
 * Especificações implementadas fielmente:
 * - Fundo lilás claro: #E8D5FB
 * - Cor do texto: marrom-telha #7A3314
 * - Fonte "Instrument Sans" ou "Inter Tight"
 * - Container max-w-[1100px], centralizado, px-[5vw], py-[120px]
 * - Título:
 *   - "A Quem Ajudamos?" (ou "Who We Help?") centralizado
 *   - clamp(2.5rem, 6vw, 4.5rem), peso 400, letter-spacing -0.03em, cor #7A3314
 *   - Margem inferior de ~56px
 * - Cards:
 *   - Grade de 3 colunas iguais no desktop, gap de 24px
 *   - Cada card: fundo branco, border-radius 24px, padding 28px, conteúdo centralizado
 *   - Título do card: 24px, peso 400, cor #7A3314, mt-6 (24px)
 *   - Descrição: 13px, line-height 1.5, cor #7A3314 com 85% de opacidade, centralizada, max-w ~240px, mt-3 (12px)
 * - Máscaras SVG (clipPathUnits="objectBoundingBox") em <svg width="0" height="0">:
 *   1. shape-kids: duas cápsulas verticais lado a lado
 *   2. shape-teen: duas cápsulas horizontais empilhadas
 *   3. shape-adult: arco (semicírculo no topo, base reta)
 * - Interação e animações:
 *   - Hover: card sobe 6px com sombra (0 20px 40px rgba(122,51,20,0.12)) e foto dá zoom de 1.06 (transição 0.4s)
 *   - IntersectionObserver: cards entram em cascata com atraso de 0.12s
 *   - Respeita prefers-reduced-motion
 * - Responsivo:
 *   - Tablet (768px a 1023px): 2 colunas, o terceiro card centralizado na linha de baixo
 *   - Mobile (< 768px): 1 coluna, cards com largura máxima de 380px centralizados
 * - Acessibilidade: h2, h3, lista ul/li, alt descritivo, 100% em português
 */
export const WhoWeHelp: React.FC<WhoWeHelpProps> = ({
  audiences = AUDIENCES,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
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

  return (
    <section
      ref={sectionRef}
      aria-label="A Quem Ajudamos"
      className={`w-full bg-[#E8D5FB] text-[#7A3314] font-hero py-[100px] md:py-[120px] select-none ${className}`}
    >
      {/* ============================================================== */}
      {/* SVG OCULTO COM AS MÁSCARAS CLIP-PATH (objectBoundingBox)       */}
      {/* ============================================================== */}
      <svg
        width="0"
        height="0"
        className="absolute -top-[9999px] -left-[9999px] pointer-events-none opacity-0"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          {/* 1. Kids: Duas cápsulas verticais unidas lado a lado */}
          <clipPath id="shape-kids" clipPathUnits="objectBoundingBox">
            <rect x="0" y="0" width="0.55" height="1" rx="0.275" ry="0.29" />
            <rect x="0.45" y="0" width="0.55" height="1" rx="0.275" ry="0.29" />
          </clipPath>

          {/* 2. Teenage: Duas cápsulas horizontais empilhadas */}
          <clipPath id="shape-teen" clipPathUnits="objectBoundingBox">
            <rect x="0" y="0" width="1" height="0.55" rx="0.26" ry="0.275" />
            <rect x="0" y="0.45" width="1" height="0.55" rx="0.26" ry="0.275" />
          </clipPath>

          {/* 3. Adults: Arco com topo em semicírculo e base reta */}
          <clipPath id="shape-adult" clipPathUnits="objectBoundingBox">
            <path d="M0,1 L0,0.5 A0.5,0.5 0 0 1 1,0.5 L1,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="max-w-[1100px] mx-auto px-[5vw]">
        {/* ============================================================== */}
        {/* TÍTULO DA SEÇÃO                                               */}
        {/* ============================================================== */}
        <h2
          className={`text-center font-normal text-[#7A3314] tracking-[-0.03em] leading-none mb-[56px] transition-all duration-700 ease-out motion-reduce:transition-none ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-5'
          }`}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          }}
        >
          A Quem Ajudamos?
        </h2>

        {/* ============================================================== */}
        {/* GRADE DE CARDS                                                */}
        {/* ============================================================== */}
        <ul
          role="list"
          className="
            /* Desktop (≥ 1024px): 3 colunas iguais */
            lg:grid lg:grid-cols-3 lg:gap-6
            /* Tablet (768px a 1023px): 2 colunas, o terceiro card ocupa linha inteira centralizado */
            md:grid md:grid-cols-2 md:gap-6
            /* Mobile (< 768px): 1 coluna centralizada */
            flex flex-col items-center gap-6
          "
        >
          {audiences.map((item, index) => {
            const isLastInTablet = index === 2;

            return (
              <li
                key={item.id}
                className={`
                  w-full max-w-[380px] md:max-w-none
                  ${isLastInTablet ? 'md:col-span-2 md:max-w-[420px] md:mx-auto lg:col-span-1 lg:max-w-none' : ''}
                `}
                style={{
                  transitionDelay: `${index * 120}ms`,
                }}
              >
                <div
                  className={`
                    group bg-white rounded-[24px] p-7 flex flex-col items-center text-center h-full
                    shadow-[0_4px_20px_rgba(122,51,20,0.04)]
                    transition-all duration-400 ease-out
                    hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(122,51,20,0.12)]
                    motion-reduce:transition-none motion-reduce:hover:translate-y-0
                    ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-6'
                    }
                  `}
                >
                  {/* Container da Imagem com Máscara SVG */}
                  <div
                    className="w-full aspect-[1/0.95] overflow-hidden relative transition-transform duration-400 ease-out"
                    style={{
                      clipPath: `url(#${item.clipShapeId})`,
                      WebkitClipPath: `url(#${item.clipShapeId})`,
                      backgroundColor: item.bgColor,
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        if (item.fallbackImage && e.currentTarget.src !== item.fallbackImage) {
                          e.currentTarget.src = item.fallbackImage;
                        }
                      }}
                      className="w-full h-full object-cover transition-transform duration-400 ease-out group-hover:scale-[1.06] motion-reduce:group-hover:scale-100"
                      style={{
                        objectPosition: 'center 20%',
                      }}
                    />
                  </div>

                  {/* Título do Card */}
                  <h3 className="text-[24px] font-normal text-[#7A3314] mt-6 tracking-tight leading-tight">
                    {item.title}
                  </h3>

                  {/* Descrição do Card */}
                  <p className="text-[13px] leading-[1.5] text-[#7A3314]/85 max-w-[240px] mt-3">
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default WhoWeHelp;
