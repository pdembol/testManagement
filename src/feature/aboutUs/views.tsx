import React from "react";
import { Route, RouteComponentProps, Switch } from "react-router";

export const About = {
  url: "aboutUs",
  handler: (props: RouteComponentProps<any>) => {
      const baseUrl = props.match.url;
      return <Switch>
          <Route exact={true} path={baseUrl} component={Index}/>
      </Switch>
  }
};

function Index () {
  return (
      <div> About us </div>
  );
};
