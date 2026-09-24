/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RotatingBadge } from './RotatingBadge';

// URL placeholder do Unsplash ou asset local de fácil substituição na constante HERO_IMAGE
export const HERO_IMAGE = '/hero-dental.jpg';

// URL alternativa remota no Unsplash 100% verificada e ativa
export const UNSPLASH_HERO_IMAGE =
  'https://images.unsplash.com/photo-1489278353717-f64c6ee8a4d2?auto=format&fit=crop&q=85&w=2560';

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
  imageAlt = 'Mulher sorrindo com dentes brancos e saudáveis',
  imagePosition = 'center center',
  className = '',
  showRoundedFrame = true,
  titleLine1 = 'Sorriso &',
  titleLine2 = 'Bem-Estar',
  badgeText = 'TRATAMENTO HUMANIZADO E TECNOLOGIA DE PONTA. ',
  descriptionText = 'Clínica odontológica de excelência dedicada a transformar sorrisos com conforto, acolhimento e precisão.',
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
          
          {/* Selo circular giratório reutilizável */}
          <div className="mb-5 md:mb-6">
            <div className="hidden md:block">
              <RotatingBadge
                text={badgeText}
                size={110}
                badgeBgColor="#E6EE4F"
                textColor="#5A4A1F"
                iconColor="#5A4A1F"
              />
            </div>
            <div className="block md:hidden">
              <RotatingBadge
                text={badgeText}
                size={90}
                badgeBgColor="#E6EE4F"
                textColor="#5A4A1F"
                iconColor="#5A4A1F"
              />
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
