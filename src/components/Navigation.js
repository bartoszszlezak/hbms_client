import React from "react";
import {Divider, Drawer, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPiggyBank, faSignOutAlt, faWallet} from "@fortawesome/free-solid-svg-icons";
import "../css/components/Navigation.css";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Link} from 'react-router-dom';
import Hidden from "@material-ui/core/Hidden";
import {authTokenName, loggedOutMessage} from "../assets/properties";

const dataForList = [
  {
    text: "Transactions",
    icon: <div className="IconBox"><FontAwesomeIcon icon={faWallet}/></div>,
    index: 1,
    link: "/categories"
  },
  {
    text: "Budgets",
    icon: <div className="IconBox"><FontAwesomeIcon icon={faPiggyBank}/></div>,
    index: 2,
    link: "/budgets"
  },
  {
    text: "Log out",
    icon: <div className="IconBox"><FontAwesomeIcon icon={faSignOutAlt}/></div>,
  }
]

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  paper: {
    background: "#18202C",
    color: "#BBB7B7",
    width: drawerWidth
  },
  link: {
    color: "inherit",
    display: "flex",
    textDecoration: "none"
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  }
}));

const Navigation = (props) => {
  const {selected, mobileOpen, handleDrawerToggle, setLogged} = props.data
  const classes = useStyles();

  function handleLoggedOut() {
    localStorage.removeItem(authTokenName);
    setLogged(() => ({
      redirect: true,
      message: loggedOutMessage
    }));
  }

  const drawerContent = (
    <div>
      <div className="NavigationTitle">
        <h1>My Little Savings</h1>
      </div>
      <Divider className="LightDivider"/>
      <h2>Finances</h2>
      <List>
        {dataForList.slice(0, 2).map((item) => (
          <Link to={item.link} className={classes.link} key={item.text}>
            <ListItem button id={selected === item.index ? "selected" : ""}
                      className="NavItem">
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text}/>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider className="LightDivider"/>
      <List>
        {dataForList.slice(2, 3).map((item) => (
          <ListItem button key={item.text} id={selected === item.index ? "selected" : ""}
                    className="NavItem" onClick={handleLoggedOut}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text}/>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <nav className="Navigation">
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          classes={{paper: classes.paper}}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawerContent}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{paper: classes.paper}}
          variant="permanent"
          open
        >
          {drawerContent}
        </Drawer>
      </Hidden>
    </nav>
  )
}

export default Navigation;