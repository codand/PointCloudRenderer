import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#e91e63",
      contrastText: "#fff",
    },
    secondary: {
      main: "#03a9f4",
      contrastText: "#fff",
    },
  },
});

export default theme;
