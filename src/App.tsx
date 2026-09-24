/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Hero, HERO_IMAGE } from './Hero';
import { ServicesAccordion } from './ServicesAccordion';
import { Specialists } from './Specialists';
import { FreeConsultation } from './FreeConsultation';
import { WhoWeHelp } from './WhoWeHelp';
import { Reviews } from './Reviews';
import { Footer } from './Footer';
import {
  RotateCcw,
  Sparkles,
  Maximize2,
  Minimize2,
  Image as ImageIcon,
  Check,
  Copy,
  Info,
  Sliders,
} from 'lucide-react';

const ALTERNATIVE_IMAGES = [
  {
    id: 'reference',
    name: 'Sorriso com Dedo na Bochecha (Referência)',
    url: '/hero-dental.jpg',
    position: 'center center',
    alt: 'Close-up de sorriso feminino com dentes brancos, lábios rosados e dedo na bochecha',
  },
  {
    id: 'perfect-macro',
    name: 'Macro Dentes Brancos Perfeitos',
    url: '/smile_perfect.jpg',
    position: 'center 48%',
    alt: 'Close-up macro de dentes brancos alinhados e sorriso radiante',
  },
  {
    id: 'teeth-closeup',
    name: 'Close-up Odontológico Radiante',
    url: '/smile_teeth_closeup.jpg',
    position: 'center center',
    alt: 'Sorriso aberto com dentes saudáveis e limpos',
  },
  {
    id: 'beauty-smile',
    name: 'Estética Dental & Clareamento',
    url: '/smile_beauty.jpg',
    position: 'center 45%',
    alt: 'Tratamento de estética dental e sorriso harmônico',
  },
  {
    id: 'macro-lips',
    name: 'Macro Lábios & Arcada Dentária',
    url: '/smile_closeup_macro.jpg',
    position: 'center center',
    alt: 'Close-up de sorriso feminino natural com dentes perfeitos',
  },
];

export default function App() {
  const [selectedImage, setSelectedImage] = useState(HERO_IMAGE);
  const [selectedPosition, setSelectedPosition] = useState('center center');
  const [customUrl, setCustomUrl] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [isFramed, setIsFramed] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [showToolbar, setShowToolbar] = useState(false);
  const [copied, setCopied] = useState(false);

  // Textos em português com possibilidade de personalização
  const [titleLine1, setTitleLine1] = useState('Cuidado');
  const [titleLine2, setTitleLine2] = useState('Odontológico');
  const [badgeText, setBadgeText] = useState('SUA SAÚDE BUCAL É NOSSA PRIORIDADE MÁXIMA. ');
  const [descriptionText, setDescriptionText] = useState(
    'Hospitais odontológicos são unidades de saúde especializadas na prestação de serviços e cuidados dentários aos pacientes.'
  );

  const activeImageUrl = isCustom && customUrl ? customUrl : selectedImage;

  const handleReplayAnimation = () => {
    setAnimationKey((prev) => prev + 1);
  };

  const applyPreset = (preset: 'pt-default' | 'pt-soft' | 'en') => {
    if (preset === 'pt-default') {
      setTitleLine1('Cuidado');
      setTitleLine2('Odontológico');
      setBadgeText('SUA SAÚDE BUCAL É NOSSA PRIORIDADE MÁXIMA. ');
      setDescriptionText(
        'Hospitais odontológicos são unidades de saúde especializadas na prestação de serviços e cuidados dentários aos pacientes.'
      );
    } else if (preset === 'pt-soft') {
      setTitleLine1('Sorriso &');
      setTitleLine2('Bem-Estar');
      setBadgeText('TRATAMENTO HUMANIZADO E TECNOLOGIA DE PONTA. ');
      setDescriptionText(
        'Clínica odontológica de excelência dedicada a transformar sorrisos com conforto, acolhimento e precisão.'
      );
    } else {
      setTitleLine1('Gentle');
      setTitleLine2('Dental Care');
      setBadgeText('YOUR DENTAL HEALTH IS OUR TOP PRIORITY. ');
      setDescriptionText(
        'Dental hospitals are healthcare facilities that specialize in providing dental care services to patients.'
      );
    }
    setAnimationKey((prev) => prev + 1);
  };

  const handleCopyCode = () => {
    const codeSnippet = `import { Hero } from './Hero';\n\n<Hero\n  titleLine1="${titleLine1}"\n  titleLine2="${titleLine2}"\n  badgeText="${badgeText}"\n  descriptionText="${descriptionText}"\n/>`;
    navigator.clipboard?.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative min-h-screen w-full bg-black text-white font-hero selection:bg-[#E6EE4F] selection:text-[#5A4A1F]">
      
      {/* Botões de controles no topo direito */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={handleReplayAnimation}
          title="Reanimar entrada"
          aria-label="Reanimar entrada da Hero"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/80 hover:text-white bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full border border-white/15 transition-all shadow-lg hover:scale-105 active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reanimar</span>
        </button>

        <button
          onClick={() => setIsFramed(!isFramed)}
          title={isFramed ? 'Tela Cheia' : 'Visualizar com borda'}
          aria-label="Alternar modo de moldura"
          className="p-1.5 text-white/80 hover:text-white bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full border border-white/15 transition-all shadow-lg hover:scale-105 active:scale-95"
        >
          {isFramed ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>

        <button
          onClick={() => setShowToolbar(!showToolbar)}
          title="Configurações e personalização"
          aria-label="Abrir barra de personalização"
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-all shadow-lg hover:scale-105 active:scale-95 ${
            showToolbar
              ? 'bg-[#E6EE4F] text-[#5A4A1F] border-[#E6EE4F] font-semibold'
              : 'bg-black/60 hover:bg-black/80 text-white/80 hover:text-white border-white/15 backdrop-blur-md'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Personalizar</span>
        </button>
      </div>

      {/* Painel expansível de opções rápidas */}
      {showToolbar && (
        <div className="fixed top-16 right-4 z-50 w-84 max-h-[85vh] overflow-y-auto bg-zinc-900/95 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-2xl animate-fade-up-title scrollbar-thin">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E6EE4F]" />
              <h2 className="text-sm font-semibold text-white">Opções da Hero (PT-BR)</h2>
            </div>
            <button
              onClick={() => setShowToolbar(false)}
              className="text-xs text-white/60 hover:text-white"
            >
              Fechar
            </button>
          </div>

          <div className="space-y-4 text-xs">
            {/* Presets de Texto */}
            <div>
              <label className="text-white/70 block mb-1.5 font-medium">
                Modelos de Texto Rápidos:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => applyPreset('pt-default')}
                  className="px-2 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-[11px] text-center"
                >
                  Padrão PT
                </button>
                <button
                  onClick={() => applyPreset('pt-soft')}
                  className="px-2 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-[11px] text-center"
                >
                  Sorriso & Paz
                </button>
                <button
                  onClick={() => applyPreset('en')}
                  className="px-2 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-[11px] text-center"
                >
                  Inglês (Original)
                </button>
              </div>
            </div>

            {/* Edição do Título */}
            <div className="space-y-2">
              <label className="text-white/70 block font-medium">Título (2 linhas):</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={titleLine1}
                  onChange={(e) => setTitleLine1(e.target.value)}
                  placeholder="Linha 1"
                  className="bg-black/50 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#E6EE4F]"
                />
                <input
                  type="text"
                  value={titleLine2}
                  onChange={(e) => setTitleLine2(e.target.value)}
                  placeholder="Linha 2"
                  className="bg-black/50 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#E6EE4F]"
                />
              </div>
            </div>

            {/* Texto do Selo */}
            <div>
              <label className="text-white/70 block mb-1 font-medium">
                Texto do Selo Circular:
              </label>
              <input
                type="text"
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
                className="w-full bg-black/50 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#E6EE4F]"
              />
            </div>

            {/* Parágrafo */}
            <div>
              <label className="text-white/70 block mb-1 font-medium">
                Parágrafo Descritivo:
              </label>
              <textarea
                rows={2}
                value={descriptionText}
                onChange={(e) => setDescriptionText(e.target.value)}
                className="w-full bg-black/50 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#E6EE4F] resize-none"
              />
            </div>

            {/* Seletor de imagens */}
            <div>
              <label className="text-white/70 block mb-2 font-medium flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[#E6EE4F]" />
                Foto de Fundo
              </label>
              <div className="grid grid-cols-2 gap-2">
                {ALTERNATIVE_IMAGES.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => {
                      setSelectedImage(img.url);
                      setSelectedPosition(img.position || 'center center');
                      setIsCustom(false);
                    }}
                    className={`flex items-center gap-2 p-2 rounded-xl text-left border transition-all ${
                      !isCustom && selectedImage === img.url
                        ? 'border-[#E6EE4F] bg-[#E6EE4F]/15 text-white ring-1 ring-[#E6EE4F]'
                        : 'border-white/10 bg-white/5 text-white/70 hover:border-white/25 hover:bg-white/10'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.name}
                      className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                    />
                    <p className="font-medium truncate text-[11px] leading-tight">{img.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Inserir URL personalizada */}
            <div>
              <label className="text-white/70 block mb-1 font-medium">
                Ou use URL direta:
              </label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="https://..."
                  value={customUrl}
                  onChange={(e) => {
                    setCustomUrl(e.target.value);
                    setIsCustom(true);
                  }}
                  className="flex-1 bg-black/50 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E6EE4F]"
                />
                {customUrl && (
                  <button
                    onClick={() => {
                      setIsCustom(false);
                      setCustomUrl('');
                    }}
                    className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-[10px]"
                  >
                    Resetar
                  </button>
                )}
              </div>
            </div>

            {/* Ações adicionais */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 text-white/80 hover:text-white px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copiar código</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-1 text-[11px] text-white/50">
                <Info className="w-3 h-3" />
                <span>Inter Tight & SVG</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Renderização da Hero Section */}
      <div
        className={`w-full transition-all duration-300 ${
          isFramed
            ? 'p-4 md:p-8 flex items-center justify-center min-h-screen bg-zinc-900'
            : 'p-0'
        }`}
      >
        <div className={`w-full ${isFramed ? 'max-w-7xl' : ''}`}>
          <Hero
            key={animationKey}
            imageSrc={activeImageUrl}
            imagePosition={selectedPosition}
            showRoundedFrame={isFramed}
            titleLine1={titleLine1}
            titleLine2={titleLine2}
            badgeText={badgeText}
            descriptionText={descriptionText}
          />
        </div>
      </div>

      {/* Seção de Serviços em Acordeão Expansível */}
      <ServicesAccordion />

      {/* Seção Nossos Especialistas */}
      <Specialists />

      {/* Seção Consultas Gratuitas (Free Doctor Consultations) */}
      <FreeConsultation />

      {/* Seção A Quem Ajudamos? (Who We Help?) */}
      <WhoWeHelp />

      {/* Seção de Avaliações (1800+ Reviews) */}
      <Reviews />

      {/* Seção Final com CTA + Rodapé e Google Maps */}
      <Footer />
    </main>
  );
}
