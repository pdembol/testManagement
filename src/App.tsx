import React, { Suspense } from "react";
import {CircularProgress, CssBaseline, MuiThemeProvider} from "@material-ui/core";
import {
    Redirect,
    Route, RouteComponentProps,
    Router, Switch,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import {routes} from "./feature/routes";
import {Layout} from "./core/components/Layouts/Layout";
import {theme} from "./core/config/theme";
import {mainItems} from "./core/config/items";
import {mainStore, StoreContext} from "./core/stores/stores";


function App() {
    const history = createBrowserHistory();
    return (
      <Suspense fallback={<CircularProgress />}>
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
      </Suspense>
  );
}

function mainView ({ match }: RouteComponentProps<any>) {
    const logo = process.env.PUBLIC_URL + "/logo.png";
    const headerTitle = "Test Management";
    const landingPageLink = "/list";
    const repoLink = process.env.REACT_APP_REPO_LINK || "https://github.com/";
    const appVersion = process.env.REACT_APP_VERSION || "1.0";


    return (
        <Layout
            appTitle={headerTitle}
            logo={logo}
            items={mainItems}
            landingPageLink={landingPageLink}
            repoLink={repoLink}
            appVersion={appVersion}
        >
            {Object.keys(routes).map((route: any) => {
                const url = match.url + routes[route].url;
                const handler = routes[route].handler;
                return <Route key={url} path={url} render={handler} />;
            })}
        </Layout>
    );
};


export default App;
