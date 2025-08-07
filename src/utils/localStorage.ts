const SELECTED_RECIPES_KEY = 'selectedRecipes';

export function getSelectedRecipes(): string[] {
  try {
    const stored = localStorage.getItem(SELECTED_RECIPES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading selected recipes from localStorage:', error);
    return [];
  }
}

export function saveSelectedRecipes(recipeIds: string[]): void {
  try {
    localStorage.setItem(SELECTED_RECIPES_KEY, JSON.stringify(recipeIds));
  } catch (error) {
    console.error('Error saving selected recipes to localStorage:', error);
  }
}

export function addToSelected(recipeId: string): void {
  const selected = getSelectedRecipes();
  if (!selected.includes(recipeId)) {
    selected.push(recipeId);
    saveSelectedRecipes(selected);
  }
}

export function removeFromSelected(recipeId: string): void {
  const selected = getSelectedRecipes();
  const filtered = selected.filter(id => id !== recipeId);
  saveSelectedRecipes(filtered);
}

export function isRecipeSelected(recipeId: string): boolean {
  const selected = getSelectedRecipes();
  return selected.includes(recipeId);
}

export function clearSelectedRecipes(): void {
  try {
    localStorage.removeItem(SELECTED_RECIPES_KEY);
  } catch (error) {
    console.error('Error clearing selected recipes from localStorage:', error);
  }
}
