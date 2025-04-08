
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface GreatMindCardProps {
  id: number;
  name: string;
  era: string;
  field: string;
  contribution: string;
  quote: string;
  influence?: string;
  onClick?: () => void;
}

const GreatMindCard = ({ 
  id, 
  name, 
  era, 
  field, 
  contribution, 
  quote, 
  influence,
  onClick 
}: GreatMindCardProps) => {
  // Get initials for avatar
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <Card 
      className="bg-white/10 hover:bg-white/15 transition-colors duration-300 border-white/10 cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12 bg-quantum-accent text-black">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{name}</h3>
            <div className="flex flex-wrap gap-2 mt-1 mb-2">
              <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">{era}</span>
              <span className="bg-quantum-accent/20 text-xs px-2 py-0.5 rounded-full">{field}</span>
            </div>
            <p className="text-sm text-white/80 mb-2">{contribution}</p>
            <p className="text-sm italic text-quantum-accent/90 border-l-2 border-quantum-accent/30 pl-3">"{quote}"</p>
            {influence && (
              <p className="text-xs text-white/60 mt-2">Influence: {influence}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GreatMindCard;
