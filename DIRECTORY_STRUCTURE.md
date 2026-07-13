# Directory Structure

```
chatriyan-portfolio/
│
├── 📄 .env.example                 # Environment variables template
├── 📄 .gitignore                   # Git ignore rules
├── 📄 README.md                    # Main documentation
├── 📄 SETUP.md                     # Development guide
├── 📄 GITHUB_DEPLOYMENT.md         # GitHub push instructions
├── 📄 PROJECT_SUMMARY.txt          # Quick reference
├── 📄 DIRECTORY_STRUCTURE.md       # This file
│
├── 📄 package.json                 # Dependencies & scripts
├── 📄 package-lock.json            # Locked versions
├── 📄 index.html                   # HTML entry point
├── 📄 tsconfig.json                # TypeScript config
├── 📄 vite.config.ts               # Vite bundler config
│
├── .claude/                        # Claude Code config
│   ├── launch.json                 # Dev server setup
│   └── settings.local.json         # IDE settings
│
├── src/                            # Source code
│   ├── main.tsx                    # App entry point
│   ├── app/
│   │   └── App.tsx                 # Root component
│   │
│   ├── components/                 # React components
│   │   ├── DraggableWorkspace.tsx          # Main canvas (draggable cards)
│   │   ├── ContactBoard.tsx                # Let's Connect section
│   │   ├── PhilosophyCard.tsx              # Design philosophy
│   │   ├── PortfolioFolder.tsx             # Case studies folder
│   │   └── career-passport/                # Career section
│   │       ├── CareerPassport.tsx
│   │       └── ... (career components)
│   │
│   ├── assets/                     # Images & media
│   │   ├── linkedin-avatar.jpg     # Profile photo
│   │   ├── gamer-room-sticker.png  # Canvas sticker
│   │   └── ... (other assets)
│   │
│   └── styles/                     # CSS
│       └── index.css               # Global styles
│
└── public/                         # Static files
    └── case-studies/               # Embedded case studies
        └── youtube-shorts/         # YouTube Shorts case study
            ├── index.html          # Case study entry
            ├── assets/             # Case study images
            │   ├── mockups/        # Device mockups
            │   ├── icons/          # UI icons
            │   └── ... (other assets)
            └── styles/             # Case study styles
```

## Directory Descriptions

### Root Level
- **Configuration & Package files** - All build and dependency configs
- **Documentation** - README, SETUP, and deployment guides
- **.claude/** - Claude Code IDE configuration (dev server setup)

### src/ (Source Code)
- **app/** - Main application component and layout
- **components/** - Reusable React components for different sections
- **assets/** - Images, icons, and media files
- **styles/** - Global CSS and utility styles

### public/ (Static Assets)
- **case-studies/** - Embedded interactive case study applications
- Each case study is a built React app (e.g., youtube-shorts)

## File Size Breakdown

| Category | Size | Note |
|----------|------|------|
| Source code | ~50 KB | React components & logic |
| Assets | ~700 KB | Images, stickers |
| Case studies | ~800 KB | Embedded app + images |
| Configuration | ~10 KB | JSON, TS config files |
| **Total** | **~1.5 MB** | (without node_modules) |

## Key Component Breakdown

### DraggableWorkspace.tsx (Core)
- Infinite canvas with pan/zoom
- All draggable card definitions
- Navigation logic
- Responsive filtering

### ContactBoard.tsx
- LinkedIn integration
- WhatsApp/Email links
- Profile information

### PortfolioFolder.tsx
- Case study project cards
- Animated folder opening
- Project URL routing

### YouTube Case Study
- Full product discovery design doc
- Interactive mockups
- Research findings
- Design iterations

## Git Tracking

### Included ✓
- All source code
- All documentation
- Configuration files
- Public assets
- .env.example (template, no secrets)

### Excluded (via .gitignore)
- node_modules/ (recreate with npm install)
- dist/ (rebuild with npm run build)
- .env (use .env.example)
- .DS_Store, *.log, etc.

---

**All files are organized and ready for GitHub! 🚀**
