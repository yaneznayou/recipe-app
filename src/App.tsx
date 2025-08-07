import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import RecipesPage from './pages/RecipesPage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import SelectedRecipesPage from './pages/SelectedRecipesPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/recipes" replace />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route path="/selected" element={<SelectedRecipesPage />} />
      </Routes>
    </Layout>
  )
}

export default App
