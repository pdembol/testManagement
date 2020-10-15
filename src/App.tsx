import React from "react";
import { CssBaseline, MuiThemeProvider} from "@material-ui/core";
import {
    Redirect,
    Route,
    Router, Switch,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import {theme} from "./core/config/theme";
import {mainStore, StoreContext} from "./core/stores/stores";
import {mainView} from "./feature/layout/mainView";

function App() {
    const history = createBrowserHistory();
    return (
          <MuiThemeProvider theme={theme}>
              <CssBaseline />
                <StoreContext.Provider value={mainStore}>
                    <Router history={history}>
                      <Switch>
                          <Route path="" render={mainView} />
                          <Route path="/aboutUs" />
                          <Redirect to="/list" from="" exact={true} />
                      </Switch>
                  </Router>
                </StoreContext.Provider>
          </MuiThemeProvider>
  );
}
export default App;
