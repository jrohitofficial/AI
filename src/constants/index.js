// App-wide constants
export const APP_NAME = 'AICA';
export const APP_FULL_NAME = 'AI Chartered Accountants';

// Status types
export const CLIENT_STATUS = {
    ACTIVE: 'ACTIVE',
    IN_PLANNING: 'IN PLANNING',
    COMPLETED: 'COMPLETED',
};

// Colors for status badges
export const STATUS_COLORS = {
    [CLIENT_STATUS.ACTIVE]: {
        bg: 'bg-green-100',
        text: 'text-green-700',
        iconBg: 'bg-blue-100',
        iconText: 'text-blue-600',
        progress: 'bg-blue-600',
    },
    [CLIENT_STATUS.IN_PLANNING]: {
        bg: 'bg-orange-100',
        text: 'text-orange-700',
        iconBg: 'bg-orange-100',
        iconText: 'text-orange-600',
        progress: 'bg-orange-500',
    },
    [CLIENT_STATUS.COMPLETED]: {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        iconBg: 'bg-green-100',
        iconText: 'text-green-600',
        progress: 'bg-green-600',
    },
};

// Button action types
export const BUTTON_ACTION = {
    ENTER_WORKSPACE: 'ENTER_WORKSPACE',
    VIEW_REPORT: 'VIEW_REPORT',
    START_ONBOARDING: 'START_ONBOARDING',
};

// Routes
export const ROUTES = {
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    CLIENT_PORTFOLIO: '/client-portfolio',
    ENGAGEMENTS: '/engagements',
    STAFFING: '/staffing',
};

// API endpoints (for future use)
export const API_ENDPOINTS = {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    CLIENTS: '/api/clients',
    METRICS: '/api/metrics',
};
