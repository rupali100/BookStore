import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    maxWidth: "100%",
    background:
      "linear-gradient(90deg, rgba(196,195,218,1) 0%, rgba(224,218,218,1) 100%)",
  },
  media: {
    height: 10,
    paddingTop: "154%",
    "&:hover": {
      backgroundColor: "#2a344a",
      boxShadow: "none",
    },
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    background: "#5f9ea0",
    color: "white",
    width: "100%",
    height: "40px",

    "&:hover": {
      backgroundColor: "#567e7f",
      boxShadow: "none",
    },
  },
}));
