import React from "react";
import {Avatar, LinearProgress, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import makeStyles from "@material-ui/core/styles/makeStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import iconPicker from "../assets/iconPicker";
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
        width: "2em",
        height: "2em",
        fontSize: "1.5em"
    },
    budgetValueAlign: {
        textAlign: "right"
    },
    budgetValue: {
        fontSize: "1.3em",
        color: "#039BE5",
        fontWeight: "bold"
    },
    budgetTitle: {
        fontSize: "1.3em",
    },
}));

const Budget = (props) => {
    const classes = useStyles();

    const BorderLinearProgress = withStyles((theme) => ({
        root: {
            height: 10,
            borderRadius: 5,
            width: "100%",
        },
        colorPrimary: {
            backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
        },
        bar: props.data.spentValue > 0 ?
            {
                borderRadius: 5,
                backgroundColor: '#1a90ff',
            } :
            {
                borderRadius: 5,
                backgroundColor: '#FB0A43',
            }
    }))(LinearProgress);

    return (
        <ListItem button classes={{root: classes.listItem}}>
            <ListItemAvatar>
                <Avatar classes={{root: classes.avatar}} style={{background: props.data.color}}>
                    <FontAwesomeIcon icon={iconPicker(props.data.icon)} style={{color: "#ffffff"}}/>
                </Avatar>
            </ListItemAvatar>
            <div style={{width: "80%"}}>
                <ListItemText primary={props.data.typeName} classes={{primary: classes.budgetTitle}}/>
                <BorderLinearProgress variant="determinate" value={props.data.progress}/>
            </div>
            <ListItemText primary={`${props.data.value} zł`}
                          secondary={
                              props.data.spentValue > 0 ?
                                  `Left ${props.data.spentValue} zł` :
                                  `Over ${Math.abs(props.data.spentValue).toFixed(2)} zł`
                          }
                          classes={{root: classes.budgetValueAlign, primary: classes.budgetValue}}/>
            <IconButton color="secondary" component="span" style={{marginLeft: 5}} onClick={() => {
                props.handleDeleteBudget(props.data.id)
            }}>
                <Delete/>
            </IconButton>
        </ListItem>
    )
}

export default Budget