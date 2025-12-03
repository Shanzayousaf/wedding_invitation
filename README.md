# 💍 Wedding Invitation Web Application

A modern, responsive React-based web application for managing wedding invitations and RSVPs. Built with TypeScript, Vite, and Tailwind CSS.

## 🎯 Features

### ✨ Immersive Experience
- **Charcoal & Gold Theme**: Inspired by luxury invitation cards
- **Anti-Gravity Canvas**: Floating particles, connecting lines, and floral outlines
- **Unified Layout**: Reception, Barat, and invitation pages share one cohesive aesthetic

### 📍 Event Storytelling
- **Dedicated Pages**: Each celebration gets its own schedule, venue, and contact section
- **Embedded Maps**: Monochrome Google Maps with quick access links
- **WhatsApp Concierge**: Tap-to-chat numbers for instant coordination

### 📤 Sharing & Accessibility
- **Open Invitation**: No logins, QR codes, or guest data required
- **Share & Copy Controls**: Built-in share sheet with clipboard fallback
- **Responsive Design**: Optimized for phones, tablets, laptops, and desktops

## 📦 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.2.0 | UI framework |
| **TypeScript** | 5.3.0 | Type safety |
| **Vite** | 5.4.21 | Build tool |
| **Tailwind CSS** | v4 | Styling |
| **Radix UI** | Latest | Headless components |
| **React Hook Form** | 7.55.0+ | Form management |
| **Sonner** | 2.0.3 | Toast notifications |
| **Recharts** | 2.15.2 | Data visualization |
| **Lucide React** | 0.263.1 | Icons |

## 🚀 Quick Start

### Prerequisites
- Node.js 18.19.1 or higher
- npm 9.2.0 or higher

### Installation

1. **Clone or navigate to the project:**
   ```bash
   cd wedding_invitation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   The application will open at `http://localhost:3001/`

### Build for Production

```bash
npm run build
```
Output will be in the `dist/` folder, ready for deployment.

### Preview Production Build

```bash
npm run preview
```
Preview the production build at `http://localhost:4173/`

## 📁 Project Structure

```
wedding_invitation/
├── index.html                 # HTML entry point
├── package.json              # Project dependencies
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── App.tsx                   # Main router component
├── main.tsx                  # React entry point
│
├── wedding_invitation/       # Page components
│   ├── HomePage.tsx          # Landing page + hero
│   ├── InvitationPage.tsx    # Open invitation experience
│   ├── ReceptionPage.tsx     # Reception detail page
│   ├── BaratPage.tsx         # Barat detail page
│   ├── AnimatedBackground.tsx# Anti-gravity canvas
│   ├── ImageWithFallback.tsx # Image error handling
│   └── eventContent.ts       # Central event/content data
│
├── ui/                       # Pre-built UI components (45+ components)
│   ├── button.tsx
│   ├── card.tsx
│   ├── form.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── dialog.tsx
│   ├── select.tsx
│   ├── table.tsx
│   ├── tabs.tsx
│   ├── badge.tsx
│   ├── pagination.tsx
│   ├── sonner.tsx            # Toast notifications
│   └── ... (40+ more components)
│
└── Styles/
    └── globals.css           # Global styles and Tailwind config
```

## 🔄 Application Flow

### Page Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `#` or `#/` | HomePage | Welcome page with event details |
| `#reception` | ReceptionPage | Elegant reception details + map |
| `#barat` | BaratPage | Barat ceremony schedule + contact |
| `#invitation` | InvitationPage | Shareable digital invitation |

### User Journey

1. **Guest Visit** → HomePage  
   Discover the charcoal & gold hero, floating florals, and entry points to each celebration.

2. **Explore Celebrations** → ReceptionPage / BaratPage  
   View curated schedules, embedded maps, and tappable WhatsApp contacts.

3. **Share Invitation** → InvitationPage  
   Read the story, browse both events at a glance, and share/copy the public link—no login required.

## 🎨 Customization

### Colors & Theme
Edit `Styles/globals.css` and `tailwind.config.js` to adjust typography and palettes. The default palette leans on charcoal (#0b0b0b) and metallic gold (#d4af37) to match the invitation cards.

### Event Content
Update `wedding_invitation/eventContent.ts` to:
- Change couple names or parent callouts
- Adjust dates, times, or venue directions
- Manage WhatsApp contacts and invitation copy

### Page Content
Update individual page components in `wedding_invitation/`:
- `HomePage.tsx` – Hero section and celebration cards
- `ReceptionPage.tsx` / `BaratPage.tsx` – Detailed itineraries and maps
- `InvitationPage.tsx` – Shareable open invitation

## 📱 Responsive Design

The application is fully responsive and optimized for:
- ✅ Desktop (1920px and above)
- ✅ Laptop (1366px and above)
- ✅ Tablet (768px and above)
- ✅ Mobile (320px and above)

## 🔐 Security Notes

- Content is static and contains no guest data
- Always serve over HTTPS to protect WhatsApp deeplinks
- Integrate with your own backend if you later add RSVP capture or auth

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm run build
# Upload the dist/ folder to Vercel
```

### Netlify
```bash
npm run build
# Drag and drop the dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Push the dist/ folder to gh-pages branch
```

### Traditional Hosting
1. Run `npm run build`
2. Upload `dist/` folder contents to your web server
3. Configure server to serve `index.html` for all routes (required for hash routing)

## 📊 Build Information

- **Build Status**: ✅ Production Ready
- **Build Size**: 428.44 KB (121.67 KB gzipped)
  - CSS: 81.50 KB (13.23 KB gzipped)
  - JS: 346.54 KB (108.16 KB gzipped)
  - HTML: 0.40 KB (0.28 KB gzipped)
- **Modules**: 1350 transformed successfully
- **Build Time**: ~6.9 seconds

## 🐛 Troubleshooting

### Dev Server Not Starting
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Port Already in Use
The dev server will automatically try the next available port (3001, 3002, etc.)

### Build Errors
```bash
# Clear cache
npm run build -- --force

# Or manually clear Vite cache
rm -rf dist/
npm run build
```

### Import Errors
Ensure all relative paths are correct:
- Components use `../ui/` for UI components
- Pages use `../` to access parent directory files

## 📝 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Dev Server | `npm run dev` | Start development server |
| Build | `npm run build` | Create production build |
| Preview | `npm run preview` | Preview production build locally |
| Type Check | `npx tsc --noEmit` | Check TypeScript types |

## 🤝 Contributing

For modifications or enhancements:

1. **Adding a new page**: Create a new component in `wedding_invitation/`
2. **Adding UI components**: Use Radix UI primitives or extend existing components
3. **Styling**: Follow Tailwind CSS conventions
4. **Types**: Always use TypeScript interfaces from `Types/guest.ts`

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Verify TypeScript types are correct
3. Ensure all dependencies are installed: `npm install`
4. Clear cache and rebuild: `npm run build -- --force`

## 📄 License

This project is created for wedding invitation management. Feel free to customize and use for your needs.

## ✨ Features Highlights

✅ **Zero Build Errors**
✅ **Fully Responsive**
✅ **TypeScript Type-Safe**
✅ **Modern UI Components**
✅ **Real-time Updates**
✅ **Admin Features**
✅ **Data Export Capability**
✅ **Production Ready**

---

**Built with ❤️ for your special day! 💍**
