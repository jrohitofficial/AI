# AICA - AI Chartered Accountants Platform

A professional audit management system built with React, Vite, and Tailwind CSS. This application provides a comprehensive dashboard for managing client portfolios, audit engagements, and staffing.

## 🚀 Features

- **Client Portfolio Management** - Track audit clients with status indicators and progress tracking
- **Dashboard Analytics** - Real-time metrics for active clients, pending submissions, and deadlines
- **User Authentication** - Secure login system with animated UI
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Reusable Components** - Modular component architecture for scalability
- **Professional UI** - Modern, clean interface with consistent design patterns

## 📁 Project Structure

```
src/
├── api/                    # API service layer
├── assets/                 # Static assets (images, fonts)
├── components/
│   ├── auth/              # Authentication components
│   ├── common/            # Shared components (Badge, Button)
│   ├── dashboard/         # Dashboard-specific components
│   ├── layout/            # Layout components (Navbar, SidePanel, Footer)
│   └── ui/                # Base UI components (Card, Icon, Input, ProgressBar)
├── config/                # Configuration files
├── constants/             # Application constants
├── contexts/              # React contexts (Theme, Auth)
├── data/                  # Mock data for development
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── pages/                 # Page-level components
├── services/              # Business logic services
├── styles/                # Global styles
└── utils/                 # Helper functions
```

## 🛠️ Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Component Architecture

### Reusable Components

- **Badge** - Status indicators and labels
- **Button** - Customizable button component
- **Card** - Container component with consistent styling
- **Icon** - SVG icon component with multiple variants
- **Input** - Form input with validation support
- **ProgressBar** - Visual progress indicator
- **ClientCard** - Client information card with status
- **MetricCard** - Dashboard metric display

### Layout Components

- **Navbar** - Top navigation with search and notifications
- **SidePanel** - Left sidebar navigation
- **AppShell** - Main application wrapper
- **Footer** - Application footer

## 🎯 Usage

### Authentication
The app uses a mock authentication system. Use any credentials to log in.

### Dashboard
After login, you'll see:
- Client portfolio overview
- Key metrics (active clients, pending submissions, deadlines)
- Client cards with audit progress
- Quick actions for client management

### Client Status Types
- **ACTIVE** - Currently in progress
- **IN PLANNING** - Not yet started
- **COMPLETED** - Audit finished

## 🔧 Configuration

### Constants
All application constants are centralized in `src/constants/index.js`:
- Client status types
- Status colors
- API endpoints (for future integration)
- Routes

### Theme
Theme configuration is managed through `src/contexts/ThemeContext.jsx`

## 📝 Development Guidelines

1. **Component Creation**
   - Keep components small and focused
   - Use functional components with hooks
   - Follow the established naming conventions

2. **Styling**
   - Use Tailwind utility classes
   - Maintain consistent spacing and colors
   - Follow mobile-first approach

3. **State Management**
   - Use React hooks for local state
   - Context API for global state
   - Keep state as close to where it's used as possible

4. **Code Quality**
   - No console logs in production code
   - Proper error handling
   - Meaningful variable and function names

## 🚦 Future Enhancements

- [ ] Real API integration
- [ ] Advanced filtering and search
- [ ] Document management system
- [ ] Team collaboration features
- [ ] Report generation
- [ ] Mobile app version

## 📄 License

This project is proprietary and confidential.

## 👥 Team

AICA Development Team

---

Built with ❤️ by the AICA Team
