import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelectedRecipes } from '../hooks/useSelectedRecipes'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const { count } = useSelectedRecipes()

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link 
                to="/recipes" 
                className="text-xl font-bold text-gray-900 hover:text-gray-700"
              >
                🍳 Recipe App
              </Link>
              
              <div className="flex space-x-4">
                <Link
                  to="/recipes"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/recipes')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  All Recipes
                </Link>
                
                <Link
                  to="/selected"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                    isActive('/selected')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Favorites
                  {count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {count}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
