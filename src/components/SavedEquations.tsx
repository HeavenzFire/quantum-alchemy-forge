
import React, { useState, useEffect } from 'react';
import KnowledgeBaseService from '../services/KnowledgeBaseService';
import KnowledgeBaseCard from './KnowledgeBaseCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface SavedEquationsProps {
  onDelete: (id: number) => void;
}

const SavedEquations = ({ onDelete }: SavedEquationsProps) => {
  const [entries, setEntries] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<'all' | 'equation' | 'algorithm' | 'wisdom'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [allTags, setAllTags] = useState<string[]>([]);
  const [autoSave, setAutoSave] = useState(() => {
    return localStorage.getItem('autoSaveEnabled') === 'true';
  });
  
  useEffect(() => {
    // Save auto-save setting to localStorage
    localStorage.setItem('autoSaveEnabled', autoSave.toString());
  }, [autoSave]);
  
  useEffect(() => {
    // Load knowledge base entries
    const loadEntries = () => {
      let knowledgeEntries;
      
      if (searchTerm) {
        knowledgeEntries = KnowledgeBaseService.search(searchTerm);
      } else if (activeCategory === 'all') {
        knowledgeEntries = KnowledgeBaseService.getAll();
      } else {
        knowledgeEntries = KnowledgeBaseService.getByCategory(activeCategory);
      }
      
      // Apply tag filter if one is selected
      if (filterTag) {
        knowledgeEntries = knowledgeEntries.filter((entry) => 
          entry.tags.includes(filterTag)
        );
      }
      
      setEntries(knowledgeEntries);
      
      // Collect all unique tags
      const tags = new Set<string>();
      KnowledgeBaseService.getAll().forEach(entry => {
        entry.tags.forEach(tag => tags.add(tag));
      });
      setAllTags(Array.from(tags));
    };
    
    loadEntries();
    
    // Listen for updates to knowledge base
    window.addEventListener('knowledgeBaseUpdated', loadEntries);
    
    // Set up auto-save listener
    if (autoSave) {
      window.addEventListener('equationsUpdated', handleAutoSave);
    }
    
    return () => {
      window.removeEventListener('knowledgeBaseUpdated', loadEntries);
      window.removeEventListener('equationsUpdated', handleAutoSave);
    };
  }, [activeCategory, searchTerm, filterTag, autoSave]);
  
  const handleAutoSave = () => {
    // Get latest equation from old service
    const oldEquations = JSON.parse(localStorage.getItem('savedEquations') || '[]');
    if (oldEquations.length > 0) {
      const latestEquation = oldEquations[oldEquations.length - 1];
      
      // Check if this equation is already in the knowledge base to avoid duplicates
      // We'll use a simple content check
      const existingEntries = KnowledgeBaseService.getAll();
      const isDuplicate = existingEntries.some(entry => 
        entry.content === latestEquation.content
      );
      
      if (!isDuplicate) {
        // Determine which category it might be
        let category: 'equation' | 'algorithm' | 'wisdom' = 'equation';
        const content = latestEquation.content.toLowerCase();
        
        if (content.includes('algorithm') || content.includes('step') || content.includes('procedure')) {
          category = 'algorithm';
        } else if (content.includes('framework') || content.includes('principle') || content.includes('synthesis')) {
          category = 'wisdom';
        }
        
        // Generate random source and tags based on category
        let source = '';
        let tags: string[] = [];
        
        switch (category) {
          case 'equation':
            source = 'Auto-saved Equation';
            tags = ['auto-saved', 'equation'];
            break;
          case 'algorithm':
            source = 'Auto-saved Algorithm';
            tags = ['auto-saved', 'algorithm'];
            break;
          case 'wisdom':
            source = 'Auto-saved Wisdom';
            tags = ['auto-saved', 'wisdom'];
            break;
        }
        
        // Add to knowledge base
        KnowledgeBaseService.add({
          category,
          content: latestEquation.content,
          source,
          tags
        });
        
        toast({
          title: "Auto-Saved to Knowledge Base",
          description: `Entry has been categorized as: ${category}`,
        });
      }
    }
  };
  
  const handleDelete = (id: number) => {
    onDelete(id);
  };
  
  const handleExpand = (id: number) => {
    // You could add analytics here or other tracking
    console.log(`Entry ${id} was expanded`);
  };
  
  const generateMore = () => {
    let newEntry;
    
    switch (activeCategory) {
      case 'equation':
        newEntry = KnowledgeBaseService.generateEquation();
        break;
      case 'algorithm':
        newEntry = KnowledgeBaseService.generateAlgorithm();
        break;
      case 'wisdom':
        newEntry = KnowledgeBaseService.synthesizeWisdom();
        break;
      default:
        // For 'all' category, randomly select a generator
        const generators = ['equation', 'algorithm', 'wisdom'];
        const randomGenerator = generators[Math.floor(Math.random() * generators.length)];
        
        if (randomGenerator === 'equation') {
          newEntry = KnowledgeBaseService.generateEquation();
        } else if (randomGenerator === 'algorithm') {
          newEntry = KnowledgeBaseService.generateAlgorithm();
        } else {
          newEntry = KnowledgeBaseService.synthesizeWisdom();
        }
    }
    
    const id = KnowledgeBaseService.add({
      category: newEntry.category,
      content: newEntry.content,
      source: newEntry.source,
      tags: newEntry.tags
    });
    
    toast({
      title: `New ${newEntry.category} generated`,
      description: `Created by ${newEntry.source}`,
    });
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setFilterTag('');
  };
  
  return (
    <div className="bg-quantum-secondary/70 backdrop-blur-md rounded-2xl p-7 shadow-lg border border-white/10 mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold inline-block relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-10 after:h-[3px] after:bg-quantum-accent after:rounded-md">
          Knowledge Base
        </h2>
        <div className="flex gap-2 flex-wrap">
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
      
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search knowledge base..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="bg-white/10 border-white/20 text-white rounded-md px-3 py-2"
          >
            <option value="">All Tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
          
          {(searchTerm || filterTag) && (
            <Button 
              onClick={clearFilters}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Clear
            </Button>
          )}
          
          <Button
            onClick={generateMore}
            className="bg-quantum-accent text-black hover:bg-quantum-accent/80"
          >
            Generate More
          </Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 mb-4 px-2 py-2 bg-white/5 rounded-lg">
        <Switch 
          id="autosave" 
          checked={autoSave} 
          onCheckedChange={setAutoSave} 
        />
        <Label htmlFor="autosave" className="text-white/80">
          Auto-save new equations to knowledge base
        </Label>
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
              onExpand={handleExpand}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SavedEquations;
