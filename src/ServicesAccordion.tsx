import React, { useState } from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  fallbackImage?: string;
  alt: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'dental-fillings',
    title: 'Restaurações dentárias',
    description:
      'Inclui consultas regulares, limpezas, restaurações estéticas, tratamentos de canal, extrações e procedimentos cosméticos como clareamento dental e ortodontia.',
    image: '/services/dental-fillings.jpg',
    fallbackImage:
      'https://images.unsplash.com/photo-1588776813677-77aaf5595b83?auto=format&fit=crop&q=85&w=1000',
    alt: 'Paciente sorrindo durante procedimento de restauração dentária estética em clínica odontológica',
  },
  {
    id: 'teeth-whitening',
    title: 'Clareamento dental',
    description:
      'Inclui avaliação personalizada da tonalidade, profilaxia profunda, clareamento dental a laser de consultório e procedimentos para devolver o brilho radiante aos dentes.',
    image: '/services/teeth-whitening.jpg',
    fallbackImage:
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=85&w=1000',
    alt: 'Procedimento profissional de clareamento dental com iluminação de precisão e dentista com luvas cirúrgicas',
  },
  {
    id: 'oral-surgery',
    title: 'Cirurgia oral',
    description:
      'Inclui cirurgias orais de alta precisão, remoção de sisos inclusos, enxertos ósseos, frenectomias e intervenções guiadas por microscopia cirúrgica avançada com recuperação rápida.',
    image: '/services/oral-surgery.jpg',
    fallbackImage:
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=85&w=1000',
    alt: 'Equipe de cirurgiões-dentistas com microscópio cirúrgico avançado realizando procedimento de cirurgia oral',
  },
  {
    id: 'dental-implants',
    title: 'Implantes dentários',
    description:
      'Inclui planejamento digital 3D, instalação de implantes dentários de titânio de alta biocompatibilidade, próteses fixas sobre implante e reabilitação estética e mastigatória duradoura.',
    image: '/services/dental-implants.jpg',
    fallbackImage:
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=85&w=1000',
    alt: 'Procedimento de reabilitação e instalação de implantes dentários com instrumentais odontológicos modernos',
  },
];

export interface ServicesAccordionProps {
  services?: ServiceItem[];
  defaultOpenIndex?: number;
  className?: string;
}

/**
 * Componente ServicesAccordion
 *
 * Especificações implementadas com fidelidade:
 * - Fundo creme: #FBF3E4
 * - Cor do texto e linhas: marrom-telha #7A3314
 * - Fonte: Instrument Sans / Inter Tight
 * - Container max-w-[1100px], centralizado, px-[5vw]
 * - Divisórias de 1px com 50% de opacidade acima de cada item e no final
 * - Desktop:
 *   - Fechado: título à esquerda clamp(2.5rem, 6vw, 4.5rem), miniatura ~170x95px à direita, py-[28px]
 *   - Aberto: miniatura cresce suavemente para ~380x250px (direita e topo)
 *   - Descrição (15px, lh 1.5, max-w ~360px, 85% opacidade) alinhada à esquerda na base da imagem
 *   - Hover abre o item; mouse fora mantém o último item aberto
 * - Mobile:
 *   - Fechado: miniatura compacta ~96x60px ao lado do título
 *   - Aberto: imagem 16:10 de largura total e descrição abaixo dela
 *   - Clique/toque abre e fecha
 * - Acessibilidade: botão com aria-expanded, aria-controls, suporte a teclado (Tab + Enter/Espaço)
 * - Animação suave com cubic-bezier(0.65, 0, 0.35, 1) de 0.6s e delay na descrição
 */
export const ServicesAccordion: React.FC<ServicesAccordionProps> = ({
  services = SERVICES,
  defaultOpenIndex = 0,
  className = '',
}) => {
  // O primeiro item começa aberto por padrão; o último aberto é preservado ao sair do hover
  const [activeItemIndex, setActiveItemIndex] = useState<number>(defaultOpenIndex);

  const handleMouseEnter = (index: number) => {
    // No desktop (hover): ativa o item passado
    setActiveItemIndex(index);
  };

  const handleItemClick = (index: number) => {
    // No mobile/touch: abre e fecha com clique/toque, só um aberto por vez
    setActiveItemIndex((prev) => (prev === index ? -1 : index));
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveItemIndex(index);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % services.length;
      setActiveItemIndex(nextIndex);
      const nextBtn = document.getElementById(`service-header-${services[nextIndex].id}`);
      nextBtn?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + services.length) % services.length;
      setActiveItemIndex(prevIndex);
      const prevBtn = document.getElementById(`service-header-${services[prevIndex].id}`);
      prevBtn?.focus();
    }
  };

  return (
    <section
      id="services"
      aria-label="Serviços odontológicos"
      className={`relative w-full bg-[#FBF3E4] text-[#7A3314] font-hero py-20 md:py-28 select-none ${className}`}
    >
      <div className="max-w-[1100px] mx-auto px-[5vw]">
        {/* Lista de Acordeão com divisória no final */}
        <div
          role="region"
          aria-label="Lista de procedimentos"
          className="border-b border-[#7A3314]/50"
        >
          {services.map((item, index) => {
            const isOpen = activeItemIndex === index;
            const panelId = `service-panel-${item.id}`;
            const headerId = `service-header-${item.id}`;

            return (
              <div
                key={item.id}
                onMouseEnter={() => handleMouseEnter(index)}
                className="border-t border-[#7A3314]/50 transition-colors duration-300"
              >
                {/* ============================================================== */}
                {/* 1. VISÃO DESKTOP (md e acima): Layout alinhado topo/base       */}
                {/* ============================================================== */}
                <div
                  className="hidden md:flex items-start justify-between gap-8 py-[28px] transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
                  style={{
                    minHeight: isOpen ? '306px' : '151px',
                  }}
                >
                  {/* Coluna Esquerda: Título no topo e Descrição na base */}
                  <div
                    className="flex flex-col justify-between flex-1 transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
                    style={{
                      height: isOpen ? '250px' : '95px',
                    }}
                  >
                    {/* Botão com o Título */}
                    <button
                      id={headerId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => handleItemClick(index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="group text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#7A3314] focus-visible:outline-offset-4 rounded-lg w-fit transition-transform duration-200"
                    >
                      <h3
                        className="font-medium text-[#7A3314] tracking-[-0.03em] leading-none transition-colors duration-200 group-hover:text-[#7A3314]/80"
                        style={{
                          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                        }}
                      >
                        {item.title}
                      </h3>
                    </button>

                    {/* Descrição: Aparece abaixo do título no canto inferior esquerdo */}
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={headerId}
                      className="overflow-hidden"
                    >
                      <p
                        className={`text-[15px] leading-[1.5] text-[#7A3314]/85 max-w-[360px] transform transition-all duration-[500ms] [transition-timing-function:cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none motion-reduce:transform-none ${
                          isOpen
                            ? 'opacity-100 translate-y-0 delay-[150ms] pointer-events-auto'
                            : 'opacity-0 translate-y-[10px] pointer-events-none'
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Coluna Direita: Imagem expansível alinhada ao topo e à direita */}
                  <div
                    onClick={() => handleItemClick(index)}
                    className="relative overflow-hidden rounded-xl flex-shrink-0 cursor-pointer shadow-sm transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
                    style={{
                      width: isOpen ? '380px' : '170px',
                      height: isOpen ? '250px' : '95px',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.alt}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        if (item.fallbackImage && e.currentTarget.src !== item.fallbackImage) {
                          e.currentTarget.src = item.fallbackImage;
                        }
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                    />
                  </div>
                </div>

                {/* ============================================================== */}
                {/* 2. VISÃO MOBILE (< 768px): Título + miniatura no fechado;     */}
                {/*    Imagem 16:10 + descrição expandida no aberto                */}
                {/* ============================================================== */}
                <div className="md:hidden py-6">
                  {/* Linha de cabeçalho clicável */}
                  <button
                    id={`${headerId}-mobile`}
                    aria-expanded={isOpen}
                    aria-controls={`${panelId}-mobile`}
                    onClick={() => handleItemClick(index)}
                    className="w-full flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#7A3314] focus-visible:outline-offset-4 rounded-lg"
                  >
                    <h3
                      className="font-medium text-[#7A3314] tracking-[-0.03em] leading-tight flex-1"
                      style={{
                        fontSize: 'clamp(2rem, 5.5vw, 3rem)',
                      }}
                    >
                      {item.title}
                    </h3>

                    {/* Miniatura compacta no estado fechado (96x60px) */}
                    <div
                      className={`relative overflow-hidden rounded-lg flex-shrink-0 transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.65,0,0.35,1)] ${
                        isOpen
                          ? 'opacity-0 scale-90 w-0 h-0 pointer-events-none'
                          : 'w-[96px] h-[60px] opacity-100 scale-100'
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.alt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          if (item.fallbackImage && e.currentTarget.src !== item.fallbackImage) {
                            e.currentTarget.src = item.fallbackImage;
                          }
                        }}
                      />
                    </div>
                  </button>

                  {/* Conteúdo expansível no mobile usando o truque de grid */}
                  <div
                    id={`${panelId}-mobile`}
                    role="region"
                    aria-labelledby={`${headerId}-mobile`}
                    className={`grid transition-[grid-template-rows] duration-[600ms] [transition-timing-function:cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      {/* Imagem em largura total (16:10) no estado aberto */}
                      <div className="mt-4 w-full aspect-[16/10] overflow-hidden rounded-xl shadow-sm">
                        <img
                          src={item.image}
                          alt={item.alt}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            if (item.fallbackImage && e.currentTarget.src !== item.fallbackImage) {
                              e.currentTarget.src = item.fallbackImage;
                            }
                          }}
                        />
                      </div>

                      {/* Descrição abaixo da imagem */}
                      <p
                        className={`mt-4 text-[15px] leading-[1.5] text-[#7A3314]/85 transform transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none motion-reduce:transform-none ${
                          isOpen
                            ? 'opacity-100 translate-y-0 delay-[150ms]'
                            : 'opacity-0 translate-y-[10px]'
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
