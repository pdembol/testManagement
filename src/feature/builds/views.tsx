import React from "react";
import {Route, RouteComponentProps, Switch} from "react-router";
import SimpleTable, {ColumnModel} from "../../core/components/SimpleTable/SimpleTable";

export const Builds = {
    url: "builds",
    handler: (props: RouteComponentProps<any>) => {
        const baseUrl = props.match.url;
        return <Switch>
            <Route exact={true} path={baseUrl} component={Index}/>
        </Switch>
    }
};

const columns: ColumnModel[] = [
    {name: "id", title: "Id"},
    {name: "number", title: "Number"},
    {name: "state", title: "Data"},
    {name: "started_at", title: "Started at"},
    {name: "finished_at", title: "Finished at"},

];

function Index() {
    return (
        <div>
            <SimpleTable title={"Builds"}
                         resourceName={"builds"}
                         columns={columns}/>
        </div>
    );
}

