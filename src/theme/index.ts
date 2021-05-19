interface ThemeColors {
  primary: string;
  primaryLight: string;
  secondary: string;
  background: string;
  light: string;
  error: string;
}

interface Theme {
  colors: ThemeColors;
}

export const theme: Theme = {
  colors: {
    primary: "#1A8D8C",
    primaryLight: "#f5ffff",
    secondary: "#76797B",
    background: "#E8F3F3",
    light: "#FFF",
    error: "#F00",
  },
};
