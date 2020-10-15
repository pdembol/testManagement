import React from "react";
import {Route, RouteComponentProps, Switch} from "react-router";
import SimpleTable, {ColumnModel} from "../../core/components/SimpleTable/SimpleTable";

export const Branches = {
    url: "branches",
    handler: (props: RouteComponentProps<any>) => {
        const baseUrl = props.match.url;
        return <Switch>
            <Route exact={true} path={baseUrl} component={Index}/>
        </Switch>
    }
};

const columns: ColumnModel[] = [
    {name: "name", title: "Name"},
    {name: "default_branch", title: "Repository"},
    {name: "exists_on_github", title: "Last build"},

];

function Index() {
    return (
        <div>
            <SimpleTable title={"Branches"}
                         resourceName={"branches"}
                         columns={columns}
                         filterField={"name"}
            />
        </div>
    );
}

