import {RouteComponentProps} from "react-router";
import {About} from "./aboutUs/views";
import {List} from "./list/views";

interface MainRoute {
  url: string;
  handler: (props: RouteComponentProps<any>) => any;
}

export const routes: MainRoute[] = [
  About,
  List
];
