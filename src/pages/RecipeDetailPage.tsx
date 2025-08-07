import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { apiService } from '../services/api'
import { mealToRecipe } from '../utils/recipeUtils'
import { useSelectedRecipes } from '../hooks/useSelectedRecipes'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { isSelected, toggleRecipe } = useSelectedRecipes()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['recipe', id],
    queryFn: async () => {
      if (!id) throw new Error('Recipe ID is required')
      const response = await apiService.getMealById(id)
      if (!response.meals?.[0]) throw new Error('Recipe not found')
      return mealToRecipe(response.meals[0])
    },
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <ErrorMessage 
        message={error instanceof Error ? error.message : 'Recipe not found'}
        onRetry={() => refetch()}
      />
    )
  }

  const isFavorite = isSelected(data.id)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          to="/recipes" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← Back to Recipes
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={data.image}
              alt={data.name}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>

          <div className="md:w-1/2 p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {data.name}
              </h1>
              
              <button
                onClick={() => toggleRecipe(data.id)}
                className={`p-3 rounded-full transition-colors ${
                  isFavorite
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-100 text-gray-400 hover:text-red-500 hover:bg-gray-50'
                }`}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-600">
                <span className="font-medium mr-2">Category:</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {data.category}
                </span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <span className="font-medium mr-2">Cuisine:</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {data.area}
                </span>
              </div>
            </div>

            {data.tags && data.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {data.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              {data.youtube && (
                <a
                  href={data.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  YouTube Video
                </a>
              )}
              
              {data.source && (
                <a
                  href={data.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  Source
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Ingredients ({data.ingredients.length})
          </h2>
          <ul className="space-y-2">
            {data.ingredients.map((ingredient, index) => (
              <li key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <span className="text-gray-700">{ingredient.name}</span>
                <span className="text-gray-500 text-sm font-medium">
                  {ingredient.measure || 'to taste'}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Cooking Instructions
          </h2>
          <div className="prose prose-sm max-w-none text-gray-700">
            {data.instructions.split('\n').filter(Boolean).map((paragraph, index) => (
              <p key={index} className="mb-3 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
