import React from 'react';
import { render } from '@testing-library/react';
import {Layout} from "./Layout";
import {mainItems} from "../../config/items";
import {theme} from "../../config/theme";
import {MuiThemeProvider} from "@material-ui/core";
import {mainStore, StoreContext} from "../../stores/stores";
import {Router} from "react-router-dom";
import {createBrowserHistory} from "history";
const logo = process.env.PUBLIC_URL + "/logo.png";

test('renders Layout component', () => {

  const history = createBrowserHistory();

  const { getByText } = render(
      <MuiThemeProvider theme={theme}>
        <StoreContext.Provider value={mainStore}>
          <Router history={history}>
            <Layout
                appTitle={"APP"}
                logo={logo}
                items={mainItems}
                landingPageLink={"link"}
                repoLink={"link"}
                appVersion={"1"} >
              <div></div>
            </Layout>
          </Router>
        </StoreContext.Provider>
      </MuiThemeProvider>
);
  const firstButton = getByText(/Builds/i);
  expect(firstButton).toBeInTheDocument();
  const secondButton = getByText(/Branches/i);
  expect(secondButton).toBeInTheDocument();
});
