# Project Structure Documentation

## Overview
This document explains the organization and purpose of each directory in the AICA project.

## Directory Structure

### `/src/api`
**Purpose**: API integration layer
- Mock API functions for development
- Real API calls will replace these in production
- Centralized HTTP requests

### `/src/components`
**Purpose**: Reusable UI components organized by category

#### `/src/components/auth`
- Authentication-related components
- Login, Register, ForgotPassword, etc.

#### `/src/components/common`
- Shared components used across multiple features
- Badge, Button, etc.
- Exported via index.js for easy imports

#### `/src/components/dashboard`
- Dashboard-specific components
- ClientCard, MetricCard, Dashboard layout

#### `/src/components/layout`
- App-wide layout components
- Navbar, SidePanel, Footer, AppShell
- Exported via index.js

#### `/src/components/ui`
- Base UI building blocks
- Card, Icon, Input, ProgressBar, Section
- Highly reusable across the application
- Exported via index.js

#### `/src/components/features`
- Feature-specific components
- ActivityTimeline, HeroSection, MetricsGrid, Testimonials

### `/src/config`
**Purpose**: Application configuration
- navigation.js - App navigation structure
- Other config files as needed

### `/src/constants`
**Purpose**: Application-wide constants
- Status types, colors, routes
- API endpoints
- Centralized values to avoid magic strings

### `/src/contexts`
**Purpose**: React Context providers
- ThemeContext - Theme management
- AuthContext - Authentication state (future)
- Other global state management

### `/src/data`
**Purpose**: Mock data for development
- activities.js, clients.js, metrics.js, etc.
- Will be replaced with API calls in production
- Useful for testing and development

### `/src/hooks`
**Purpose**: Custom React hooks
- useAsyncData - Handle async operations
- Other reusable hooks

### `/src/lib`
**Purpose**: Utility libraries and helpers
- theme.js - Theme utilities
- Other helper libraries

### `/src/pages`
**Purpose**: Page-level components
- DashboardPage, LoginPage, etc.
- Compose components into full pages
- Connected to routing

### `/src/services`
**Purpose**: Business logic and services
- mockClient.js - Mock service layer
- API service wrappers
- Data transformation logic

### `/src/styles`
**Purpose**: Global styles and CSS
- global.css - Global application styles
- Component-specific styles if needed

### `/src/utils`
**Purpose**: Utility functions
- formatters.js - Data formatting functions
- validators.js - Validation helpers (future)
- Other pure utility functions

### `/public`
**Purpose**: Static assets
- Images, fonts, icons
- Served directly without processing

## Component Organization Guidelines

### Reusable Components
1. **UI Components** (`/components/ui`)
   - Pure presentation components
   - No business logic
   - Highly configurable via props
   - Example: `<Button>`, `<Input>`, `<Card>`

2. **Common Components** (`/components/common`)
   - Shared across features
   - May contain some logic
   - Example: `<Badge>`, custom buttons

3. **Feature Components** (`/components/features`)
   - Specific to a feature area
   - Can combine multiple UI/common components
   - Example: `<ActivityTimeline>`, `<MetricsGrid>`

### Naming Conventions
- Components: PascalCase (e.g., `ClientCard.jsx`)
- Utilities: camelCase (e.g., `formatDate.js`)
- Constants: UPPER_SNAKE_CASE (e.g., `CLIENT_STATUS`)

### Import/Export Pattern
```javascript
// Barrel exports for clean imports
// In index.js files:
export { default as Component } from './Component';

// Usage:
import { Button, Badge } from '@/components/common';
```

## File Organization Best Practices

1. **One component per file**
2. **Co-locate related files** (component + styles + tests)
3. **Use index.js for barrel exports**
4. **Keep components focused and small**
5. **Extract reusable logic into hooks**

## Future Structure Additions

### Planned Directories
- `/src/store` - State management (Redux/Zustand)
- `/src/routes` - Routing configuration
- `/src/types` - TypeScript types (if migrating)
- `/src/tests` - Test utilities and helpers
- `/src/assets/icons` - SVG icon library

## Migration Path

### From Mock to Real Data
1. Replace `/src/data` imports with `/src/services` calls
2. Update `/src/services` to call real APIs
3. Add loading/error states
4. Implement caching if needed

### Adding New Features
1. Create feature directory in `/src/components/features`
2. Add related data in `/src/data` (for development)
3. Create service in `/src/services`
4. Add page in `/src/pages`
5. Update routing configuration
