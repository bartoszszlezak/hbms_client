import makeStyles from "@material-ui/core/styles/makeStyles";
import React, {useEffect, useState} from "react";
import Navigation from "../components/Navigation";
import Header from "../components/Header";
import {Navigate, Outlet} from "react-router-dom";
import axios from "axios";
import {authTokenName, getLoggedUsernameUrl, unauthorizedMessage} from "../assets/properties";

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
  const [loggedUsername, setLoggedUsername] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logged, setLogged] = useState({
    redirect: false,
    message: ""
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const jwtConfig = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem(authTokenName)
    }
  };

  // Get jwt token
  useEffect(() => {
    axios.get(getLoggedUsernameUrl, jwtConfig)
      .then(resp => setLoggedUsername(resp.data.username))
      .catch(() => {
        setLogged(() => ({
          redirect: false,
          message: unauthorizedMessage
        }));
      })
  }, [])

  return (
    logged.redirect ?
        <Navigate to="/"/>
      :
    <div className={classes.container}>
      <Navigation data={{
        selected: 1,
        mobileOpen: mobileOpen,
        handleDrawerToggle: handleDrawerToggle,
        setLogged: setLogged
      }}/>
      <Header data={{
        title: "Transactions",
        handleDrawerToggle: handleDrawerToggle,
        username: loggedUsername
      }}/>
      <Outlet context={{logged, setLogged, setLoggedUsername}}/>
    </div>
  )
}

export default WithContainer;