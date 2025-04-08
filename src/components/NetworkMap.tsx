
import React, { useEffect, useRef } from 'react';

const NetworkMap = () => {
  const networkRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!networkRef.current) return;
    
    const network = networkRef.current;
    const nodeCount = 20;
    const connectionCount = 40;
    const nodes: HTMLElement[] = [];
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      const node = document.createElement('div');
      node.className = 'network-node animate-pulse';
      const x = 10 + Math.random() * 80;
      const y = 10 + Math.random() * 80;
      node.style.left = `${x}%`;
      node.style.top = `${y}%`;
      node.style.animationDuration = `${1.5 + Math.random() * 1}s`;
      
      node.addEventListener('click', () => {
        const ripple = document.createElement('div');
        ripple.className = 'absolute rounded-full bg-quantum-accent/30 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-ripple';
        ripple.style.left = `${x}%`;
        ripple.style.top = `${y}%`;
        network.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 2000);
        
        highlightConnections();
      });
      
      network.appendChild(node);
      nodes.push(node);
    }
    
    // Create connections
    for (let i = 0; i < connectionCount; i++) {
      const connection = document.createElement('div');
      connection.className = 'network-connection';
      
      const node1 = nodes[Math.floor(Math.random() * nodes.length)];
      const node2 = nodes[Math.floor(Math.random() * nodes.length)];
      
      if (node1 !== node2) {
        const x1 = parseFloat(node1.style.left);
        const y1 = parseFloat(node1.style.top);
        const x2 = parseFloat(node2.style.left);
        const y2 = parseFloat(node2.style.top);
        
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        connection.style.width = `${length}%`;
        connection.style.left = `${x1}%`;
        connection.style.top = `${y1}%`;
        connection.style.transform = `rotate(${angle}deg)`;
        connection.style.opacity = (0.2 + Math.random() * 0.3).toString();
        
        network.appendChild(connection);
      }
    }
    
    function highlightConnections() {
      const connections = network.querySelectorAll('.network-connection');
      connections.forEach(conn => {
        (conn as HTMLElement).style.opacity = '0.1';
        (conn as HTMLElement).style.transition = 'opacity 0.3s';
      });
      
      setTimeout(() => {
        connections.forEach(conn => {
          (conn as HTMLElement).style.opacity = (0.2 + Math.random() * 0.3).toString();
        });
      }, 1000);
    }
    
    // Cleanup on unmount
    return () => {
      network.innerHTML = '';
    };
  }, []);
  
  return (
    <div 
      ref={networkRef} 
      className="w-full h-[400px] bg-quantum-primary/50 rounded-2xl relative overflow-hidden border border-white/10 mt-8"
    ></div>
  );
};

export default NetworkMap;
