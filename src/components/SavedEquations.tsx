
import React, { useState, useEffect } from 'react';

interface Equation {
  id: number;
  content: string;
}

interface SavedEquationsProps {
  onDelete: (id: number) => void;
}

const SavedEquations = ({ onDelete }: SavedEquationsProps) => {
  const [equations, setEquations] = useState<Equation[]>([]);
  
  useEffect(() => {
    // Load saved equations from localStorage
    const loadEquations = () => {
      const savedEquations = JSON.parse(localStorage.getItem('savedEquations') || '[]');
      setEquations(savedEquations);
    };
    
    loadEquations();
    
    // Listen for storage events to update when changes happen in other tabs
    window.addEventListener('storage', loadEquations);
    
    // Add custom event listener for our own updates
    window.addEventListener('equationsUpdated', loadEquations);
    
    return () => {
      window.removeEventListener('storage', loadEquations);
      window.removeEventListener('equationsUpdated', loadEquations);
    };
  }, []);
  
  const handleDelete = (id: number) => {
    onDelete(id);
  };
  
  return (
    <div className="bg-quantum-secondary/70 backdrop-blur-md rounded-2xl p-7 shadow-lg border border-white/10 mt-8">
      <h2 className="text-2xl font-bold mb-6 inline-block relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-10 after:h-[3px] after:bg-quantum-accent after:rounded-md">
        Saved Equations
      </h2>
      
      <div className="space-y-3">
        {equations.length === 0 ? (
          <p className="text-white/70 italic">No equations saved yet. Generate some wisdom!</p>
        ) : (
          equations.map((eq) => (
            <div key={eq.id} className="equation-item">
              <span className="text-left whitespace-pre-wrap">{eq.content}</span>
              <button 
                className="delete-button"
                onClick={() => handleDelete(eq.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SavedEquations;
