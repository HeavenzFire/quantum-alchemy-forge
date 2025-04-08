
import React, { useState, useEffect } from 'react';
import GreatMindsService from '../services/GreatMindsService';
import GreatMindCard from '../components/GreatMindsCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const GreatMinds = () => {
  const [minds, setMinds] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [selectedEra, setSelectedEra] = useState('');
  const [fields, setFields] = useState<string[]>([]);
  const [eras, setEras] = useState<string[]>([]);
  const [selectedMind, setSelectedMind] = useState<any>(null);
  const [displayCount, setDisplayCount] = useState(20);
  
  useEffect(() => {
    // Load all great minds
    let filteredMinds = GreatMindsService.getAll();
    
    // Apply search filter if any
    if (searchTerm) {
      filteredMinds = GreatMindsService.search(searchTerm);
    }
    
    // Apply field filter if selected
    if (selectedField) {
      filteredMinds = filteredMinds.filter(mind => mind.field.includes(selectedField));
    }
    
    // Apply era filter if selected
    if (selectedEra) {
      filteredMinds = filteredMinds.filter(mind => mind.era === selectedEra);
    }
    
    setMinds(filteredMinds);
    
    // Load all available fields and eras for filters
    setFields(GreatMindsService.getAllFields());
    setEras(GreatMindsService.getAllEras());
  }, [searchTerm, selectedField, selectedEra]);
  
  const handleShowMore = () => {
    setDisplayCount(prev => prev + 20);
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedField('');
    setSelectedEra('');
  };
  
  const handleMindClick = (mind: any) => {
    setSelectedMind(mind);
  };
  
  const closeDialog = () => {
    setSelectedMind(null);
  };
  
  return (
    <div className="min-h-screen py-8 md:py-16 px-4 md:px-8">
      <div className="container max-w-[1200px] mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-quantum-accent to-[#f39c12] bg-clip-text text-transparent">
            The Greatest Minds
          </h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Explore the ideas and contributions of the greatest thinkers, scientists, philosophers, and innovators 
            throughout human history who have shaped our world.
          </p>
        </header>
        
        <div className="bg-quantum-secondary/70 backdrop-blur-md rounded-2xl p-7 shadow-lg border border-white/10 mb-10">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search by name, field, contribution..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                className="bg-white/10 border-white/20 text-white rounded-md px-3 py-2"
              >
                <option value="">All Fields</option>
                {fields.map((field) => (
                  <option key={field} value={field}>{field}</option>
                ))}
              </select>
              
              <select
                value={selectedEra}
                onChange={(e) => setSelectedEra(e.target.value)}
                className="bg-white/10 border-white/20 text-white rounded-md px-3 py-2"
              >
                <option value="">All Eras</option>
                {eras.map((era) => (
                  <option key={era} value={era}>{era}</option>
                ))}
              </select>
              
              {(searchTerm || selectedField || selectedEra) && (
                <Button 
                  onClick={clearFilters}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {minds.slice(0, displayCount).map((mind) => (
              <GreatMindCard
                key={mind.id}
                id={mind.id}
                name={mind.name}
                era={mind.era}
                field={mind.field}
                contribution={mind.contribution}
                quote={mind.quote}
                influence={mind.influence}
                onClick={() => handleMindClick(mind)}
              />
            ))}
          </div>
          
          {displayCount < minds.length && (
            <div className="text-center mt-8">
              <Button 
                onClick={handleShowMore}
                className="bg-quantum-accent text-black hover:bg-quantum-accent/80"
              >
                Show More Minds
              </Button>
            </div>
          )}
        </div>
        
        <Dialog open={!!selectedMind} onOpenChange={closeDialog}>
          {selectedMind && (
            <DialogContent className="bg-quantum-secondary/90 border-white/20 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedMind.name}</DialogTitle>
                <DialogDescription className="text-white/70">
                  {selectedMind.era} • {selectedMind.field}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 my-2">
                <div>
                  <h3 className="text-sm font-semibold text-white/60 mb-1">Contribution</h3>
                  <p>{selectedMind.contribution}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-white/60 mb-1">Notable Quote</h3>
                  <p className="italic">"{selectedMind.quote}"</p>
                </div>
                
                {selectedMind.influence && (
                  <div>
                    <h3 className="text-sm font-semibold text-white/60 mb-1">Influence</h3>
                    <p>{selectedMind.influence}</p>
                  </div>
                )}
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default GreatMinds;
