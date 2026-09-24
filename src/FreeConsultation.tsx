import React, { useEffect, useRef, useState } from 'react';
import { RotatingBadge } from './RotatingBadge';

// Imagem placeholder do Unsplash / asset local facilmente substituível
export const CONSULTATION_IMAGE = '/consultation/patient-checkup.jpg';

export const UNSPLASH_CONSULTATION_IMAGE =
  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=85&w=1200';

export interface FreeConsultationProps {
  titleLine1?: string;
  titleLine2?: string;
  paragraphText?: string;
  buttonText?: string;
  badgeText?: string;
  imageSrc?: string;
  className?: string;
  onAppointmentClick?: () => void;
}

/**
 * Componente <FreeConsultation />
 *
 * Especificações implementadas:
 * - Fundo marrom-ferrugem: #9A4A2A
 * - Fonte "Instrument Sans" ou "Inter Tight"
 * - Container max-w ~1100px, centralizado, px-[5vw], py-[120px]
 * - Duas colunas no desktop (texto à esquerda ~55%, imagem à direita ~45%), alinhados ao centro
 * - Título em duas linhas:
 *   - "Consultas Médicas" (ou "Free Doctor") em branco
 *   - "Gratuitas" (ou "Consultations") em amarelo-limão #E6EE4F
 *   - clamp(2.5rem, 6vw, 4.5rem), peso 400, letter-spacing -0.03em, line-height 1
 * - Parágrafo com recuo à esquerda de ~100px no desktop:
 *   - Branco, 16px, line-height 1.5, max-w ~300px, margem superior de ~80px
 * - Botão "Agendar Consulta" com mesmo recuo:
 *   - Formato pílula (rounded-full), fundo #E6EE4F, texto #7A3314, 14px peso 500
 *   - Padding ~14px 36px, margem superior de 32px
 *   - Hover: fundo branco e leve elevação (translateY -2px), transição de 0.3s
 * - Coluna da imagem:
 *   - Cápsula vertical (border-radius: 9999px), proporção ~3:4, largura ~320px no desktop, object-cover
 *   - Contorno decorativo: cápsula idêntica atrás, borda 1.5px em #E6EE4F, deslocada ~16px p/ direita e ~8px p/ cima
 *   - Selo circular <RotatingBadge /> sobreposto no canto inferior direito, ultrapassando ~30%
 * - Animações com IntersectionObserver (respeita prefers-reduced-motion):
 *   - Título: fade-in subindo 20px
 *   - Parágrafo e botão: delay 0.15s e 0.3s
 *   - Cápsula da imagem: fade-in com scale de 0.95 para 1; contorno amarelo 0.2s depois
 * - Responsivo: < 1024px uma coluna, sem recuo no mobile, cápsula ~260px e selo ~85px
 * - Acessibilidade: h2, botão com texto claro, alt da foto descritivo, contraste WCAG AA
 */
export const FreeConsultation: React.FC<FreeConsultationProps> = ({
  titleLine1 = 'Consultas Médicas',
  titleLine2 = 'Gratuitas',
  paragraphText = 'Inclui consultas regulares, limpezas, restaurações, tratamentos de canal, extrações e procedimentos estéticos como clareamento dental e ortodontia.',
  buttonText = 'Agendar Consulta',
  badgeText = 'SUA SAÚDE BUCAL É NOSSA PRIORIDADE MÁXIMA. ',
  imageSrc = CONSULTATION_IMAGE,
  className = '',
  onAppointmentClick,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [currentImg, setCurrentImg] = useState(imageSrc);

  useEffect(() => {
    setCurrentImg(imageSrc);
  }, [imageSrc]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Detectar prefers-reduced-motion
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
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
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
      aria-label="Consultas odontológicas gratuitas"
      className={`w-full bg-[#9A4A2A] font-hero py-[100px] md:py-[120px] select-none overflow-hidden ${className}`}
    >
      <div className="max-w-[1100px] mx-auto px-[5vw]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-16 lg:gap-12">
          {/* ============================================================== */}
          {/* COLUNA ESQUERDA: Textos e Ação (~55%)                         */}
          {/* ============================================================== */}
          <div className="w-full lg:w-[55%] flex flex-col items-start">
            {/* Título em duas linhas */}
            <h2
              className={`font-normal tracking-[-0.03em] leading-none transition-all duration-700 ease-out motion-reduce:transition-none ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-5'
              }`}
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              }}
            >
              <span className="block text-white">{titleLine1}</span>
              <span className="block text-[#E6EE4F] mt-1">{titleLine2}</span>
            </h2>

            {/* Bloco escalonado: Parágrafo e Botão com recuo à esquerda de ~100px no desktop */}
            <div className="w-full lg:pl-[100px] flex flex-col items-start">
              {/* Parágrafo */}
              <p
                className={`text-white text-[16px] leading-[1.5] max-w-[300px] mt-8 lg:mt-[80px] transition-all duration-700 ease-out delay-[150ms] motion-reduce:transition-none ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-5'
                }`}
              >
                {paragraphText}
              </p>

              {/* Botão de Agendamento */}
              <button
                type="button"
                onClick={onAppointmentClick}
                className={`mt-8 px-9 py-[14px] rounded-full bg-[#E6EE4F] text-[#7A3314] text-[14px] font-medium cursor-pointer shadow-sm transition-all duration-300 ease-out delay-[300ms] hover:bg-white hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-5'
                }`}
              >
                {buttonText}
              </button>
            </div>
          </div>

          {/* ============================================================== */}
          {/* COLUNA DIREITA: Cápsula da Imagem, Contorno e Selo (~45%)      */}
          {/* ============================================================== */}
          <div className="w-full lg:w-[45%] flex justify-center lg:justify-end items-center mt-6 lg:mt-0">
            <div className="relative flex items-center justify-center">
              {/* Contorno decorativo desencontrado (+16px direita, -8px topo) */}
              <div
                aria-hidden="true"
                className={`absolute rounded-[9999px] border-[1.5px] border-[#E6EE4F] pointer-events-none transition-all duration-700 ease-out delay-[200ms] motion-reduce:transition-none
                  w-[260px] h-[346px] md:w-[320px] md:h-[426px]
                  translate-x-[12px] -translate-y-[6px] md:translate-x-[16px] md:-translate-y-[8px]
                  ${isVisible ? 'opacity-100' : 'opacity-0'}
                `}
              />

              {/* Cápsula principal com a foto */}
              <div
                className={`relative rounded-[9999px] overflow-hidden shadow-2xl z-10 bg-[#7A3314] transition-all duration-700 ease-out motion-reduce:transition-none
                  w-[260px] h-[346px] md:w-[320px] md:h-[426px]
                  ${
                    isVisible
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95'
                  }
                `}
              >
                <img
                  src={currentImg}
                  alt="Paciente sorrindo durante consulta odontológica"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => {
                    if (currentImg !== UNSPLASH_CONSULTATION_IMAGE) {
                      setCurrentImg(UNSPLASH_CONSULTATION_IMAGE);
                    }
                  }}
                  className="w-full h-full object-cover scale-100 transition-transform duration-700 ease-out hover:scale-105"
                  style={{
                    objectPosition: 'center 20%',
                  }}
                />
              </div>

              {/* Selo circular giratório sobreposto no canto inferior direito (~30% ultrapassando) */}
              <div
                className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 z-20 pointer-events-auto"
                style={{
                  transform: 'translate(10%, 10%)',
                }}
              >
                {/* Desktop (105px) */}
                <div className="hidden md:block">
                  <RotatingBadge
                    text={badgeText}
                    size={105}
                    badgeBgColor="#E6EE4F"
                    textColor="#7A3314"
                    iconColor="#7A3314"
                  />
                </div>
                {/* Mobile (85px) */}
                <div className="block md:hidden">
                  <RotatingBadge
                    text={badgeText}
                    size={85}
                    badgeBgColor="#E6EE4F"
                    textColor="#7A3314"
                    iconColor="#7A3314"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeConsultation;
