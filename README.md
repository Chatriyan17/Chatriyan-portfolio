# Chatriyan's Interactive Portfolio

A modern, interactive portfolio web application built with React, Vite, and Tailwind CSS. Features an infinite-canvas draggable workspace with multiple project case studies, including an in-depth YouTube Shorts product discovery case study.

## ✨ Features

- **Infinite Canvas Workspace** — Drag and interact with card-based sections across a large canvas
- **Interactive Sections:**
  - Greeting/Introduction
  - About Me (Notebook-style)
  - Career Passport
  - Case Studies Folder (with embedded projects)
  - Let's Connect (Contact Board)
  - Design Philosophy
  - Tools & Skills Orbit
- **Embedded Case Studies** — Full interactive case study pages (e.g., YouTube Shorts)
- **Responsive Design** — Mobile and desktop optimized
- **Smooth Animations** — Powered by Framer Motion

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your details
# Edit VITE_LINKEDIN_PROFILE, VITE_WHATSAPP_NUMBER, VITE_EMAIL_ADDRESS
```

### Development

```bash
# Start dev server
npm run dev

# Server runs on http://localhost:5173
```

### Build & Deploy

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
src/
├── app/
│   └── App.tsx              # Main application component
├── components/
│   ├── DraggableWorkspace.tsx    # Main canvas with draggable cards
│   ├── ContactBoard.tsx          # Let's Connect section
│   ├── PhilosophyCard.tsx        # Design philosophy visualization
│   ├── PortfolioFolder.tsx       # Case studies folder
│   └── career-passport/          # Career passport components
├── assets/
│   ├── linkedin-avatar.jpg       # Profile photo
│   └── gamer-room-sticker.png    # Canvas sticker
├── styles/
│   └── index.css                 # Global styles
└── main.tsx                 # Entry point

public/
├── case-studies/
│   └── youtube-shorts/      # YouTube case study (built separately)
└── ...

.claude/
└── launch.json              # Dev server configurations
```

## 🎨 Case Studies

### YouTube Shorts — Product Discovery
A comprehensive case study documenting the design process for bridging the trust gap in YouTube Shorts product discovery.

- **Problem:** Users discover products on YouTube Shorts but rarely convert to purchases
- **Solution:** Aggregated credibility signals within the app, no context switching
- **Output:** Interactive case study with mockups, research findings, and design iterations

**To update the YouTube case study:**

1. Edit source files in `src/imports/Frame298/index.tsx`
2. Run `npm run build` in the case study project
3. Deploy built files to `public/case-studies/youtube-shorts/`
4. Rebuild main portfolio: `npm run build`

## 🔧 Configuration

### Environment Variables

Create a `.env` file with:

```
VITE_LINKEDIN_PROFILE=https://www.linkedin.com/in/your-profile/
VITE_WHATSAPP_NUMBER=your-whatsapp-number
VITE_EMAIL_ADDRESS=your-email@example.com
VITE_EMAIL_SUBJECT=Portfolio Inquiry
```

### Card Positioning

Edit card positions and rotations in `src/components/DraggableWorkspace.tsx`:

```typescript
const CARDS = [
  { id: 'greeting', x: 0, y: -370, rotate: 0 },
  { id: 'story', x: -180, y: 0, rotate: 5 },
  // ... more cards
];
```

## 🎯 Key Components

### DraggableWorkspace
- Infinite canvas with pan/zoom
- Draggable card sections
- Responsive filtering (mobile/desktop)
- Navigation buttons for key sections

### ContactBoard
- LinkedIn integration (profile photo, title, location)
- Quick action buttons (View Profile, Message)
- WhatsApp and email contact options

### PortfolioFolder
- Animated folder visualization
- Case study project cards
- Click to open in new tab

## 📦 Technologies

- **Frontend:** React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Build Tool:** Vite v6
- **Dev Server:** Vite Preview

## 🔗 Live Demo

[Your portfolio URL]

## 📝 License

MIT License - feel free to fork and adapt for your own portfolio!

## 👨‍💻 Author

**Chatriyan D**
- LinkedIn: [Profile](https://www.linkedin.com/in/chatriyan-d/)
- Email: chatruchatriyan@gmail.com
- Location: Bengaluru, India

---

Built with ❤️ as an interactive design portfolio
# Build fix
