import {createMuiTheme} from "@material-ui/core";

const color = {} as any;
color.blue = "rgba(125,142,255,0.65)";
color.black = "#000";


export const theme = createMuiTheme({
  typography: {},
  palette: {
    primary: {
      main: color.blue
    },
    secondary: {
      main: color.blue
    },
    type: "light"
  }
});
