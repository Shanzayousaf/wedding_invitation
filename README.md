# 💍 Wedding Invitation Web Application

A modern, responsive React-based web application for managing wedding invitations and RSVPs. Built with TypeScript, Vite, and Tailwind CSS.

## 🎯 Features

### 👨‍👩‍👧‍👦 Guest Management
- **Guest Authentication**: Secure guest lookup using invitation IDs
- **Personalized Invitations**: Custom greeting with guest details
- **RSVP Tracking**: Real-time RSVP status updates
- **Admin Dashboard**: Complete guest management interface

### 📊 Admin Features
- **Guest Statistics**: View total guests, attendance count, declining guests
- **Event Split View**: Separate tracking for Reception and Barat events
- **Advanced Filtering**: Filter guests by RSVP status
- **CSV Export**: Download guest list with all details
- **Guest Search**: Quick lookup functionality

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Beautiful UI**: Modern design with custom animations and decorations
- **Toast Notifications**: Real-time feedback for user actions
- **Error Handling**: Graceful error messages and recovery

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
├── RSVP-form.tsx            # Shared RSVP form component
│
├── wedding_invitation/       # Page components
│   ├── HomePage.tsx          # Landing page with event info
│   ├── LoginPage.tsx         # Guest ID lookup
│   ├── InvitationPage.tsx    # Personalized invitation
│   ├── AdminDashboard.tsx    # Admin management panel
│   ├── FloralDecoration.tsx  # Decorative elements
│   └── ImageWithFallback.tsx # Image error handling
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
├── Data/
│   └── mockData.ts           # Mock guest data and utilities
│
├── Types/
│   └── guest.ts              # TypeScript interfaces
│
└── Styles/
    └── globals.css           # Global styles and Tailwind config
```

## 🔄 Application Flow

### Page Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `#` or `#/` | HomePage | Welcome page with event details |
| `#login` | LoginPage | Guest authentication |
| `#invitation/:id` | InvitationPage | Personalized invitation & RSVP |
| `#admin` | AdminDashboard | Admin management (hidden button) |

### User Journey

1. **Guest Visit** → HomePage
   - View wedding event details
   - See Reception and Barat celebration info
   - Navigate to login

2. **Authentication** → LoginPage
   - Enter invitation ID (e.g., "INV001", "INV002")
   - System validates and redirects

3. **Personalized Invitation** → InvitationPage
   - View custom greeting with guest name
   - See event details (date, time, venue, dress code)
   - Submit RSVP with attendance preference
   - View updated guest counts

4. **Admin Access** → AdminDashboard (Hidden)
   - Access via hidden button (bottom-right corner)
   - View guest statistics
   - Manage RSVPs
   - Export guest data to CSV

## 👥 Sample Guest Data

Pre-loaded mock guests for testing:

| ID | Guest Name | Event | Status |
|----|-----------|-------|--------|
| INV001 | Rahul & Priya | Both | Pending |
| INV002 | Amit Patel | Reception | Pending |
| INV003 | Sunita Sharma | Barat | Pending |
| INV004 | Vikram Singh | Both | Pending |
| INV005 | Neha Kumar | Reception | Pending |
| INV006 | Arjun Verma | Barat | Pending |

**Note:** Use these IDs to test the login functionality.

## 🎨 Customization

### Colors & Theme
Edit `tailwind.config.js` to customize colors:
```javascript
theme: {
  extend: {
    colors: {
      blush: '#FFB6C1',   // Wedding blush pink
      gold: '#FFD700',    // Accent gold
      ivory: '#FFFFF0',   // Background ivory
    }
  }
}
```

### Mock Data
Edit `Data/mockData.ts` to:
- Add/remove guests
- Change event details
- Modify date and venue information

### Page Content
Update individual page components in `wedding_invitation/` folder:
- `HomePage.tsx` - Hero section and event cards
- `LoginPage.tsx` - Authentication flow
- `InvitationPage.tsx` - Invitation design
- `AdminDashboard.tsx` - Admin interface

## 📱 Responsive Design

The application is fully responsive and optimized for:
- ✅ Desktop (1920px and above)
- ✅ Laptop (1366px and above)
- ✅ Tablet (768px and above)
- ✅ Mobile (320px and above)

## 🔐 Security Notes

- Guest IDs are case-sensitive (INV001, not inv001)
- Admin access is protected by a hidden button
- All data is currently mock/demo data
- For production, integrate with your backend API

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
