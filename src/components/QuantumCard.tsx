
import React from 'react';
import { cn } from "@/lib/utils";

interface QuantumCardProps {
  title: string;
  description: string;
  buttonText: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
  animateOnClick?: boolean;
}

const QuantumCard = ({
  title,
  description,
  buttonText,
  icon,
  onClick,
  className,
  animateOnClick = false,
}: QuantumCardProps) => {
  const handleClick = () => {
    if (animateOnClick) {
      const card = document.querySelector(`.quantum-card.${title.replace(/\s+/g, '-').toLowerCase()}`);
      card?.classList.add('animate-pulse');
      setTimeout(() => {
        card?.classList.remove('animate-pulse');
      }, 1000);
    }
    onClick();
  };

  return (
    <div className={cn("quantum-card", title.replace(/\s+/g, '-').toLowerCase(), className)}>
      <div className="quantum-tag">‡</div>
      <h2 className="text-2xl font-bold mb-4 inline-block relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-10 after:h-[3px] after:bg-quantum-accent after:rounded-md">
        {title}
      </h2>
      <p className="leading-relaxed mb-6 opacity-90">
        {description}
      </p>
      <button 
        className="quantum-button"
        onClick={handleClick}
      >
        {icon}
        {buttonText}
      </button>
    </div>
  );
};

export default QuantumCard;
