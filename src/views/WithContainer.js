import makeStyles from "@material-ui/core/styles/makeStyles";
import React, {useEffect, useState} from "react";
import Navigation from "../components/Navigation";
import Header from "../components/Header";
import {Redirect, Route} from "react-router-dom";
import CategoriesView from "./CategoriesView";
import TransactionView from "./TransactionsView";
import BudgetsView from "./BudgetsView";
import axios from "axios";
import {getLoggedUsernameUrl, authTokenName, unauthorizedMessage} from "../assets/properties";

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

const WithContainer = (props) => {
  const classes = useStyles();
  const [loggedUsername, setLoggedUsername] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logged, setLogged] = useState({
    redirect: false,
    message: ""
  });
  const jwtConfig = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem(authTokenName)
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const viewProps = () => {
    switch (props.match.path) {
      case "/categories":
        return {selectedNavItem: 1, headerName: "Transactions"};
      case "/budgets":
        return {selectedNavItem: 2, headerName: "Budgets"};
      case "/summary":
        return {selectedNavItem: 3, headerName: "Summary"};
      default:
        return {selectedNavItem: 1, headerName: "Transactions"};
    }
  }

  useEffect(() => {
    axios.get(getLoggedUsernameUrl, jwtConfig)
      .then(resp => setLoggedUsername(resp.data.username))
      .catch(() => {
        setLogged(() => ({
          redirect: true,
          message: unauthorizedMessage
        }));
      })
    // eslint-disable-next-line
  }, [])

  return (
    logged.redirect ?
      <Redirect to={{pathname: "/", message: logged.message}}/>
      :
      <div className={classes.container}>
        <Navigation data={{
          selected: viewProps().selectedNavItem,
          mobileOpen: mobileOpen,
          handleDrawerToggle: handleDrawerToggle,
          setLogged: setLogged
        }}/>
        <Header data={{
          title: viewProps().headerName,
          handleDrawerToggle: handleDrawerToggle,
          username: loggedUsername
        }}/>
        <Route
          exact
          path="/categories"
          render={props => <CategoriesView {...props} setLogged={setLogged}/>}
        />
        <Route
          exact
          path="/transactions/:id"
          render={props => <TransactionView {...props} setLogged={setLogged}/>}/>
        <Route
          exact
          path="/budgets"
          render={props => <BudgetsView {...props} setLogged={setLogged}/>}/>
      </div>
  )
}

export default WithContainer;