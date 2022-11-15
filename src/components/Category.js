import React from "react";
import {ListItem,ListItemAvatar,ListItemText,Avatar} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  listItem:{
    borderRadius: "1em",
    transition: "transform 0.3s",
    '&:hover': {
      transform: "scale(1.02)"
    }
  },
  avatar:{
    width: "2em",
    height: "2em",
    fontSize: "1.5em"
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
}));

const Category = (props) => {
  const classes = useStyles();

  return(
    <ListItem button classes={{root: classes.listItem}}>
      <ListItemAvatar>
        <Avatar classes={{root: classes.avatar}} style={{background: props.data.color}}>
          <FontAwesomeIcon icon={props.iconImg} style={{color: "#ffffff"}}/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={props.data.typeName} secondary={`Records: ${props.data.recordsNumber}`} />
      {
        props.data.transactionsValue >= 0 ?
          <ListItemText primary={"+" + props.data.transactionsValue + "zł"} classes={{primary: classes.categoryCostPositive}}/>
          :
          <ListItemText primary={props.data.transactionsValue + "zł"} classes={{primary: classes.categoryCostNegative}}/>
      }
      <IconButton color="secondary" component="span" style={{marginLeft: 5}} onClick={(e) => {
        e.preventDefault();
        props.handleDeleteCategory(props.data.id)
      }}>
        <Delete/>
      </IconButton>
    </ListItem>
  )
}

export default Category