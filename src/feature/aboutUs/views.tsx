import React from "react";
import {Route, RouteComponentProps, Switch} from "react-router";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from "react-responsive-carousel";
import {Typography} from "@material-ui/core";
import {useUniversalStyles} from "../../core/components/SimpleTable/SimpleTable";

export const About = {
    url: "aboutUs",
    handler: (props: RouteComponentProps<any>) => {
        const baseUrl = props.match.url;
        return <Switch>
            <Route exact={true} path={baseUrl} component={Index}/>
        </Switch>
    }
};

function Index() {
    const classes = useUniversalStyles();
    const carousel1 = process.env.PUBLIC_URL + "/carousel1.jpg";
    const carousel2 = process.env.PUBLIC_URL + "/carousel2.jpg";
    const carousel3 = process.env.PUBLIC_URL + "/carousel3.jpg";
    return (<div>
            <Typography className={classes.title} variant="h5" id="tableTitle">
                About us
            </Typography>
            <Carousel>
                <div className={classes.carousel}>
                    <img src={carousel1}/>
                    <p className="legend">Hard work</p>
                </div>
                <div className={classes.carousel}>
                    <img src={carousel2}/>
                    <p className="legend">Team</p>
                </div>
                <div className={classes.carousel}>
                    <img src={carousel3}/>
                    <p className="legend">Passion</p>
                </div>
            </Carousel>

        </div>
    );
}