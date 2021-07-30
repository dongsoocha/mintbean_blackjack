import { createTheme } from "@material-ui/core";

export const theme = createTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
    }
  },
  palette: {
    primary: { main: "#DF1B1B" }
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundImage: `url(${"https://res.cloudinary.com/dqhd5slcy/image/upload/v1627415371/background_dijj6c.png"})`,
          backgroundSize: 'cover',
          minHeight: '90vh'
        }
      }
    }
  }
});
