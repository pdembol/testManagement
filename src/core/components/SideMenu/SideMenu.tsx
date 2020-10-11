import Drawer from "@material-ui/core/Drawer";
import {
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import React from "react";
import {Link, NavLink} from "react-router-dom";
import {
    Divider, List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import clsx from 'clsx';
import {makeStyles} from "@material-ui/styles";
import {ListItemObj} from "../../config/items";
import {observer} from "mobx-react-lite";
import {useStore} from "../../stores/stores";

export const drawerWidth = 265;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    appTitle: {
      display: "flex",
      alignItems: "center"
    },
    content: {
      backgroundColor: theme.palette.background.default,
      flexGrow: 1,
      minWidth: 0, // So the Typography noWrap works
      overflowY: "auto",
      padding: theme.spacing(3)
    },
    drawer: {
      flexShrink: 0,
      whiteSpace: "nowrap",
      width: drawerWidth
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7) + 1
    },
    listItems: {
      maxHeight: "calc(100% - 116px)",
      overflowY: "auto",
      overflowX: "hidden"
    },
    sideMenuCollapseItem: {
      position: "absolute",
      bottom: 0,
      backgroundColor: theme.palette.background.paper,
      width: drawerWidth - 1
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar
    }
  }),
);

interface SideMenuProps {
  items: ListItemObj[];
  logoSrc?: string;
  landingPageLink?: string;
  appTitle?: string;
}


export const SideMenu = observer(
    (props: React.PropsWithChildren<SideMenuProps>) => {

    const classes = useStyles();
    const {commonsStore} = useStore();
    const expanded = commonsStore.sideMenuDrawerExpanded;
    const {items, logoSrc, landingPageLink, appTitle, children} = props;

    const onCollapseClick = () => {
        commonsStore.toggleSideMenuDrawerExpanded();
    };

    return (
      <div className={classes.root}>
          <Drawer
              variant="permanent"
              className={clsx(classes.drawer, {
                  [classes.drawerOpen]: commonsStore.sideMenuDrawerExpanded,
                  [classes.drawerClose]: !commonsStore.sideMenuDrawerExpanded,
              })}
              classes={{
                  paper: clsx({
                      [classes.drawerOpen]: commonsStore.sideMenuDrawerExpanded,
                      [classes.drawerClose]: !commonsStore.sideMenuDrawerExpanded,
                  }),
              }}
          >
          <span className={classes.appTitle}>
            <Link to={landingPageLink ? landingPageLink : ""}>
            <Typography variant="h6" color={"primary"} noWrap={true}>
                <img alt="logo" style={{
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 8,
                    maxWidth: 40
                }} src={logoSrc} />
              </Typography>
            </Link>
            <Typography variant={"h6"}>{appTitle}</Typography>
          </span>

          <div className={classes.listItems}>
              <List>
              {items.map(value => {
              return <NavLink to={value.to} key={value.key + "nav"}>
                      <ListItem button key={value.key}>
                          <ListItemIcon>{value.icon}</ListItemIcon>
                          <ListItemText primary={value.title} />
                      </ListItem>
              </NavLink>
              })}
              </List>
          </div>
            <div className={classes.sideMenuCollapseItem}>
              <Divider />
              <ListItem button onClick={onCollapseClick}>
                <ListItemIcon>
                  {expanded ? <ChevronLeft /> : <ChevronRight />}
                </ListItemIcon>
                <ListItemText primary={"Collapse side menu"} />
              </ListItem>
            </div>
        </Drawer>
        <main className={classes.content}>
          {children}
        </main>
      </div>
    );
});
