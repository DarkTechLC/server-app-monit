import { createContext, ReactNode, useEffect } from 'react';

import { useStorage } from '../hooks/useStorage';

export type ITheme = {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
};

export const ThemeContext = createContext({} as ITheme);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useStorage<'dark' | 'light'>('theme', 'dark');

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  }

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
