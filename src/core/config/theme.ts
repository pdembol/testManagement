import {createMuiTheme} from "@material-ui/core";

const color = {} as any;
color.blue = "rgb(55,41,167)";
color.lightBlue = "rgb(79,76,167)";
color.black = "#000";


export const theme = createMuiTheme({
  typography: {},
  palette: {
    primary: {
      main: color.blue
    },
    secondary: {
      main: color.lightBlue
    },
    type: "light"
  }
});
