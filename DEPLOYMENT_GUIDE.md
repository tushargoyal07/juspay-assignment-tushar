# Deployment Guide

## Vercel Deployment (Recommended)

### 1. Prepare for Deployment
```bash
# Build the project locally to check for errors
npm run build

# Run tests to ensure everything works
npm run test:all
```

### 2. Deploy to Vercel

#### Option A: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name: figma-dashboard
# - Directory: ./
# - Override settings? N
```

#### Option B: GitHub Integration
1. Push code to GitHub repository
2. Connect GitHub repo to Vercel
3. Vercel will auto-deploy on every push

### 3. Environment Variables
No environment variables needed for this project (uses mock data).

### 4. Custom Domain (Optional)
- Go to Vercel dashboard
- Select your project
- Go to Settings > Domains
- Add your custom domain

## Alternative Deployment Options

### Netlify
```bash
# Build command
npm run build

# Publish directory
out

# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=out
```

### GitHub Pages
```bash
# Add to package.json
"homepage": "https://yourusername.github.io/figma-dashboard"

# Install gh-pages
npm i -D gh-pages

# Add deploy script
"deploy": "gh-pages -d out"

# Deploy
npm run deploy
```

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test responsive design on mobile
- [ ] Check all interactive features
- [ ] Verify charts and data visualization
- [ ] Test navigation and routing
- [ ] Check theme switching
- [ ] Verify notification system
- [ ] Test order management features

## Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deployment Issues
- Check Vercel build logs
- Ensure all dependencies are in package.json
- Verify TypeScript compilation
- Check for missing environment variables

### Performance Issues
- Enable Vercel Analytics
- Check Core Web Vitals
- Optimize images and assets
- Review bundle size
