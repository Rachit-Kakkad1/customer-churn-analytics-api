import { useThemeContext } from '../context/ThemeProvider.jsx';

/**
 * Custom hook to consume the Theme context in components.
 * @returns {{theme: string, setTheme: (theme: string) => void}}
 */
export const useTheme = () => {
  const { theme, setTheme } = useThemeContext();
  return { theme, setTheme };
};

export default useTheme;
