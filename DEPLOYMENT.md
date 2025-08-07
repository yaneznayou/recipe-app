# 🚀 Deployment Guide

This guide will help you deploy the Recipe App to GitHub Pages.

## Prerequisites

- A GitHub account
- Node.js and npm installed
- Git installed

## Step 1: Fork or Clone the Repository

1. **Fork** this repository to your GitHub account, or
2. **Clone** the repository if you own it:
   ```bash
   git clone https://github.com/yaneznayou/recipe-app.git
   cd recipe-app
   ```

## Step 2: Update Configuration

1. **Update the homepage** in `package.json`:
   ```json
   {
     "homepage": "https://yaneznayou.github.io/recipe-app"
   }
   ```

2. **Update the base path** in `vite.config.ts`:
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/recipe-app/',
   })
   ```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Deploy to GitHub Pages

### Option 1: Manual Deployment

```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### Option 2: Automatic Deployment with GitHub Actions

1. **Push your changes** to the main branch:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Enable GitHub Pages** in your repository settings:
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to "Pages" in the left sidebar
   - Under "Source", select "Deploy from a branch"
   - Choose "gh-pages" branch and "/ (root)" folder
   - Click "Save"

3. **The GitHub Actions workflow** will automatically:
   - Build the project
   - Deploy to GitHub Pages
   - Make it available at `https://yaneznayou.github.io/recipe-app`

## Step 5: Verify Deployment

1. Wait a few minutes for the deployment to complete
2. Visit `https://yaneznayou.github.io/recipe-app`
3. Your app should be live!

## Troubleshooting

### Common Issues

1. **404 Error**: Make sure the base path in `vite.config.ts` matches your repository name
2. **Build Failures**: Check the GitHub Actions logs for any build errors
3. **Routing Issues**: Ensure React Router is configured for the correct base path

### Manual Deployment Issues

If automatic deployment fails:

1. **Check the gh-pages branch** exists:
   ```bash
   git branch -a
   ```

2. **Force deploy**:
   ```bash
   npm run deploy -- --force
   ```

3. **Clear cache** and redeploy:
   ```bash
   rm -rf node_modules
   npm install
   npm run deploy
   ```

## Custom Domain (Optional)

To use a custom domain:

1. **Add a CNAME file** in the `public` folder:
   ```
   your-domain.com
   ```

2. **Update DNS settings** to point to `yaneznayou.github.io`

3. **Update the homepage** in `package.json`:
   ```json
   {
     "homepage": "https://your-domain.com"
   }
   ```

## Support

If you encounter any issues:

1. Check the [GitHub Pages documentation](https://pages.github.com/)
2. Review the GitHub Actions logs
3. Open an issue in this repository

---

Happy deploying! 🎉
