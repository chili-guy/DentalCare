import React from 'react';

// Constante com o endereço da clínica para fácil troca
export const MAP_QUERY = 'Avenida Paulista, 1000, Bela Vista, São Paulo - SP';

export interface FooterProps {
  onAppointmentClick?: () => void;
  className?: string;
}

/**
 * Componente <Footer />
 *
 * Atualizado conforme solicitado:
 * - Removido o bloco "Consulta Gratuita Inicial" / "Primeiro Passo" (Agendamento Online / Visita Presencial).
 * - Menus ("Menu", "Soluções", "Siga-nos") reposicionados no topo da coluna direita, alinhados harmoniosamente com o mapa.
 * - Layout clean, arejado, com tipografia refinada e sem molduras engessadas.
 */
export const Footer: React.FC<FooterProps> = ({
  onAppointmentClick,
  className = '',
}) => {
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    MAP_QUERY
  )}&output=embed`;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    MAP_QUERY
  )}`;

  const scrollToAnchor = (
    e: React.MouseEvent<HTMLAnchorElement>,
    anchorId: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="contact"
      aria-label="Rodapé e Contato"
      className={`w-full bg-[#E6EE4F] text-[#7A3314] font-hero select-none relative overflow-hidden ${className}`}
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 pt-16 md:pt-24 pb-12">
        {/* ============================================================== */}
        {/* BLOCO HERO CTA: COMPOSTO, FLUIDO E SEM CAIXA                   */}
        {/* ============================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 md:pb-16">
          <div className="max-w-3xl">
            <h2
              className="font-normal text-[#7A3314] tracking-[-0.03em] leading-[1.02]"
              style={{
                fontSize: 'clamp(2.75rem, 6.5vw, 5.25rem)',
              }}
            >
              Agende sua Consulta <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal">com nossos especialistas</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:pb-2">
            <button
              type="button"
              onClick={onAppointmentClick}
              className="group relative px-9 py-[18px] rounded-full bg-[#7A3314] text-[#E6EE4F] text-[15px] font-semibold cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#5A2410] hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-[#7A3314] focus-visible:outline-offset-2 flex items-center gap-3"
            >
              <span>Agendar Consulta Agora</span>
              <span className="w-7 h-7 rounded-full bg-[#E6EE4F] text-[#7A3314] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PRINCIPAL: MAPA INTERATIVO + NAVEGAÇÃO ELEVADA (SEM BLOCO)     */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start py-6">
          {/* COLUNA ESQUERDA: MAPA FLUTUANTE EXPANDIDO */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-[460px] sm:h-[520px] lg:h-[580px] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(122,51,20,0.12)] bg-[#ded9cb]">
              {/* Iframe do Google Maps */}
              <iframe
                title="Localização da clínica"
                src={mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0 transition-[filter] duration-500 ease-out"
                style={{
                  filter: 'grayscale(0.15) sepia(0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'none';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'grayscale(0.15) sepia(0.08)';
                }}
              />

              {/* Card Flutuante com Direções e Localização */}
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-[360px] bg-[#FBF3E4]/95 backdrop-blur-md rounded-[22px] p-5 shadow-[0_16px_36px_rgba(122,51,20,0.18)] pointer-events-auto transition-transform duration-300 hover:scale-[1.02]">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#7A3314] text-[#E6EE4F] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-[#7A3314]/70">
                      Localização da Clínica
                    </span>
                    <p className="text-[14px] text-[#7A3314] font-semibold leading-snug mt-1">
                      {MAP_QUERY}
                    </p>
                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Abrir rota no Google Maps (abre em nova aba)"
                      className="text-[13px] font-bold text-[#7A3314] mt-3 inline-flex items-center gap-1.5 group/route hover:text-[#5A2410]"
                    >
                      <span>Abrir rota no Google Maps</span>
                      <span className="transition-transform duration-200 group-hover/route:translate-x-1 text-[15px]">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: MENUS SUBIDOS PARA O TOPO */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[460px] lg:min-h-[580px] pt-2 pb-4">
            {/* Três Colunas de Navegação Elegantes no Topo */}
            <div className="grid grid-cols-3 gap-6 sm:gap-10">
              {/* Coluna 1: Menu */}
              <nav aria-label="Menu Principal" className="flex flex-col">
                <h3 className="text-[15px] uppercase tracking-wider font-bold text-[#7A3314]/60 mb-5">
                  Menu
                </h3>
                <ul className="flex flex-col gap-3.5" role="list">
                  <li>
                    <a
                      href="#services"
                      onClick={(e) => scrollToAnchor(e, 'services')}
                      className="text-[15px] text-[#7A3314] font-medium transition-all hover:text-[#5A2410] hover:translate-x-1.5 inline-block"
                    >
                      Serviços
                    </a>
                  </li>
                  <li>
                    <a
                      href="#doctors"
                      onClick={(e) => scrollToAnchor(e, 'doctors')}
                      className="text-[15px] text-[#7A3314] font-medium transition-all hover:text-[#5A2410] hover:translate-x-1.5 inline-block"
                    >
                      Especialistas
                    </a>
                  </li>
                  <li>
                    <a
                      href="#reviews"
                      onClick={(e) => scrollToAnchor(e, 'reviews')}
                      className="text-[15px] text-[#7A3314] font-medium transition-all hover:text-[#5A2410] hover:translate-x-1.5 inline-block"
                    >
                      Avaliações
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      onClick={(e) => scrollToAnchor(e, 'contact')}
                      className="text-[15px] text-[#7A3314] font-medium transition-all hover:text-[#5A2410] hover:translate-x-1.5 inline-block"
                    >
                      Contato
                    </a>
                  </li>
                </ul>
              </nav>

              {/* Coluna 2: Soluções */}
              <nav aria-label="Soluções Odontológicas" className="flex flex-col">
                <h3 className="text-[15px] uppercase tracking-wider font-bold text-[#7A3314]/60 mb-5">
                  Soluções
                </h3>
                <ul className="flex flex-col gap-3.5" role="list">
                  <li>
                    <a
                      href="#services"
                      onClick={(e) => scrollToAnchor(e, 'services')}
                      className="text-[15px] text-[#7A3314] font-medium transition-all hover:text-[#5A2410] hover:translate-x-1.5 inline-block"
                    >
                      Restaurações
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      onClick={(e) => scrollToAnchor(e, 'services')}
                      className="text-[15px] text-[#7A3314] font-medium transition-all hover:text-[#5A2410] hover:translate-x-1.5 inline-block"
                    >
                      Canal
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      onClick={(e) => scrollToAnchor(e, 'services')}
                      className="text-[15px] text-[#7A3314] font-medium transition-all hover:text-[#5A2410] hover:translate-x-1.5 inline-block"
                    >
                      Extração
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      onClick={(e) => scrollToAnchor(e, 'services')}
                      className="text-[15px] text-[#7A3314] font-medium transition-all hover:text-[#5A2410] hover:translate-x-1.5 inline-block"
                    >
                      Implantes
                    </a>
                  </li>
                </ul>
              </nav>

              {/* Coluna 3: Siga-nos */}
              <nav aria-label="Redes e Redes Sociais" className="flex flex-col">
                <h3 className="text-[15px] uppercase tracking-wider font-bold text-[#7A3314]/60 mb-5">
                  Siga-nos
                </h3>
                <ul className="flex flex-col gap-3.5" role="list">
                  <li>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] text-[#7A3314] font-medium transition-all hover:text-[#5A2410] hover:translate-x-1.5 inline-block"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] text-[#7A3314] font-medium transition-all hover:text-[#5A2410] hover:translate-x-1.5 inline-block"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] text-[#7A3314] font-medium transition-all hover:text-[#5A2410] hover:translate-x-1.5 inline-block"
                    >
                      Twitter / X
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Bloco de Atendimento e Contato no Rodapé da Coluna */}
            <div className="pt-10 mt-auto flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-[14px] text-[#7A3314]/80">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block animate-pulse" />
                  <span>
                    <strong className="text-[#7A3314] font-semibold">Horário:</strong> Seg a Sex, 08h às 20h
                  </span>
                </div>
                <div>
                  <strong className="text-[#7A3314] font-semibold">WhatsApp:</strong> (11) 98765-4321
                </div>
              </div>

              <p className="text-[13px] text-[#7A3314]/65 leading-relaxed">
                Consultório com tecnologia de ponta, acessibilidade e equipe multidisciplinar pronta para acolher você.
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* BARRA INFERIOR: CLEAN, SEM MOLDURA, APENAS TIPOGRAFIA SUTIL    */}
        {/* ============================================================== */}
        <div className="mt-16 pt-8 border-t border-[#7A3314]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="text-[22px] font-bold text-[#7A3314] tracking-[-0.02em] leading-none">
              OdontoCare
            </span>
            <span className="text-[12px] text-[#7A3314]/70">
              © Clínica Odontológica Especializada. Todos os Direitos Reservados.
            </span>
          </div>

          <div className="flex items-center gap-5 text-[12px] text-[#7A3314]/75 font-medium">
            <a
              href="#terms"
              className="hover:text-[#7A3314] transition-colors hover:underline"
            >
              Termos & Condições
            </a>
            <span>•</span>
            <a
              href="#privacy"
              className="hover:text-[#7A3314] transition-colors hover:underline"
            >
              Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
