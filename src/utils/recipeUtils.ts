import type { Meal, Recipe, RecipeCard, Ingredient, CombinedIngredient } from '../types/recipe';

export function mealToRecipeCard(meal: Meal): RecipeCard {
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory,
    area: meal.strArea,
    tags: meal.strTags ? meal.strTags.split(',').map(tag => tag.trim()) : undefined,
  };
}

export function mealToRecipe(meal: Meal): Recipe {
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    image: meal.strMealThumb,
    ingredients: extractIngredients(meal),
    tags: meal.strTags ? meal.strTags.split(',').map(tag => tag.trim()) : undefined,
    youtube: meal.strYoutube,
    source: meal.strSource,
  };
}

export function extractIngredients(meal: Meal): Ingredient[] {
  const ingredients: Ingredient[] = [];
  
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof Meal] as string;
    const measure = meal[`strMeasure${i}` as keyof Meal] as string;
    
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure ? measure.trim() : '',
      });
    }
  }
  
  return ingredients;
}

export function combineIngredients(recipes: Recipe[]): CombinedIngredient[] {
  const ingredientMap = new Map<string, string[]>();
  
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      const name = ingredient.name.toLowerCase();
      const existingMeasures = ingredientMap.get(name) || [];
      
      if (ingredient.measure) {
        existingMeasures.push(ingredient.measure);
      }
      
      ingredientMap.set(name, existingMeasures);
    });
  });
  
  return Array.from(ingredientMap.entries())
    .map(([name, measures]) => ({
      name: capitalizeFirst(name),
      measures,
      totalMeasure: measures.length > 1 ? `${measures.length} times` : measures[0] || '',
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function filterRecipesByCategory(recipes: RecipeCard[], category: string): RecipeCard[] {
  if (!category || category === 'All') {
    return recipes;
  }
  return recipes.filter(recipe => recipe.category === category);
}

export function getUniqueCategories(recipes: RecipeCard[]): string[] {
  const categories = new Set(recipes.map(recipe => recipe.category));
  return Array.from(categories).sort();
}

export function paginateRecipes(
  recipes: RecipeCard[], 
  currentPage: number, 
  recipesPerPage: number
): { recipes: RecipeCard[]; totalPages: number } {
  const startIndex = (currentPage - 1) * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  
  return {
    recipes: recipes.slice(startIndex, endIndex),
    totalPages: Math.ceil(recipes.length / recipesPerPage),
  };
}
