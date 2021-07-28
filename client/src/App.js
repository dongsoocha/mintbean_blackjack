import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import GamePage from "./pages/Game";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/" component={LandingPage} />
        <Route path="/Game" component={GamePage} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
