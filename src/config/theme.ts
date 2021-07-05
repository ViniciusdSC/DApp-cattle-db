import { createMuiTheme } from "@material-ui/core";

const Theme = createMuiTheme({
  palette: {
    background: {
      default: "#f1f1f1",
      paper: "#fff",
    },
    text: {
      primary: "#708090",
      hint: "#708090",
    },
    primary: {
      main: "#708090",
    },
    divider: "#708090",
  },
});

export default Theme;
