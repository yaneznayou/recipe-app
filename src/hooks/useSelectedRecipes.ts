import { useState, useEffect } from 'react';
import { 
  getSelectedRecipes, 
  addToSelected, 
  removeFromSelected, 
  isRecipeSelected 
} from '../utils/localStorage';

export function useSelectedRecipes() {
  const [selectedRecipeIds, setSelectedRecipeIds] = useState<string[]>(() => 
    getSelectedRecipes()
  );

  const addRecipe = (recipeId: string) => {
    addToSelected(recipeId);
    setSelectedRecipeIds(prev => 
      prev.includes(recipeId) ? prev : [...prev, recipeId]
    );
  };

  const removeRecipe = (recipeId: string) => {
    removeFromSelected(recipeId);
    setSelectedRecipeIds(prev => prev.filter(id => id !== recipeId));
  };

  const toggleRecipe = (recipeId: string) => {
    if (isRecipeSelected(recipeId)) {
      removeRecipe(recipeId);
    } else {
      addRecipe(recipeId);
    }
  };

  const isSelected = (recipeId: string) => selectedRecipeIds.includes(recipeId);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'selectedRecipes') {
        setSelectedRecipeIds(getSelectedRecipes());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    selectedRecipeIds,
    addRecipe,
    removeRecipe,
    toggleRecipe,
    isSelected,
    count: selectedRecipeIds.length,
  };
}
