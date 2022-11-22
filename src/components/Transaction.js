import React from "react";
import {ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  listItem: {
    borderRadius: "1em",
    transition: "transform 0.3s",
    '&:hover': {
      transform: "scale(1.02)"
    }
  },
  avatar: {
    fontSize: "2.5em",
    fontWeight: 600
  },
  categoryCostPositive: {
    textAlign: "right",
    fontSize: "1.3em",
    color: "#039BE5",
    fontWeight: "bold"
  },
  categoryCostNegative: {
    textAlign: "right",
    fontSize: "1.3em",
    color: "#FB0A43",
    fontWeight: "bold"
  },
  titleText: {
    fontWeight: 600
  }
}));

const Transaction = (props) => {
  const classes = useStyles();
  return (
    <ListItem classes={{root: classes.listItem}}>
      <ListItemAvatar classes={{root: classes.avatar}}>
        {props.data.day}
      </ListItemAvatar>
      <ListItemText primary={props.data.name} secondary={props.data.date} classes={{primary: classes.titleText}}/>
      {
        props.data.value >= 0 ?
          <ListItemText primary={"+" + props.data.value + "zł"}
                        classes={{primary: classes.categoryCostPositive}}/>
          :
          <ListItemText primary={props.data.value + "zł"} classes={{primary: classes.categoryCostNegative}}/>
      }
      <IconButton color="secondary" component="span" style={{marginLeft: 5}} onClick={() => {
        props.handleDeleteTransaction(props.data.id)
      }}>
        <Delete/>
      </IconButton>
    </ListItem>
  )
}

export default Transaction