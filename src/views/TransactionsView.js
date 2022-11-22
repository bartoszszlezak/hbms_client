import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
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
  Paper,
  TextField
} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus,} from "@fortawesome/free-solid-svg-icons";
import Transaction from "../components/Transaction";
import {Link, useParams} from 'react-router-dom';
import iconPicker from "../assets/iconPicker";
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    display: "flex",
    height: "5em",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 2em",
  },
  headerTitle: {
    display: "flex",
    alignItems: "center",
    fontSize: "2em",
    fontWeight: "bold"
  },
  card: {
    minHeight: "30vh",
    width: "80%",
    margin: "20vh auto 2em auto",
    borderRadius: "1em",
  },
  avatarHeader: {
    width: "2em",
    height: "2em",
    fontSize: "0.9em",
    marginRight: "1em"
  },
  list: {
    padding: theme.spacing(3)
  },
  addButton: {
    background: "#009BE5",
    color: "#ffffff",
    '&:hover': {
      backgroundColor: "#008AD4",
    }
  },
  dialogInputs: {
    width: "100%"
  },
  link: {
    color: "inherit",
    display: "flex",
    textDecoration: "none"
  }
}));

function comparator(a, b) {
  return (a.day > b.day) ? 1 : (a.day === b.day) ? ((a.day > b.day) ? 1 : -1) : -1
}



const TransactionView = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState({
    icon: "faShoppingCart",
    color: "#F8A648",
    typeName: "Shopping"
  });
  const [transactionsList, setTransactionsList] = useState({
    isLoaded: true,
    data: [
      {
        id:1,
        name: "Hat",
        date: "21-11-2022",
        day: 21,
        value: -100.00
      },
      {
        id:2,
        name: "T-shirt",
        date: "22-11-2022",
        day: 22,
        value: -70.99
      },
    ]
  });
  const [transaction, setTransaction] = useState({
    name: "",
    value: "",
    day: ""
  });

  useEffect(() => {}, [])

  const handleAddTransaction = () => {}

  const handleDeleteTransaction = (id) => {

  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTransaction({
      name: "",
      value: "",
      day: ""
    });
  };

  const handleChangeName = (e) => {
    let tempTransaction = {...transaction};
    switch (e.target.id) {
      case "TransactionName":
        tempTransaction.name = e.target.value;
        break;
      case "TransactionValue":
        tempTransaction.value = e.target.value;
        break;
      case "TransactionDay":
        tempTransaction.day = e.target.value;
        if (tempTransaction.day > 31)
          tempTransaction.day = 31;
        else if (tempTransaction.day < 1)
          tempTransaction.day = "";
        break;
    }
    setTransaction(tempTransaction);
  }

  const validateValue = (e) => {
    setTransaction(prev => ({...prev, value: parseFloat(e.target.value).toFixed(2)}))
  }


  return (
    <div>
      <Paper elevation={5} classes={{root: classes.card}}>
        <div className={classes.cardHeader}>
          <Link to={{pathname: "/user/categories", initialDate: category.date}} className={classes.link}>
            <div className={classes.headerTitle}>
              <Avatar classes={{root: classes.avatarHeader}} style={{background: category.color}}>
                <FontAwesomeIcon icon={iconPicker(category.icon)} style={{color: "#ffffff"}}/>
              </Avatar>
              {category.typeName}
            </div>
          </Link>
          <Button
            variant="contained"
            classes={{root: classes.addButton}}
            color="primary"
            startIcon={<FontAwesomeIcon icon={faPlus}/>}
            onClick={handleClickOpen}
          >
            Add Transaction
          </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Transaction</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Create a transaction. Set transaction name and value.
              </DialogContentText>
              <TextField id="TransactionName" className="TextInput" label="Name" variant="outlined"
                         classes={{root: classes.dialogInputs}} onChange={handleChangeName}
                         value={transaction.name} type="text"/>
              <TextField id="TransactionValue" className="TextInput" label="Value" variant="outlined"
                         classes={{root: classes.dialogInputs}} onChange={handleChangeName} onBlur={validateValue}
                         value={transaction.value} type="number"/>
              <TextField id="TransactionDay" className="TextInput" label="Day of month"
                         variant="outlined"
                         classes={{root: classes.dialogInputs}} onChange={handleChangeName}
                         value={transaction.day} type="number"/>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleAddTransaction} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Divider/>
        <List classes={{root: classes.list}}>
          {
            !transactionsList.isLoaded ?
              <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                <CircularProgress size={100} thickness={5}/>
              </div>
              :
              transactionsList.data.length === 0 ?
                <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                  <SentimentDissatisfiedIcon style={{fontSize: 100}}/>
                  <div>No Data</div>
                </div>
                :
                transactionsList.data.map((transaction, index) =>
                  <Transaction key={index}
                               data={transaction}
                               handleDeleteTransaction={handleDeleteTransaction}
                  />)
          }
        </List>
      </Paper>
    </div>
  )
}

export default TransactionView