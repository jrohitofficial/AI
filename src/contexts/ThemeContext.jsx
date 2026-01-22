import React, { createContext, useMemo } from 'react';

export const ThemeContext = createContext({ theme: 'dark' });

export const ThemeProvider = ({ children }) => {
    const value = useMemo(() => ({ theme: 'dark' }), []);
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
