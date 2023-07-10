import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 0;

export default makeStyles((theme) => ({
  appBar: {
    color: "white",
    boxShadow: "none",
    background: "#5f9ea0",
    animation: "blinking 1s linear infinite",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  title: {
    flexGrow: 1,
    alignItems: "center",
    display: "flex",
    textDecoration: "none",
    "&:hover": {
      color: "#000000",
      boxShadow: "none",
    },
  },
  image: {
    marginRight: "10px",
  },

  grow: {
    flexGrow: 0.5,
    "&:hover": {
      color: "#000000",
      fontSize: "120%",
    },
  },
}));
