
import React, { useState, useEffect } from 'react';
import KnowledgeBaseService from '../services/KnowledgeBaseService';
import KnowledgeBaseCard from './KnowledgeBaseCard';

interface SavedEquationsProps {
  onDelete: (id: number) => void;
}

const SavedEquations = ({ onDelete }: SavedEquationsProps) => {
  const [entries, setEntries] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<'all' | 'equation' | 'algorithm' | 'wisdom'>('all');
  
  useEffect(() => {
    // Load knowledge base entries
    const loadEntries = () => {
      let knowledgeEntries;
      
      if (activeCategory === 'all') {
        knowledgeEntries = KnowledgeBaseService.getAll();
      } else {
        knowledgeEntries = KnowledgeBaseService.getByCategory(activeCategory);
      }
      
      setEntries(knowledgeEntries);
    };
    
    loadEntries();
    
    // Listen for updates to knowledge base
    window.addEventListener('knowledgeBaseUpdated', loadEntries);
    
    return () => {
      window.removeEventListener('knowledgeBaseUpdated', loadEntries);
    };
  }, [activeCategory]);
  
  const handleDelete = (id: number) => {
    onDelete(id);
  };
  
  return (
    <div className="bg-quantum-secondary/70 backdrop-blur-md rounded-2xl p-7 shadow-lg border border-white/10 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold inline-block relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-10 after:h-[3px] after:bg-quantum-accent after:rounded-md">
          Knowledge Base
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1 rounded-full text-sm ${activeCategory === 'all' ? 'bg-quantum-accent text-black' : 'bg-white/10'}`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveCategory('equation')}
            className={`px-3 py-1 rounded-full text-sm ${activeCategory === 'equation' ? 'bg-quantum-accent text-black' : 'bg-white/10'}`}
          >
            Equations
          </button>
          <button 
            onClick={() => setActiveCategory('algorithm')}
            className={`px-3 py-1 rounded-full text-sm ${activeCategory === 'algorithm' ? 'bg-quantum-accent text-black' : 'bg-white/10'}`}
          >
            Algorithms
          </button>
          <button 
            onClick={() => setActiveCategory('wisdom')}
            className={`px-3 py-1 rounded-full text-sm ${activeCategory === 'wisdom' ? 'bg-quantum-accent text-black' : 'bg-white/10'}`}
          >
            Wisdom
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        {entries.length === 0 ? (
          <p className="text-white/70 italic">No entries found. Generate some quantum wisdom!</p>
        ) : (
          entries.map((entry) => (
            <KnowledgeBaseCard
              key={entry.id}
              id={entry.id}
              content={entry.content}
              source={entry.source}
              tags={entry.tags}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SavedEquations;
