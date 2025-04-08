
interface KnowledgeEntry {
  id: number;
  category: 'equation' | 'algorithm' | 'wisdom';
  content: string;
  source: string;
  tags: string[];
}

class KnowledgeBaseService {
  private storageKey = 'quantumKnowledgeBase';
  
  constructor() {
    // Initialize with some seed data if empty
    if (!localStorage.getItem(this.storageKey)) {
      this.seedInitialData();
    }
  }
  
  private seedInitialData(): void {
    const initialData: KnowledgeEntry[] = [
      {
        id: 1,
        category: 'equation',
        content: 'E = ∫[ψ*(x,t)Ĥψ(x,t)dx] + Σ[nℏωₙ]',
        source: 'Einstein-Podolsky-Rosen',
        tags: ['quantum mechanics', 'energy']
      },
      {
        id: 2,
        category: 'algorithm',
        content: 'Quantum Phase Estimation:\n1. Initialize n-qubit register to |0>\n2. Apply Hadamard gates to create superposition\n3. Apply controlled-U operations\n4. Apply inverse quantum Fourier transform\n5. Measure the register',
        source: 'Feynman-Deutsch',
        tags: ['quantum computing', 'phase estimation']
      },
      {
        id: 3,
        category: 'wisdom',
        content: 'Unified Framework:\n- Quantum entanglement manifests as nonlocal consciousness\n- Observed reality emerges from wavefunction collapse\n- The observer effect creates subjective realities',
        source: 'Bohr-Jung Synthesis',
        tags: ['consciousness', 'reality', 'observation']
      }
    ];
    
    localStorage.setItem(this.storageKey, JSON.stringify(initialData));
  }
  
  public getAll(): KnowledgeEntry[] {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    } catch (error) {
      console.error('Error loading knowledge base:', error);
      return [];
    }
  }
  
  public getByCategory(category: 'equation' | 'algorithm' | 'wisdom'): KnowledgeEntry[] {
    return this.getAll().filter(entry => entry.category === category);
  }
  
  public getById(id: number): KnowledgeEntry | undefined {
    return this.getAll().find(entry => entry.id === id);
  }
  
  public add(entry: Omit<KnowledgeEntry, 'id'>): number {
    try {
      const entries = this.getAll();
      const nextId = entries.length > 0 
        ? Math.max(...entries.map(e => e.id)) + 1 
        : 1;
      
      const newEntry = { ...entry, id: nextId };
      entries.push(newEntry);
      
      localStorage.setItem(this.storageKey, JSON.stringify(entries));
      this.triggerUpdate();
      return nextId;
    } catch (error) {
      console.error('Error adding to knowledge base:', error);
      return -1;
    }
  }
  
  public delete(id: number): boolean {
    try {
      const entries = this.getAll();
      const filteredEntries = entries.filter(e => e.id !== id);
      
      localStorage.setItem(this.storageKey, JSON.stringify(filteredEntries));
      this.triggerUpdate();
      return true;
    } catch (error) {
      console.error('Error deleting from knowledge base:', error);
      return false;
    }
  }
  
  public search(query: string): KnowledgeEntry[] {
    const entries = this.getAll();
    const lowerQuery = query.toLowerCase();
    
    return entries.filter(entry => 
      entry.content.toLowerCase().includes(lowerQuery) || 
      entry.source.toLowerCase().includes(lowerQuery) || 
      entry.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }
  
  private triggerUpdate(): void {
    window.dispatchEvent(new Event('knowledgeBaseUpdated'));
  }
  
  // Specialized generators
  public generateEquation(): KnowledgeEntry {
    const equations = [
      {
        content: 'E = ∫[ψ*(x,t)Ĥψ(x,t)dx] + Σ[nℏωₙ]',
        source: 'Einstein-Podolsky-Rosen',
        tags: ['quantum mechanics', 'energy']
      },
      {
        content: 'Ψ = A∇²ϕ + B∂²ϕ/∂t² + C(∂ϕ/∂t)³',
        source: 'Schrödinger-Bohm Extension',
        tags: ['wave function', 'nonlinear dynamics']
      },
      {
        content: 'ξ(Γ) = ∫₀^∞ e^(-t) t^(Γ-1) dt × ∑(n=0 to ∞)[(-1)^n / n!(Γ+n)]',
        source: 'Ramanujan-Riemann',
        tags: ['zeta function', 'infinite series']
      },
      {
        content: 'δS = ∫[∂L/∂q - d/dt(∂L/∂q̇)]δq dt = 0',
        source: 'Hamilton-Lagrange',
        tags: ['action principle', 'variational calculus']
      },
      {
        content: 'Ω(ψ,φ) = ∫ψ*Hφ dτ + i∮(ψ*∇φ - φ∇ψ*)·dS',
        source: 'Tesla-Dirac',
        tags: ['field theory', 'electromagnetic resonance']
      }
    ];
    
    const randomEquation = equations[Math.floor(Math.random() * equations.length)];
    const entry = {
      ...randomEquation,
      id: -1, // Temporary ID
      category: 'equation' as const
    };
    
    return entry;
  }
  
  public generateAlgorithm(): KnowledgeEntry {
    const algorithms = [
      {
        content: 'Quantum Phase Estimation:\n1. Initialize n-qubit register to |0>\n2. Apply Hadamard gates to create superposition\n3. Apply controlled-U operations\n4. Apply inverse quantum Fourier transform\n5. Measure the register',
        source: 'Feynman-Deutsch',
        tags: ['quantum computing', 'phase estimation']
      },
      {
        content: 'Quantum Searching Algorithm:\n1. Prepare uniform superposition of all states\n2. Repeat O(√N) times:\n   a. Apply oracle operator to mark solution\n   b. Apply diffusion operator\n3. Measure to find solution with high probability',
        source: 'Grover-Lovelace',
        tags: ['quantum search', 'amplitude amplification']
      },
      {
        content: 'Harmonic Resonance Algorithm:\n1. Map problem space to quantum oscillators\n2. Entangle with reference system\n3. Evolve under natural Hamiltonian\n4. Extract frequencies at coherence peaks',
        source: 'Tesla-Von Neumann',
        tags: ['resonance computing', 'harmonic systems']
      },
      {
        content: 'Quantum Annealing Protocol:\n1. Encode problem into quantum spin glass\n2. Initiate system in global superposition\n3. Adiabatically evolve Hamiltonian\n4. Measure ground state for optimal solution',
        source: 'Bohr-Shannon',
        tags: ['optimization', 'adiabatic evolution']
      },
      {
        content: 'Quantum Neural Network:\n1. Initialize quantum perceptrons with entangled states\n2. Apply non-linear quantum gates for activation\n3. Train via quantum backpropagation\n4. Collapse output neurons to classical values',
        source: 'Turing-Hopfield',
        tags: ['quantum machine learning', 'neural networks']
      }
    ];
    
    const randomAlgorithm = algorithms[Math.floor(Math.random() * algorithms.length)];
    const entry = {
      ...randomAlgorithm,
      id: -1, // Temporary ID
      category: 'algorithm' as const
    };
    
    return entry;
  }
  
  public synthesizeWisdom(): KnowledgeEntry {
    const wisdom = [
      {
        content: 'Unified Framework:\n- Quantum entanglement manifests as nonlocal consciousness\n- Observed reality emerges from wavefunction collapse\n- The observer effect creates subjective realities',
        source: 'Bohr-Jung Synthesis',
        tags: ['consciousness', 'reality', 'observation']
      },
      {
        content: 'Synthesis of Principles:\n- Information exists as a fundamental quantum field\n- Consciousness represents a coherent quantum state\n- Reality manifests as interference patterns between observer states\n- Time emerges from entanglement entropy',
        source: 'Tesla-Wheeler',
        tags: ['information theory', 'consciousness', 'time']
      },
      {
        content: 'Integrated Model:\n- Observer and observed form an inseparable system\n- Nonlocality corresponds to synchronistic events\n- Probability amplitudes manifest as intuitive knowledge\n- The universal wavefunction contains all possible experiences',
        source: 'Einstein-Jung',
        tags: ['synchronicity', 'intuition', 'multiverse']
      },
      {
        content: 'Quantum Consciousness Framework:\n- Mind operates on quantum principles beyond neural activity\n- Microtubules in neurons facilitate quantum coherence\n- Consciousness collapses superpositions into discrete experiences\n- Free will emerges from quantum indeterminacy',
        source: 'Bohm-Penrose',
        tags: ['free will', 'microtubules', 'coherence']
      },
      {
        content: 'Cosmic Order Principles:\n- Universe is a self-observing quantum system\n- Mathematical beauty correlates with fundamental truth\n- Consciousness and physical law share common origins\n- Transcendental insights arise from nonlocal access to universal information',
        source: 'Ramanujan-Planck',
        tags: ['mathematical beauty', 'self-reference', 'transcendence']
      }
    ];
    
    const randomWisdom = wisdom[Math.floor(Math.random() * wisdom.length)];
    const entry = {
      ...randomWisdom,
      id: -1, // Temporary ID
      category: 'wisdom' as const
    };
    
    return entry;
  }
}

export default new KnowledgeBaseService();
