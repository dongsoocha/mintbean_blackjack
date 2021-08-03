import React from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import Test from "./pages/Test";
import Home from "./pages/Home";
import Chat from "./components/Chat";
import Table from "./pages/Table";
import Store from "./pages/Store";
import HowToPlay from "./pages/HowToPlay";

import { UserProvider } from "./contextProvider/user";

import { SocketContext, socket } from './contextProvider/socket';

// TODO: Extract the background css out of individual pages to the app-wide styling

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline>
        <UserProvider>
          <SocketContext.Provider value={socket}>
            <BrowserRouter>
              <Route path="/" exact component={LandingPage} />
              <Route path="/test" component={Test} />
              <Route path="/howtoplay" component={HowToPlay} />
              <Route path="/home"  component={Home} />
              <Route path="/table"  component={Table} />
              <Route path="/chat" component={Chat} />
              <Route path="/store"  component={Store} />
            </BrowserRouter>
          </SocketContext.Provider>
        </UserProvider>
      </CssBaseline>
    </MuiThemeProvider >
  );
}

export default App;
