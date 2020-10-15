import {RouteComponentProps} from "react-router";
import {About} from "../../feature/aboutUs/views";
import {Builds} from "../../feature/builds/views";
import {Branches} from "../../feature/branches/views";

interface MainRoute {
    url: string;
    handler: (props: RouteComponentProps<any>) => any;
}

export const routes: MainRoute[] = [
    About,
    Builds,
    Branches
];
