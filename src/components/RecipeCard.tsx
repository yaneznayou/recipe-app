import { Link } from 'react-router-dom'
import type { RecipeCard as RecipeCardType } from '../types/recipe'
import { useSelectedRecipes } from '../hooks/useSelectedRecipes'

interface RecipeCardProps {
  recipe: RecipeCardType
  showFavoriteButton?: boolean
}

export default function RecipeCard({ recipe, showFavoriteButton = true }: RecipeCardProps) {
  const { isSelected, toggleRecipe } = useSelectedRecipes()
  const isFavorite = isSelected(recipe.id)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleRecipe(recipe.id)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/recipe/${recipe.id}`} className="block">
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          {showFavoriteButton && (
            <button
              onClick={handleFavoriteClick}
              className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
                isFavorite
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-white text-gray-400 hover:text-red-500 hover:bg-gray-50'
              }`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {recipe.name}
          </h3>
          
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="font-medium">Category:</span>
              <span className="ml-2">{recipe.category}</span>
            </div>
            
            <div className="flex items-center">
              <span className="font-medium">Cuisine:</span>
              <span className="ml-2">{recipe.area}</span>
            </div>
          </div>
          
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {recipe.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
              {recipe.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{recipe.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}
