import React, {ReactNode} from "react";
import {SideMenu} from "../SideMenu/SideMenu";

import {createStyles, IconButton, makeStyles, Theme} from "@material-ui/core";
import {GitHub, Info} from "@material-ui/icons";
import {ListItemObj} from "../../config/items";
import Tooltip from "@material-ui/core/Tooltip";
import {CustomSnackbar} from "../SnackBar/SnackBar";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        topRightUserActionButtons: {
            position: "absolute",
            top: 0,
            right: 0
        }
    })
);

export interface LayoutInterface {
    logo?: any;
    items: ListItemObj[];
    appTitle?: string;
    landingPageLink?: string;
    children: ReactNode;
    repoLink: string;
    appVersion: string

}

export const Layout = (props: LayoutInterface) => {
    const classes = useStyles();
    const {
        appTitle,
        items,
        logo,
        children,
        landingPageLink,
        repoLink,
        appVersion
    } = props;

    const redirectToGit = () => {
        window.location.href = repoLink
    };

    return (
        <>
            <SideMenu
                logoSrc={logo}
                landingPageLink={landingPageLink}
                items={items}
                appTitle={appTitle}
            >
                <div className={classes.topRightUserActionButtons}>
                    <Tooltip title={<p> App version: {appVersion} </p>}>
                        <IconButton aria-label="Info">
                            <Info/>
                        </IconButton>
                    </Tooltip>
                    <IconButton aria-label="Git" onClick={redirectToGit}>
                        <GitHub/>
                    </IconButton>
                </div>
                {children}
                <CustomSnackbar/>
            </SideMenu>
        </>
    );
};