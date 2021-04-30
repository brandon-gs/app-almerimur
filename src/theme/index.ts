interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  light: string;
}

interface Theme {
  colors: ThemeColors;
}

export const theme: Theme = {
  colors: {
    primary: "#1A8D8C",
    secondary: "#76797B",
    background: "#E8F3F3",
    light: "#FFF",
  },
};
