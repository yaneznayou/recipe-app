# 🍳 Recipe App

Modern web application for searching and managing recipes, built with React, TypeScript, Tanstack Query and TheMealDB API.

## 🌐 Live Demo

**[🚀 View Live Demo](https://yaneznayou.github.io/recipe-app/)**

## ✨ Features

### 🔍 Search and Filtering
- **Search by name** with debounce for optimized requests
- **Category filtering** on the client side
- **Pagination** for convenient viewing of large numbers of recipes

### 📖 Recipe Viewing
- **Recipe cards** with image, name, category and region
- **Detailed recipe page** with complete information:
  - List of ingredients with proportions
  - Step-by-step cooking instructions
  - Links to videos and sources
  - Tags and categories

### ❤️ Favorite Recipes
- **Add/remove** recipes to favorites
- **Local storage** of favorite recipes
- **Combined ingredient list** from all favorite recipes
- **Shopping list** with copy functionality
- **Cooking instructions** for all favorite recipes

## 🛠 Tech Stack

- **Frontend:** React 18 with TypeScript
- **Build Tool:** Vite
- **Routing:** React Router v6
- **State Management:** Tanstack Query (React Query)
- **API:** TheMealDB API
- **Styling:** TailwindCSS
- **Debounce:** Custom hook
- **Data Storage:** localStorage

## 🚀 Quick Start

### Installation
```bash
# Clone repository
git clone <repository-url>
cd recipe-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
# Create build
npm run build

# Preview build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Layout.tsx       # Main layout with navigation
│   ├── RecipeCard.tsx   # Recipe card
│   ├── Pagination.tsx   # Pagination component
│   ├── LoadingSpinner.tsx
│   ├── RecipeCardSkeleton.tsx
│   └── ErrorMessage.tsx
├── pages/              # Application pages
│   ├── RecipesPage.tsx      # Main page with recipes
│   ├── RecipeDetailPage.tsx # Recipe detail page
│   └── SelectedRecipesPage.tsx # Favorites page
├── hooks/              # Custom hooks
│   ├── useSelectedRecipes.ts # Favorites management
│   └── useDebounce.ts       # Search debounce
├── services/           # API services
│   └── api.ts          # TheMealDB API interaction
├── types/              # TypeScript types
│   └── recipe.ts       # Recipe and API types
├── utils/              # Utilities
│   ├── recipeUtils.ts   # Recipe data processing
│   └── localStorage.ts  # localStorage operations
└── main.tsx            # Entry point
```

## 🔗 API

The application uses [TheMealDB API](https://www.themealdb.com/api.php) for recipe data:

- `search.php?s={query}` - search recipes by name
- `lookup.php?i={id}` - get recipe by ID
- `random.php` - random recipe
- `list.php?c=list` - list of categories
- `filter.php?c={category}` - recipes by category

## 🎨 Design

- **Responsive design** for all devices
- **Modern UI** using TailwindCSS
- **Smooth animations** and transitions
- **Skeleton loading** for improved UX
- **Error states** with retry functionality

## ⚡ Optimizations

- **React Query caching** to minimize API requests
- **Search debounce** (500ms) to reduce API load
- **Lazy image loading** with loading="lazy"
- **Client-side pagination** for fast navigation
- **localStorage** for instant access to favorites

## 🚀 Deployment

### GitHub Pages (Recommended)

#### Quick Deployment

1. **Fork or clone** this repository
2. **Update configuration**:
   - Replace `yaneznayou` in `package.json` homepage field
   - Replace `yaneznayou` in `vite.config.ts` base path
3. **Install dependencies**: `npm install`
4. **Deploy**: `npm run deploy`

#### Detailed Setup

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Alternative Platforms

#### Vercel
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm run build
# Upload the contents of the dist folder
```

## 🔧 GitHub Pages Setup

1. **Fork or clone** this repository
2. **Update the homepage** in `package.json`:
   ```json
   {
     "homepage": "https://yaneznayou.github.io/recipe-app"
   }
   ```
3. **Update the base path** in `vite.config.ts`:
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/recipe-app/',
   })
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```
6. **Enable GitHub Pages** in your repository settings:
   - Go to Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

### Automatic Deployment

The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages on every push to the main branch.

## 🌟 Future Improvements

- [ ] Add ratings and reviews
- [ ] Support for creating custom recipes
- [ ] Weekly menu planner
- [ ] Calorie calculator
- [ ] Dark theme support
- [ ] Export shopping list to PDF
- [ ] Social features (recipe sharing)

## 📝 License

MIT License

## 🤝 Contributing

Pull Requests and Issues are welcome to improve the application!

---

Built with ❤️ using React, TypeScript and TailwindCSS