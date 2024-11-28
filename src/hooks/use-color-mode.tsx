import { useTheme } from "next-themes";

export const useColorMode = () => {
  const { theme } = useTheme();

  return {
    colorMode: theme,
    isDark: theme === "dark",
    isLight: theme === "light",
  };
};

export const useColorModeValue = <T extends string>(light: T, dark: T): T => {
  const { isLight } = useColorMode();

  return isLight ? light : dark;
};
