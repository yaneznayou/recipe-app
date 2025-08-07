import type { MealsResponse, MealResponse, CategoriesResponse } from '../types/recipe';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

class ApiService {
  async searchMeals(query: string): Promise<MealsResponse> {
    const response = await fetch(`${API_BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  }

  async getMealById(id: string): Promise<MealResponse> {
    const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  }

  async getRandomMeals(count: number = 1): Promise<MealsResponse> {
    const promises = Array.from({ length: count }, () =>
      fetch(`${API_BASE_URL}/random.php`).then(res => res.json())
    );
    
    const results = await Promise.all(promises);
    const meals = results.flatMap(result => result.meals || []);
    
    return { meals };
  }

  async getCategories(): Promise<CategoriesResponse> {
    const response = await fetch(`${API_BASE_URL}/list.php?c=list`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  }

  async getMealsByCategory(category: string): Promise<MealsResponse> {
    const response = await fetch(`${API_BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  }

  async getMealsByArea(area: string): Promise<MealsResponse> {
    const response = await fetch(`${API_BASE_URL}/filter.php?a=${encodeURIComponent(area)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  }
}

export const apiService = new ApiService();
