import React from "react";
import { makeStyles } from "@fluentui/react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing.m,
    backgroundColor: "rgba(255, 255, 255, 0.10)"
  }
}));

const Header = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};

export default Header;
