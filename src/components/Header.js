import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import "../css/components/Header.css";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {deepPurple} from "@material-ui/core/colors";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  paper: {
    background: "#009BE5",
    color: "#ffffff",
    height: "100%",
    width: "100%",
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    boxSizing: "border-box"
  },
  avatar: {
    display: "inline-block",
    width: theme.spacing(6),
    height: theme.spacing(6)
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginBottom: "auto",
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

const Header = (props) => {
  const {username ,title ,handleDrawerToggle} = props.data
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Paper classes={{root: classes.paper}} elevation={5}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <FontAwesomeIcon icon={faBars}/>
        </IconButton>
        <div>
          <h1>{title}</h1>
        </div>
        <div className="InnerDiv">
          <div className="UserDiv">
            <span>{username}</span>
            <Avatar className={classes.purple}>{username[0]}</Avatar>
          </div>
        </div>
      </Paper>
    </AppBar>
  )
}

export default Header;