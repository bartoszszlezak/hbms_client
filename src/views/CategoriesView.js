import React, {useEffect, useState} from "react";
import Category from "../components/Category";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Link} from 'react-router-dom';
import {
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  List,
  ListItemAvatar,
  MenuItem,
  Paper,
  Select,
  TextField
} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import iconPicker from "../assets/iconPicker";

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    display: "flex",
    height: "5em",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 2em",
  },
  card: {
    minHeight: "30vh",
    width: "80%",
    margin: "20vh auto 2em auto",
    borderRadius: "1em",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "10em",
  },
  addButton: {
    background: "#009BE5",
    color: "#ffffff",
    '&:hover': {
      backgroundColor: "#008AD4",
    }
  },
  list: {
    padding: theme.spacing(3)
  },
  select: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: "2em",
    height: "2em",
    fontSize: "1em",
  },
  link: {
    color: "inherit",
    display: "flex",
    textDecoration: "none"
  },
}));


const CategoriesView = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [categoriesTypes, setCategoriesTypes] = useState([]);
  const [categories, setCategories] = useState({
    isLoaded: true,
    data: [
      {
        icon: "faShoppingCart",
        color: "#F8A648",
        typeName: "Shopping",
        transactionsValue: -1000.0
      },
      {
        icon: "faSmileBeam",
        color: "#4848F8",
        typeName: "Entertainment",
        transactionsValue: -1000.0
      },
      {
        icon: "faPlane",
        color: "#38C21E",
        typeName: "Travel",
        transactionsValue: -500.0
      },
    ]
  });
  const [date, setDate] = useState("");

  // Get jwt token
  useEffect(() => {}, [])

  const handleAddCategory = () => {}

  const handleDeleteCategory = (categoryId) => {}

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory([]);
  };

  return (
    <div>
      <Paper elevation={5} classes={{root: classes.card}}>
        <div className={classes.cardHeader}>
          <TextField
            id="date"
            type="month"
            value={date}
            onChange={event => {
              setDate(event.target.value)
            }}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            variant="contained"
            classes={{root: classes.addButton}}
            color="primary"
            startIcon={<FontAwesomeIcon icon={faPlus}/>}
            onClick={() => {
              setOpen(true)
            }}
          >
            Add Category
          </Button>
        </div>
        <Divider/>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Choose a category you want to create
            </DialogContentText>
            <Select
              labelId="select"
              id="categorySelect"
              value={selectedCategory}
              onChange={event => {
                setSelectedCategory(event.target.value)
              }}
              style={{width: "100%"}}
              classes={{root: classes.select}}
            >
              {
                categoriesTypes.map((category, index) => (
                  <MenuItem key={index} value={category}>
                    <ListItemAvatar>
                      <Avatar classes={{root: classes.avatar}}
                              style={{background: category.color}}>
                        <FontAwesomeIcon icon={iconPicker(category.icon)}
                                         style={{color: "#ffffff"}}/>
                      </Avatar>
                    </ListItemAvatar>
                    {category.name}
                  </MenuItem>
                ))
              }
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddCategory} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <List classes={{root: classes.list}}>
          {
            !categories.isLoaded ?
              <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                <CircularProgress size={100} thickness={5}/>
              </div>
              :
              categories.data.length === 0 ?
                <div style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}>
                  <SentimentDissatisfiedIcon style={{fontSize: 100}}/>
                  No Data
                </div>
                :
                categories.data.map((category) =>
                  <Link to={"/transactions/" + category.id}
                        className={classes.link}
                        key={category.id}>
                    <Category
                      data={category}
                      handleDeleteCategory={handleDeleteCategory}
                      iconImg={iconPicker(category.icon)}/>
                  </Link>
                )
          }
        </List>
      </Paper>
    </div>
  )
}

export default CategoriesView