# GitHub Deployment Guide

## Quick Setup for GitHub

### 1. Create Repository on GitHub

- Go to [GitHub](https://github.com/new)
- Repository name: `chatriyan-portfolio`
- Description: "Interactive portfolio web application with case studies"
- Choose public/private
- Do NOT initialize with README (we have one)
- Click "Create repository"

### 2. Initialize Git Locally

```bash
cd C:\Users\chatr\Downloads\chatriyan-portfolio

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Interactive portfolio with case studies"

# Add remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/chatriyan-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Verify on GitHub

Visit `https://github.com/YOUR-USERNAME/chatriyan-portfolio` and confirm all files are there.

## Project Structure Overview

```
chatriyan-portfolio/
├── .claude/                 # Claude Code configuration
│   ├── launch.json         # Dev server setup
│   └── settings.local.json
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
├── README.md               # Project documentation
├── SETUP.md                # Development guide
├── GITHUB_DEPLOYMENT.md    # This file
├── package.json            # Dependencies & scripts
├── package-lock.json       # Locked versions
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite bundler config
├── index.html              # Entry HTML
│
├── src/                    # Source code
│   ├── main.tsx            # App entry point
│   ├── app/
│   │   └── App.tsx         # Root component
│   ├── components/         # React components
│   │   ├── DraggableWorkspace.tsx    # Main canvas
│   │   ├── ContactBoard.tsx          # Contact section
│   │   ├── PhilosophyCard.tsx        # Philosophy viz
│   │   ├── PortfolioFolder.tsx       # Case studies
│   │   └── career-passport/         # Career section
│   ├── assets/             # Images & media
│   │   ├── linkedin-avatar.jpg
│   │   └── gamer-room-sticker.png
│   └── styles/             # CSS styles
│       └── index.css
│
└── public/                 # Static files
    └── case-studies/
        └── youtube-shorts/ # Embedded case study
            ├── index.html
            └── assets/     # Case study images
```

## Key Files to Know

| File | Purpose |
|------|---------|
| `package.json` | Dependencies & npm scripts |
| `vite.config.ts` | Build configuration |
| `src/components/DraggableWorkspace.tsx` | Main workspace logic |
| `public/case-studies/youtube-shorts/` | Embedded case study |
| `.env.example` | Environment template |

## Common Git Commands

```bash
# Check status
git status

# Add changes
git add .
git add src/components/SomeFile.tsx  # Single file

# Commit
git commit -m "feat: add new feature"
git commit -m "fix: fix bug in component"
git commit -m "docs: update README"

# Push to GitHub
git push

# Create new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main
git checkout feature/new-feature

# Pull latest
git pull origin main

# View history
git log --oneline
```

## Commit Message Convention

Follow this format for clear history:

```
type(scope): description

feat(workspace): add new card type
fix(contact): resolve email link bug
docs(readme): update setup instructions
style(components): format code
refactor(workspace): reorganize card layout
test(components): add unit tests
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Updating from Local

1. Make changes locally
2. Test with `npm run dev`
3. Commit changes: `git commit -m "..."`
4. Push to GitHub: `git push`

That's it! GitHub will update automatically.

## Branching Strategy

```
main/          ← Production-ready
  ↑
feature/*      ← Feature branches
  ↓
```

**For simple projects, just use `main` branch:**
```bash
# Make changes, commit, and push
git add .
git commit -m "feat: your change"
git push origin main
```

## GitHub Features to Enable

1. **Settings → General**
   - Description
   - Website (if deployed)
   - Topics: `portfolio`, `react`, `design`, `case-study`

2. **Settings → Pages**
   - Deploy from: GitHub Actions or manual
   - Source: `main` branch, `/dist` folder

3. **Settings → Code security**
   - Enable Dependabot alerts
   - Enable automated security updates

## Deployment Options

### Option 1: Vercel (Recommended)
1. Connect GitHub repo to [Vercel](https://vercel.com)
2. Import project
3. Set environment variables (from `.env.example`)
4. Deploy automatically on push

### Option 2: Netlify
1. Connect GitHub repo to [Netlify](https://netlify.com)
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push

### Option 3: GitHub Pages
```bash
# Update vite.config.ts with base path
# base: '/chatriyan-portfolio/'

npm run build
# Upload dist/ to gh-pages branch
```

## Troubleshooting

### Push rejected
```bash
git pull origin main
git push origin main
```

### Large files not pushing
Check `.gitignore` - node_modules and dist/ should be ignored.

### Want to remove sensitive data?
```bash
git rm --cached .env
git add .gitignore
git commit -m "Remove .env from tracking"
```

## What NOT to Commit

- `.env` (use `.env.example` as template)
- `node_modules/` (recreate with `npm install`)
- `dist/` (rebuild with `npm run build`)
- `.DS_Store` (already in .gitignore)
- `*.log` files

These are already in `.gitignore` ✓

---

**You're ready to push to GitHub! 🚀**
