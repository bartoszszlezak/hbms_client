import makeStyles from "@material-ui/core/styles/makeStyles";
import React, {useEffect, useState} from "react";
import Navigation from "../components/Navigation";
import Header from "../components/Header";
import {Outlet} from "react-router-dom";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  container: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    minHeight: "100vh",
    float: "right",
    backgroundColor: "#EAEFF1",
    paddingTop: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      width: `100%`,
      marginLeft: 0,
    },
  }
}))

const WithContainer = () => {
  const classes = useStyles();
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Get jwt token
  useEffect(() => {}, []);

  return (
    <div className={classes.container}>
      <Navigation data={{
        selected: 1,
        mobileOpen: mobileOpen,
        handleDrawerToggle: handleDrawerToggle,
        setLogged: setIsLogged
      }}/>
      <Header data={{
        title: "Transactions",
        handleDrawerToggle: handleDrawerToggle,
        username: userName
      }}/>
      <Outlet context={{isLogged, setIsLogged, setUserName}}/>
    </div>
  )
}

export default WithContainer;