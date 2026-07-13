# Setup & Development Guide

## Initial Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/chatriyan-portfolio.git
cd chatriyan-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your contact details

## Development Workflow

### Start Dev Server
```bash
npm run dev
```
Server runs on `http://localhost:5173` with hot module reloading.

### Available Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint (if configured)

## Card Positioning Guide

Edit positions in `src/components/DraggableWorkspace.tsx`:

### Card Layout
- **Greeting** (0, -370) — Top center
- **About Me** (-180, 0) — Left middle
- **Career Passport** (180, 0) — Right middle  
- **Case Studies** (700, -320) — Right top
- **Contact Board** (-750, 480) — Left bottom
- **Tools Orbit** (800, 380) — Right bottom
- **Philosophy** (-680, 50) — Left center
- **Sticker** (-450, -370) — Left top

### Navigation Targets
Update `panTo` coordinates in nav buttons to focus on specific sections.

## Case Study Updates

### YouTube Shorts Case Study

The case study is a separate built React app embedded at `/case-studies/youtube-shorts/`.

**To modify:**
1. Edit source in `public/case-studies/youtube-shorts/` (if needed)
2. Rebuild and redeploy
3. Update main portfolio: `npm run build`

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes
git add .
git commit -m "feat: description of changes"

# Push to GitHub
git push origin feature/your-feature

# Create Pull Request on GitHub
```

## Deployment

### Static Hosting (Vercel, Netlify, GitHub Pages)

1. Build the project:
```bash
npm run build
```

2. Deploy `dist/` folder to your hosting service

### Environment Variables
Set `VITE_*` variables in your hosting platform's environment settings.

## Troubleshooting

### Port Already in Use
```bash
# Use different port
npm run dev -- --port 3000
```

### Build Size Issues
- Check Vite's bundle analysis
- Consider code-splitting large components
- Optimize images in assets

### Hot Reload Not Working
- Clear node_modules: `rm -rf node_modules && npm install`
- Restart dev server
- Check Vite config

## Browser Support

- Modern browsers with ES2020 support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Performance Tips

- Use React DevTools Profiler for component performance
- Lazy load heavy components with React.lazy()
- Optimize images with appropriate formats (WebP, AVIF)
- Monitor bundle size with Vite's build analyzer
