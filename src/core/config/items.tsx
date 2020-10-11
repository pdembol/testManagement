import React, {ReactChildren} from "react";
import ListIcon from '@material-ui/icons/List';
import InfoIcon from '@material-ui/icons/Info';

export interface ListItemObj {
    key: string;
    to: string;
    title: string | ReactChildren;
    icon: any
    security?: string[] | string;
}

export const mainItems: ListItemObj[] = [
    {
        key: "list",
        to: "/list",
        title: "List",
        icon: <ListIcon/>
    },
    {
        key: "about",
        to: "/aboutUs",
        title: "About Us",
        icon: <InfoIcon/>
    },
];