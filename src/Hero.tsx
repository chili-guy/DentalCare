/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

// URL placeholder do Unsplash ou asset local de fácil substituição na constante HERO_IMAGE
export const HERO_IMAGE = '/hero-dental.jpg';

// URL alternativa remota no Unsplash 100% verificada e ativa
export const UNSPLASH_HERO_IMAGE =
  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=85&w=2560';

export interface HeroProps {
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
  className?: string;
  showRoundedFrame?: boolean;
  titleLine1?: string;
  titleLine2?: string;
  badgeText?: string;
  descriptionText?: string;
}

/**
 * Componente Hero Section de página inteira para Clínica Odontológica em PT-BR
 * Fiel às especificações e à imagem de referência:
 * - 100vh de altura, proporção ~16:9, rounded-2xl e overflow hidden
 * - Imagem close-up de sorriso com lábios rosados, dentes brancos e dedo na bochecha
 * - Gradientes de legibilidade preservando o brilho dos dentes brancos no centro
 * - Título em duas linhas: "Cuidado" / "Odontológico" (clamp 3.5rem a 8.5rem, tracking -0.03em, leading 0.95)
 * - Selo circular giratório (#E6EE4F) com texto em curva SVG e ícone de dente
 * - Parágrafo descritivo alinhado à esquerda abaixo do selo
 * - Responsivo e com suporte a prefers-reduced-motion
 */
export const Hero: React.FC<HeroProps> = ({
  imageSrc = HERO_IMAGE,
  imageAlt = 'Close-up de sorriso feminino com dentes brancos perfeitos, lábios rosados e dedo tocando a bochecha',
  imagePosition = 'center center',
  className = '',
  showRoundedFrame = true,
  titleLine1 = 'Cuidado',
  titleLine2 = 'Odontológico',
  badgeText = 'SUA SAÚDE BUCAL É NOSSA PRIORIDADE MÁXIMA. ',
  descriptionText = 'Hospitais odontológicos são unidades de saúde especializadas na prestação de serviços e cuidados dentários aos pacientes.',
}) => {
  const [currentSrc, setCurrentSrc] = React.useState(imageSrc);

  React.useEffect(() => {
    setCurrentSrc(imageSrc);
  }, [imageSrc]);

  const handleImageError = () => {
    // Se a imagem remota quebrar ou retornar 404, faz fallback suave para o asset local garantido
    if (currentSrc !== '/hero-dental.jpg') {
      setCurrentSrc('/hero-dental.jpg');
    }
  };

  return (
    <section
      aria-label="Cuidado Odontológico Hero"
      className={`relative w-full h-screen min-h-[640px] overflow-hidden bg-zinc-950 select-none ${
        showRoundedFrame ? 'rounded-2xl md:rounded-3xl' : ''
      } ${className}`}
    >
      {/* 1. Imagem de Fundo cobrindo toda a seção com foco central no sorriso */}
      <img
        src={currentSrc}
        alt={imageAlt}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        onError={handleImageError}
        style={{ objectPosition: imagePosition }}
        className="absolute inset-0 w-full h-full object-cover scale-100 transition-transform duration-700 ease-out"
      />

      {/* 2. Overlays de Gradiente para legibilidade perfeita do texto sem apagar os dentes brancos */}
      {/* Gradiente linear vertical suave (escurece a base para os textos) */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 38%, rgba(0,0,0,0.05) 60%, transparent 80%)',
        }}
      />

      {/* Leve escurecimento radial no canto inferior esquerdo para dar destaque máximo ao título */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 75% 65% at 0% 100%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 45%, transparent 75%)',
        }}
      />

      {/* 3. Conteúdo Principal */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end pl-[4vw] pr-[4vw] pb-[6vh] md:flex-row md:items-end md:justify-between">
        
        {/* Título (canto inferior esquerdo) */}
        <div className="animate-fade-up-title opacity-0 will-change-transform max-w-[85vw] md:max-w-none">
          <h1
            className="font-hero text-white font-normal leading-[0.95] tracking-[-0.03em] mb-8 md:mb-0"
            style={{
              fontSize: 'clamp(3.5rem, 9vw, 8.5rem)',
            }}
          >
            {titleLine1}
            <br />
            {titleLine2}
          </h1>
        </div>

        {/* Bloco Selo Circular + Parágrafo (canto inferior direito) */}
        <div className="flex flex-col items-start max-w-[260px] animate-fade-up-content opacity-0 will-change-transform">
          
          {/* Selo circular giratório */}
          <div
            className="relative mb-5 md:mb-6 select-none group"
            title={badgeText.trim()}
          >
            <div className="w-[90px] h-[90px] md:w-[110px] md:h-[110px] rounded-full bg-[#E6EE4F] flex items-center justify-center relative shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:scale-105">
              
              {/* Texto em path SVG circular com rotação contínua */}
              <svg
                className="absolute inset-0 w-full h-full animate-rotate-slow pointer-events-none"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <defs>
                  {/* Path circular centralizado perfeitamente no diâmetro 72 (raio 36) */}
                  <path
                    id="heroDentalBadgePath"
                    d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                    fill="none"
                  />
                </defs>
                <text
                  className="fill-[#5A4A1F] text-[9.3px] font-bold tracking-[0.12em] uppercase"
                  style={{ letterSpacing: '0.12em' }}
                >
                  <textPath
                    href="#heroDentalBadgePath"
                    startOffset="0%"
                  >
                    {badgeText}
                  </textPath>
                </text>
              </svg>

              {/* Ícone minimalista de dente centralizado em traço fino (#5A4A1F) */}
              <div className="relative z-10 flex items-center justify-center">
                <svg
                  className="w-7 h-7 md:w-8 md:h-8 text-[#5A4A1F]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {/* Contorno anatômico com dois lóbulos na coroa e raízes suaves */}
                  <path d="M7 3.5C4.8 3.5 3.5 5.2 3.5 7.8C3.5 10.8 5 12.8 6 14.2C7 15.8 7.5 18.6 8.5 20.4C9.2 21.4 10.2 20.9 11 18.5L12 15.5L13 18.5C13.8 20.9 14.8 21.4 15.5 20.4C16.5 18.6 17 15.8 18 14.2C19 12.8 20.5 10.8 20.5 7.8C20.5 5.2 19.2 3.5 17 3.5C15 3.5 13.5 4.8 12 5.8C10.5 4.8 9 3.5 7 3.5Z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Parágrafo descritivo */}
          <p className="text-white/90 text-[15px] md:text-[16px] leading-[1.4] font-normal tracking-normal max-w-[260px] text-left">
            {descriptionText}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
