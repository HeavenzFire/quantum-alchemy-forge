
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Trash2 } from 'lucide-react';

interface KnowledgeBaseCardProps {
  id: number;
  content: string;
  source: string;
  tags: string[];
  onDelete: (id: number) => void;
  onExpand?: (id: number) => void;
}

const KnowledgeBaseCard = ({ id, content, source, tags, onDelete, onExpand }: KnowledgeBaseCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleExpand = () => {
    setIsOpen(!isOpen);
    if (onExpand && !isOpen) {
      onExpand(id);
    }
  };
  
  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={setIsOpen}
      className="equation-item flex flex-col bg-white/10 hover:bg-white/15 transition-colors duration-300 rounded-lg p-4 mb-3"
    >
      <div className="flex justify-between items-start mb-2">
        <CollapsibleTrigger className="text-left whitespace-pre-wrap flex-1 cursor-pointer hover:text-quantum-accent transition-colors">
          {content.split('\n')[0]}
        </CollapsibleTrigger>
        <div className="flex gap-2 ml-3 shrink-0">
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8 text-red-400 hover:text-red-500 hover:bg-red-500/10"
            onClick={() => onDelete(id)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
      
      <CollapsibleContent>
        <div className="text-left whitespace-pre-wrap mt-2 border-t border-white/20 pt-2">
          {content.split('\n').slice(1).join('\n')}
        </div>
      </CollapsibleContent>
      
      <div className="flex justify-between items-center text-xs text-white/60 mt-2">
        <div className="source">Source: {source}</div>
        <div className="tags flex gap-1">
          {tags.map((tag, index) => (
            <span key={index} className="bg-quantum-accent/20 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Collapsible>
  );
};

export default KnowledgeBaseCard;
