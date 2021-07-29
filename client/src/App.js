import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import Test from "./pages/Test";

import { UserProvider } from "./contextProvider/user";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <UserProvider>
        <BrowserRouter>
          <Route path="/" exact component={LandingPage} />
          <Route path="/test" component={Test} />
        </BrowserRouter>
      </UserProvider>
    </MuiThemeProvider>
  );
}

export default App;
