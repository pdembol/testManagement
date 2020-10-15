import {Route, RouteComponentProps} from "react-router-dom";
import {Layout} from "../../core/components/Layouts/Layout";
import {mainItems} from "../../core/config/items";
import {routes} from "../../core/config/routes";
import React from "react";

export function mainView({match}: RouteComponentProps<any>) {
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
                return <Route key={url} path={url} render={handler}/>;
            })}
        </Layout>
    );
}

