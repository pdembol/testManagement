import React, {ReactChildren} from "react";
import ListIcon from '@material-ui/icons/List';
import InfoIcon from '@material-ui/icons/Info';
import {AccountTree} from "@material-ui/icons";

export interface ListItemObj {
    key: string;
    to: string;
    title: string | ReactChildren;
    icon: any
}

export const mainItems: ListItemObj[] = [
    {
        key: "builds",
        to: "/builds",
        title: "Builds",
        icon: <ListIcon/>
    },
    {
        key: "branches",
        to: "/branches",
        title: "Branches",
        icon: <AccountTree/>
    },
    {
        key: "about",
        to: "/aboutUs",
        title: "About Us",
        icon: <InfoIcon/>
    },
];