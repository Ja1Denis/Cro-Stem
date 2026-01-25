
import React, { useState, useEffect, useCallback } from 'react';
import Hero from './components/Hero';
import InteractiveDemo from './components/InteractiveDemo';
import ComparisonTable from './components/ComparisonTable';
import BatchProcessor from './components/BatchProcessor';
import UseCases from './components/UseCases';
import ApiPreview from './components/ApiPreview';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        <Hero />
        <section id="demo" className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <InteractiveDemo />
        </section>
        <section id="comparison" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <ComparisonTable />
        </section>
        <section id="batch" className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <BatchProcessor />
        </section>
        <section id="use-cases" className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <UseCases />
        </section>
        <section id="api" className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <ApiPreview />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default App;
