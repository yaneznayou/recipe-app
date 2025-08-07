import { useMemo } from 'react'
import { useQueries } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { apiService } from '../services/api'
import { mealToRecipe, mealToRecipeCard, combineIngredients } from '../utils/recipeUtils'
import { useSelectedRecipes } from '../hooks/useSelectedRecipes'
import RecipeCard from '../components/RecipeCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

export default function SelectedRecipesPage() {
  const { selectedRecipeIds, removeRecipe } = useSelectedRecipes()

  const recipeQueries = useQueries({
    queries: selectedRecipeIds.map(id => ({
      queryKey: ['recipe', id],
      queryFn: async () => {
        const response = await apiService.getMealById(id)
        if (!response.meals?.[0]) throw new Error(`Recipe ${id} not found`)
        return response.meals[0]
      },
      staleTime: 5 * 60 * 1000,
    }))
  })

  const isLoading = recipeQueries.some(query => query.isLoading)
  const hasErrors = recipeQueries.some(query => query.error)
  const allLoaded = recipeQueries.every(query => query.data)

  const loadedRecipes = useMemo(() => {
    return recipeQueries
      .filter(query => query.data)
      .map(query => mealToRecipe(query.data!))
  }, [recipeQueries])

  const recipeCards = useMemo(() => {
    return recipeQueries
      .filter(query => query.data)
      .map(query => mealToRecipeCard(query.data!))
  }, [recipeQueries])

  const combinedIngredients = useMemo(() => {
    return combineIngredients(loadedRecipes)
  }, [loadedRecipes])

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all favorite recipes?')) {
      selectedRecipeIds.forEach(id => removeRecipe(id))
    }
  }

  if (selectedRecipeIds.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">💔</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          No favorite recipes
        </h2>
        <p className="text-gray-600 mb-6">
          Add recipes to favorites to see them here
        </p>
        <Link
          to="/recipes"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Find Recipes
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Favorite Recipes
          </h1>
          <p className="text-gray-600 mt-2">
            You have {selectedRecipeIds.length} favorite recipes
          </p>
        </div>
        
        {selectedRecipeIds.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {hasErrors && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <div className="text-yellow-400 mr-3">⚠️</div>
            <div>
              <h3 className="text-sm font-medium text-yellow-800">
                Some recipes failed to load
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                Try refreshing the page or check your internet connection
              </p>
            </div>
          </div>
        </div>
      )}

      {recipeCards.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Your Recipes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipeCards.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      )}

      {combinedIngredients.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Shopping List ({combinedIngredients.length} ingredients)
          </h2>
          <p className="text-gray-600 mb-4">
            Combined list of all ingredients from your favorite recipes
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {combinedIngredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900">
                  {ingredient.name}
                </span>
                <div className="text-sm text-gray-600">
                  {ingredient.measures.length > 1 ? (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {ingredient.measures.length}x
                    </span>
                  ) : (
                    <span>{ingredient.measures[0] || 'to taste'}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => {
                const list = combinedIngredients
                  .map(ing => `• ${ing.name}${ing.measures[0] ? ` - ${ing.measures[0]}` : ''}`)
                  .join('\n')
                
                navigator.clipboard.writeText(list).then(() => {
                  alert('Shopping list copied to clipboard!')
                }).catch(() => {
                  alert('Failed to copy list')
                })
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              📋 Copy List
            </button>
          </div>
        </div>
      )}

      {loadedRecipes.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Cooking Instructions
          </h2>
          
          <div className="space-y-8">
            {loadedRecipes.map((recipe, index) => (
              <div key={recipe.id} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {index + 1}. {recipe.name}
                  </h3>
                  <Link
                    to={`/recipe/${recipe.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Details →
                  </Link>
                </div>
                
                <div className="prose prose-sm max-w-none text-gray-700">
                  {recipe.instructions.split('\n').filter(Boolean).slice(0, 3).map((paragraph, pIndex) => (
                    <p key={pIndex} className="mb-2">
                      {paragraph}
                    </p>
                  ))}
                  {recipe.instructions.split('\n').filter(Boolean).length > 3 && (
                    <p className="text-gray-500 italic">
                      ... <Link to={`/recipe/${recipe.id}`} className="text-blue-600">read more</Link>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
