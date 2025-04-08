
import React from 'react';

interface KnowledgeBaseCardProps {
  id: number;
  content: string;
  source: string;
  tags: string[];
  onDelete: (id: number) => void;
}

const KnowledgeBaseCard = ({ id, content, source, tags, onDelete }: KnowledgeBaseCardProps) => {
  return (
    <div className="equation-item flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <div className="text-left whitespace-pre-wrap">{content}</div>
        <button 
          className="delete-button ml-3 shrink-0"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>
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
    </div>
  );
};

export default KnowledgeBaseCard;
