
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QuantumCard from '@/components/QuantumCard';
import NetworkMap from '@/components/NetworkMap';
import SavedEquations from '@/components/SavedEquations';
import { PlusIcon, LightningIcon, SynthesizeIcon } from '@/components/icons/QuantumIcons';
import QuantumEquationService from '@/services/QuantumEquationService';
import KnowledgeBaseService from '@/services/KnowledgeBaseService';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [insightCount, setInsightCount] = useState(0);
  const [lastInsight, setLastInsight] = useState('');
  const [activeResearch, setActiveResearch] = useState(false);
  
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
    
    // Load initial insight count
    setInsightCount(KnowledgeBaseService.getAll().length);
    
    // Setup event listener for knowledge base updates
    const handleKnowledgeUpdate = () => {
      const allEntries = KnowledgeBaseService.getAll();
      setInsightCount(allEntries.length);
      if (allEntries.length > 0) {
        const latestEntry = allEntries[allEntries.length - 1];
        setLastInsight(`"${latestEntry.content.split('\n')[0]}" - ${latestEntry.source}`);
      }
    };
    
    window.addEventListener('knowledgeBaseUpdated', handleKnowledgeUpdate);
    
    // Initialize with current data
    handleKnowledgeUpdate();
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('knowledgeBaseUpdated', handleKnowledgeUpdate);
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
    
    setLastInsight(`"${newEquation.content.split('\n')[0]}" - ${newEquation.source}`);
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
    
    setLastInsight(`"${newAlgorithm.content.split('\n')[0]}" - ${newAlgorithm.source}`);
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
    
    setLastInsight(`"${newWisdom.content.split('\n')[0]}" - ${newWisdom.source}`);
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
  
  const startResearch = () => {
    setActiveResearch(true);
    
    // Generate a series of insights over time
    const generateInsight = () => {
      const random = Math.random();
      if (random < 0.33) {
        forgeEquation();
      } else if (random < 0.66) {
        architectAlgorithm();
      } else {
        synthesizeWisdom();
      }
    };
    
    // Generate first insight immediately
    generateInsight();
    
    // Schedule more insights
    const timer = setInterval(() => {
      if (!document.hidden) {
        generateInsight();
      }
    }, 60000); // Every minute
    
    // Store timer ID for cleanup
    (window as any).insightTimer = timer;
    
    toast({
      title: "Active Research Initiated",
      description: "The minds are now actively generating new insights automatically.",
    });
  };
  
  const stopResearch = () => {
    setActiveResearch(false);
    clearInterval((window as any).insightTimer);
    
    toast({
      title: "Research Paused",
      description: "Automatic insight generation has been paused.",
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
        {lastInsight && (
          <p className="mt-4 italic text-quantum-accent/80 max-w-xl mx-auto text-sm">
            Latest insight: {lastInsight}
          </p>
        )}
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
        
        <Card className="mt-8 bg-quantum-secondary/70 backdrop-blur-md border-white/10 text-white">
          <CardHeader>
            <CardTitle className="text-xl">Research Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 p-4 rounded-lg text-center">
                <h3 className="text-lg font-semibold mb-1">Total Insights</h3>
                <p className="text-3xl font-bold text-quantum-accent">{insightCount}</p>
              </div>
              
              <div className="bg-white/10 p-4 rounded-lg text-center col-span-1 md:col-span-2">
                <h3 className="text-lg font-semibold mb-1">Active Research</h3>
                {activeResearch ? (
                  <button 
                    onClick={stopResearch}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Pause Auto-Generation
                  </button>
                ) : (
                  <button 
                    onClick={startResearch}
                    className="bg-quantum-accent hover:bg-quantum-accent/80 text-black px-4 py-2 rounded-lg transition-colors"
                  >
                    Start Auto-Generation
                  </button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center">
          <Link to="/great-minds">
            <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
              Explore 500 Greatest Minds in History
            </Button>
          </Link>
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
