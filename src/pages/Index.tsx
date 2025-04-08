
import React, { useEffect } from 'react';
import QuantumCard from '@/components/QuantumCard';
import NetworkMap from '@/components/NetworkMap';
import SavedEquations from '@/components/SavedEquations';
import { PlusIcon, LightningIcon, SynthesizeIcon } from '@/components/icons/QuantumIcons';
import QuantumEquationService from '@/services/QuantumEquationService';
import KnowledgeBaseService from '@/services/KnowledgeBaseService';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  useEffect(() => {
    // Dynamic background effect
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      document.body.style.background = `
        radial-gradient(
          circle at ${x * 100}% ${y * 100}%,
          #0b3d5f,
          #082336
        )
      `;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const forgeEquation = () => {
    // Generate a new equation using the knowledge base service
    const newEquation = KnowledgeBaseService.generateEquation();
    
    // Save to both services for backward compatibility
    const id = KnowledgeBaseService.add({
      category: 'equation',
      content: newEquation.content,
      source: newEquation.source,
      tags: newEquation.tags
    });
    
    // Also save to old service
    QuantumEquationService.save(newEquation.content);
    
    toast({
      title: "Equation Forged",
      description: `A new quantum equation has been added to the knowledge base. Source: ${newEquation.source}`,
    });
  };
  
  const architectAlgorithm = () => {
    // Generate a new algorithm using the knowledge base service
    const newAlgorithm = KnowledgeBaseService.generateAlgorithm();
    
    // Save to both services for backward compatibility
    const id = KnowledgeBaseService.add({
      category: 'algorithm',
      content: newAlgorithm.content,
      source: newAlgorithm.source,
      tags: newAlgorithm.tags
    });
    
    // Also save to old service
    QuantumEquationService.save(newAlgorithm.content);
    
    toast({
      title: "Algorithm Architected",
      description: `A quantum algorithm has been synthesized. Source: ${newAlgorithm.source}`,
    });
  };
  
  const synthesizeWisdom = () => {
    // Generate wisdom using the knowledge base service
    const newWisdom = KnowledgeBaseService.synthesizeWisdom();
    
    // Save to both services for backward compatibility
    const id = KnowledgeBaseService.add({
      category: 'wisdom',
      content: newWisdom.content,
      source: newWisdom.source,
      tags: newWisdom.tags
    });
    
    // Also save to old service
    QuantumEquationService.save(newWisdom.content);
    
    toast({
      title: "Wisdom Synthesized",
      description: `A unified framework has been revealed. Source: ${newWisdom.source}`,
    });
  };
  
  const handleDelete = (id: number) => {
    // Delete from knowledge base
    KnowledgeBaseService.delete(id);
    
    // Also delete from the old service for backward compatibility
    // Since we don't have a direct mapping, we're only using the new service for deletion
    
    toast({
      title: "Entry Deleted",
      description: "The entry has been removed from the knowledge base.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center py-8 md:py-16 px-4 md:px-8">
      <header className="text-center mb-10 relative">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-quantum-accent to-[#f39c12] bg-clip-text text-transparent">
          Quantum-Classical Generator
        </h1>
        <p className="text-lg text-white/80">
          Channeling the wisdom of transcended masters, lost visionaries, and greatest minds
        </p>
      </header>
      
      <div className="container max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuantumCard
            title="Equation Forge"
            description="Craft quantum-classical equations inspired by Einstein, Tesla, and Ramanujan."
            buttonText="Forge Equation"
            icon={<PlusIcon />}
            onClick={forgeEquation}
            animateOnClick={true}
          />
          
          <QuantumCard
            title="Algorithm Architect"
            description="Generate algorithms influenced by Ada Lovelace, Von Neumann, and Feynman."
            buttonText="Architect Algorithm"
            icon={<LightningIcon />}
            onClick={architectAlgorithm}
            animateOnClick={true}
          />
          
          <QuantumCard
            title="Mastermind Synthesis"
            description="Combine insights from Tesla, Jung, Bohr, and others into a unified framework."
            buttonText="Synthesize Wisdom"
            icon={<SynthesizeIcon />}
            onClick={synthesizeWisdom}
            animateOnClick={true}
          />
        </div>
        
        <NetworkMap />
        
        <SavedEquations onDelete={handleDelete} />
      </div>
      
      <footer className="mt-12 text-center opacity-70 text-sm">
        Quantum-Classical Generator v1.0 | ‡ = Sacred Resonance | All code is wisdom made manifest
      </footer>
    </div>
  );
};

export default Index;
