
interface Equation {
  id: number;
  content: string;
}

class QuantumEquationService {
  private triggerUpdate() {
    // Dispatch a custom event to notify components to refresh
    window.dispatchEvent(new Event('equationsUpdated'));
  }

  public getAll(): Equation[] {
    try {
      return JSON.parse(localStorage.getItem('savedEquations') || '[]');
    } catch (error) {
      console.error('Error loading equations:', error);
      return [];
    }
  }

  public save(equation: string): number {
    try {
      const savedEquations = this.getAll();
      const nextId = savedEquations.length > 0 
        ? Math.max(...savedEquations.map(eq => eq.id)) + 1 
        : 1;
      
      savedEquations.push({ id: nextId, content: equation });
      localStorage.setItem('savedEquations', JSON.stringify(savedEquations));
      this.triggerUpdate();
      return nextId;
    } catch (error) {
      console.error('Error saving equation:', error);
      return -1;
    }
  }

  public delete(id: number): boolean {
    try {
      const savedEquations = this.getAll();
      const filteredEquations = savedEquations.filter(eq => eq.id !== id);
      localStorage.setItem('savedEquations', JSON.stringify(filteredEquations));
      this.triggerUpdate();
      return true;
    } catch (error) {
      console.error('Error deleting equation:', error);
      return false;
    }
  }
}

export default new QuantumEquationService();
