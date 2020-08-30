import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";
import NavBar from "./NavBar/NavBar";
import SideBar from "./SideBar/SideBar";
import Layout from "./Layout/Layout";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [type, setType] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setType(null);
    if (!localStorage.getItem("jwt-cookie")) {
      setType("visiteur");
    } else {
      axios
        .post(
          "/clients/type",
          {},
          {
            headers: {
              Authorization: "bearer " + localStorage.getItem("jwt-cookie"),
            },
          }
        )
        .then((resultat) => {
          setType(resultat.data);
        });
    }
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router>
        <NavBar
          classes={classes}
          theme={theme}
          open={open}
          type={type}
          handleDrawerOpen={handleDrawerOpen}
        />
        <SideBar
          classes={classes}
          theme={theme}
          open={open}
          handleDrawerClose={handleDrawerClose}
        />
        <Layout classes={classes} theme={theme} open={open} type={type} />
      </Router>
    </div>
  );
}
