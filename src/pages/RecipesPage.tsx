import { useState, useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { apiService } from '../services/api'
import { mealToRecipeCard, filterRecipesByCategory, getUniqueCategories, paginateRecipes } from '../utils/recipeUtils'
import { useDebounce } from '../hooks/useDebounce'
import RecipeCard from '../components/RecipeCard'
import RecipeCardSkeleton from '../components/RecipeCardSkeleton'
import ErrorMessage from '../components/ErrorMessage'
import Pagination from '../components/Pagination'
import LoadingSpinner from '../components/LoadingSpinner'

const RECIPES_PER_PAGE = 12

export default function RecipesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const { data: searchData, isLoading: isSearchLoading, error: searchError, refetch } = useQuery({
    queryKey: ['recipes', 'search', debouncedSearchQuery],
    queryFn: async () => {
      if (debouncedSearchQuery.trim()) {
        return await apiService.searchMeals(debouncedSearchQuery)
      } else {
        return await apiService.getRandomMeals(50)
      }
    },
    enabled: true,
    staleTime: 5 * 60 * 1000,
  })

  const allRecipes = useMemo(() => {
    if (!searchData?.meals) return []
    return searchData.meals.map(mealToRecipeCard)
  }, [searchData])

  const availableCategories = useMemo(() => {
    const recipesCategories = getUniqueCategories(allRecipes)
    return ['All', ...recipesCategories]
  }, [allRecipes])

  const filteredRecipes = useMemo(() => {
    return filterRecipesByCategory(allRecipes, selectedCategory)
  }, [allRecipes, selectedCategory])

  const { recipes: paginatedRecipes, totalPages } = useMemo(() => {
    return paginateRecipes(filteredRecipes, currentPage, RECIPES_PER_PAGE)
  }, [filteredRecipes, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchQuery, selectedCategory])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Recipe Collection
        </h1>
        <p className="text-gray-600">
          Find the perfect recipe for any occasion
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Recipes
            </label>
            <div className="relative">
              <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter dish name..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {isSearchLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <LoadingSpinner size="sm" />
                </div>
              )}
            </div>
          </div>

          <div className="md:w-64">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category === 'All' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {allRecipes.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            Found recipes: {filteredRecipes.length}
            {selectedCategory !== 'All' && (
              <span className="ml-2">
                in category "{selectedCategory}"
              </span>
            )}
          </div>
        )}
      </div>

      {searchError ? (
        <ErrorMessage 
          message={searchError instanceof Error ? searchError.message : 'An error occurred while loading recipes'}
          onRetry={() => refetch()}
        />
      ) : isSearchLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: RECIPES_PER_PAGE }).map((_, index) => (
            <RecipeCardSkeleton key={index} />
          ))}
        </div>
      ) : paginatedRecipes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No recipes found
          </h3>
          <p className="text-gray-500">
            {searchQuery 
              ? `Nothing found for "${searchQuery}". Try a different search.`
              : 'Try changing filters or perform a search.'
            }
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  )
}
