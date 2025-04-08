
import React, { useEffect } from 'react';
import QuantumCard from '@/components/QuantumCard';
import NetworkMap from '@/components/NetworkMap';
import SavedEquations from '@/components/SavedEquations';
import { PlusIcon, LightningIcon, SynthesizeIcon } from '@/components/icons/QuantumIcons';
import QuantumEquationService from '@/services/QuantumEquationService';
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
    const equations = [
      "E = ∫[ψ*(x,t)Ĥψ(x,t)dx] + Σ[nℏωₙ]",
      "Ψ = A∇²ϕ + B∂²ϕ/∂t² + C(∂ϕ/∂t)³",
      "ξ(Γ) = ∫₀^∞ e^(-t) t^(Γ-1) dt × ∑(n=0 to ∞)[(-1)^n / n!(Γ+n)]",
      "δS = ∫[∂L/∂q - d/dt(∂L/∂q̇)]δq dt = 0",
      "Ω(ψ,φ) = ∫ψ*Hφ dτ + i∮(ψ*∇φ - φ∇ψ*)·dS",
    ];
    
    const randomEquation = equations[Math.floor(Math.random() * equations.length)];
    const id = QuantumEquationService.save(randomEquation);
    
    toast({
      title: "Equation Forged",
      description: "A new quantum-classical equation has been created.",
    });
  };
  
  const architectAlgorithm = () => {
    const algorithms = [
      "Algorithm Architected:\n1. Initialize Quantum State Vector\n2. Apply Unitary Operators\n3. Measure Classical Output\n4. Iterate for Optimization",
      "Quantum Optimization Protocol:\n1. Prepare superposition of all possible states\n2. Apply phase shifts proportional to objective function\n3. Perform quantum Fourier transform\n4. Measure to extract solution",
      "Harmonic Resonance Algorithm:\n1. Map problem space to quantum oscillators\n2. Entangle with reference system\n3. Evolve under natural Hamiltonian\n4. Extract frequencies at coherence peaks",
    ];
    
    const randomAlgorithm = algorithms[Math.floor(Math.random() * algorithms.length)];
    const id = QuantumEquationService.save(randomAlgorithm);
    
    toast({
      title: "Algorithm Architected",
      description: "A quantum algorithm has been synthesized.",
    });
  };
  
  const synthesizeWisdom = () => {
    const wisdom = [
      "Unified Framework:\n- Quantum Entanglement as Collective Consciousness\n- Classical Mechanics as Manifest Reality\n- Transcendental Insights as Emergent Properties",
      "Synthesis of Principles:\n- Information as fundamental quantum field\n- Consciousness as coherent quantum state\n- Reality as interference pattern between observer states",
      "Integrated Model:\n- The observer and observed form an inseparable system\n- Nonlocality corresponds to synchronistic events\n- Probability amplitudes manifest as intuitive knowledge",
    ];
    
    const randomWisdom = wisdom[Math.floor(Math.random() * wisdom.length)];
    const id = QuantumEquationService.save(randomWisdom);
    
    toast({
      title: "Wisdom Synthesized",
      description: "A unified framework has been revealed.",
    });
  };
  
  const handleDelete = (id: number) => {
    QuantumEquationService.delete(id);
    toast({
      title: "Equation Deleted",
      description: "The equation has been removed from the collection.",
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
          />
          
          <QuantumCard
            title="Algorithm Architect"
            description="Generate algorithms influenced by Ada Lovelace, Von Neumann, and Feynman."
            buttonText="Architect Algorithm"
            icon={<LightningIcon />}
            onClick={architectAlgorithm}
          />
          
          <QuantumCard
            title="Mastermind Synthesis"
            description="Combine insights from Tesla, Jung, Bohr, and others into a unified framework."
            buttonText="Synthesize Wisdom"
            icon={<SynthesizeIcon />}
            onClick={synthesizeWisdom}
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
