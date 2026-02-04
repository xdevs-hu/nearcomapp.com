# GitHub Pages SPA Routing Fix

## Problem
Direct URLs like `nearcomapp.com/privacy` return 404 errors on GitHub Pages because:
- Your Vue.js app uses client-side routing with `createWebHistory()`
- GitHub Pages tries to find a physical file at `/privacy` path
- No file exists, so GitHub Pages returns 404

## Solution Implemented

### 1. Created `public/404.html`
This file intercepts 404 errors and redirects to the main app with the path encoded in the query string.

### 2. Updated `index.html`
Added a script that decodes the query string and restores the correct URL using `history.replaceState()`.

### 3. How It Works
1. User visits `nearcomapp.com/privacy`
2. GitHub Pages can't find `/privacy`, serves `404.html`
3. `404.html` redirects to `/?/privacy`
4. `index.html` loads, decodes `/?/privacy` back to `/privacy`
5. Vue Router handles the `/privacy` route correctly

## Deployment Steps

1. **Commit and push the changes:**
   ```bash
   git add public/404.html index.html
   git commit -m "Fix: Add GitHub Pages SPA routing support"
   git push origin main
   ```

2. **Wait for GitHub Actions to deploy** (check the Actions tab in your repository)

3. **Test the direct URL:** Visit `https://nearcomapp.com/privacy` directly

## Files Modified
- ✅ `public/404.html` - Created (handles 404 redirects)
- ✅ `index.html` - Updated (decodes redirected URLs)

## Technical Details
- Uses the [spa-github-pages](https://github.com/rafgraph/spa-github-pages) solution
- Works with custom domains and GitHub Pages
- No server-side configuration needed
- Compatible with Vue Router's `createWebHistory()` mode

## Verification
After deployment, test these URLs directly:
- `https://nearcomapp.com/` - Should work (home page)
- `https://nearcomapp.com/privacy` - Should work (privacy page)
- Browser back/forward buttons should work correctly
- Refresh on any route should work correctly
