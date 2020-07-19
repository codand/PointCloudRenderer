import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    // text: {
    //   primary: "#ffffff",
    //   secondary: "#00000",
    // },
    primary: {
      main: "#e91e63",
      contrastText: "#fff",
    },
    // secondary: {
    //   main: "#000000",
    //   contrastText: "#fffffff",
    // },
  },
});

export default theme;
