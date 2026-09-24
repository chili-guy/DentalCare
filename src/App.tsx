/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Hero } from './Hero';
import { ServicesAccordion } from './ServicesAccordion';
import { Specialists } from './Specialists';
import { FreeConsultation } from './FreeConsultation';
import { WhoWeHelp } from './WhoWeHelp';
import { Reviews } from './Reviews';
import { Footer } from './Footer';

export default function App() {
  return (
    <main className="relative min-h-screen w-full bg-black text-white font-hero selection:bg-[#E6EE4F] selection:text-[#5A4A1F]">
      {/* Hero Section com imagem fixa de sorriso */}
      <Hero showRoundedFrame={false} />

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
