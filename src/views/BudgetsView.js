import React, {useEffect, useState} from "react";
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
import makeStyles from "@material-ui/core/styles/makeStyles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus,} from "@fortawesome/free-solid-svg-icons";
import Budget from "../components/Budget";
import axios from "axios";
import {
    confirmDeleteMessage,
    deleteBudgetURL,
    getBudgetsURL,
    getCategoryTypesURL,
    postBudgetURL
} from "../assets/properties";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import iconPicker from "../assets/iconPicker";
import PanToolIcon from '@material-ui/icons/PanTool';

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
    select: {
        display: "flex",
        alignItems: "center",
    },
    avatar: {
        width: "2em",
        height: "2em",
        fontSize: "1em",
    },
    dialog: {
        width: "30%"
    }
}));

const BudgetsView = () => {
    const classes = useStyles();
    const [isPremiumUser, setIsPremiumUser] = useState(true)
    const [open, setOpen] = useState(false);
    const [budgetsList, setBudgetsList] = useState({
        isLoaded: false,
        data: []
    })
    const [selectedBudget, setSelectedBudget] = useState([])
    const [selectedBudgetValue, setSelectedBudgetValue] = useState("")
    const [categoriesTypes, setCategoriesTypes] = useState([]);
    const [date, setDate] = useState(() => {
        const now = new Date();
        const month = (now.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2})
        return now.getFullYear() + "-" + month;
    });
    const jwtConfig = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        }
    };

    useEffect(() => {
        setBudgetsList({
            isLoaded: false,
            data: []
        })

        axios.get(getBudgetsURL + date, jwtConfig)
            .then(resp => {
                let budgets = resp.data.map(budget => {
                    budget.value = parseFloat(budget.value).toFixed(2);
                    budget.spentValue = budget.spentValue < 0 ? (parseFloat(budget.value) + parseFloat(budget.spentValue)).toFixed(2) : (budget.value);
                    budget.progress = ((parseFloat(budget.value) - parseFloat(budget.spentValue)) / parseFloat(budget.value)) * 100;
                    budget.progress = budget.progress > 100 ? 100 : budget.progress;
                    return {...budget}
                })

                setBudgetsList({
                    isLoaded: true,
                    data: [...budgets]
                })
            })
            .catch(() => {
                setIsPremiumUser(false)
            })
    }, [date])

    useEffect(() => {
        axios.get(getCategoryTypesURL, jwtConfig)
            .then(resp => {
                setCategoriesTypes(resp.data);
            })
    }, [])

    function handleAddBudget() {
        if (selectedBudgetValue !== "" && selectedBudget.length !== 0) {
            axios.post(postBudgetURL, {
                ...selectedBudget,
                date: date,
                value: selectedBudgetValue,
            }, jwtConfig)
                .then(resp => {
                    let data = resp.data;
                    data.value = parseFloat(data.value).toFixed(2);
                    data.spentValue = data.spentValue < 0 ? (parseFloat(data.value) + parseFloat(data.spentValue)).toFixed(2) : data.value;
                    data.progress = (((parseFloat(data.value) - parseFloat(data.spentValue)) / parseFloat(data.value)) * 100);
                    data.progress = data.progress > 100 ? 100 : data.progress;
                    setBudgetsList(prev => ({
                        isLoaded: true,
                        data: [...prev.data, data]

                    }))
                })

            setOpen(false);
            setSelectedBudget([])
            setSelectedBudgetValue("");
        } else {
            alert("Fill all inputs")
        }
    }

    function handleDeleteBudget(id) {
        if (window.confirm(confirmDeleteMessage)) {
            axios.delete(deleteBudgetURL + id, jwtConfig)
                .then(() => {
                    setBudgetsList(prev => ({...prev, data: prev.data.filter(b => b.id !== id)}))
                })
        }
    }

    const handleClose = () => {
        setOpen(false);
        setSelectedBudget([])
        setSelectedBudgetValue("");
    };

    function validateInput() {
        let value = selectedBudgetValue;
        if (value < 0) {
            value = 1;
        }
        setSelectedBudgetValue(parseFloat(value).toFixed(2))
    }


    return (
        <div>
            {
                !isPremiumUser ?
                    <Paper elevation={5} classes={{root: classes.card}}>
                        <div style={{
                            width: "100%",
                            paddingTop: "4em",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}>
                            <PanToolIcon style={{fontSize: 100}}/>
                            <div>For Premium Users Only!</div>
                        </div>
                    </Paper>
                    :
                    <Paper elevation={5} classes={{root: classes.card}}>
                        <div className={classes.cardHeader}>
                            <TextField
                                id="date"
                                type="month"
                                value={date}
                                onChange={event => setDate(event.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Button
                                variant="contained"
                                classes={{root: classes.addButton}}
                                color="primary"
                                startIcon={<FontAwesomeIcon icon={faPlus}/>}
                                onClick={() => setOpen(true)}
                            >
                                Add Budget
                            </Button>
                            <Dialog open={open} onClose={handleClose} classes={{paper: classes.dialog}}>
                                <DialogTitle id="form-dialog-title">Add Budget</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Create a budget. Set budget name and goal.
                                    </DialogContentText>
                                    <Select
                                        labelId="select"
                                        id="categorySelect"
                                        value={selectedBudget}
                                        onChange={event => {
                                            setSelectedBudget(event.target.value)
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
                                    <TextField id="BudgetGoal" className="TextInput" label="Value" variant="outlined"
                                               type="number"
                                               value={selectedBudgetValue}
                                               onChange={event => setSelectedBudgetValue(event.target.value)}
                                               onBlur={validateInput}
                                               classes={{root: classes.dialogInputs}}/>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleAddBudget} color="primary">
                                        Confirm
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        <Divider/>
                        <List classes={{root: classes.list}}>
                            {
                                !budgetsList.isLoaded ?
                                    <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                                        <CircularProgress size={100} thickness={5}/>
                                    </div>
                                    :
                                    budgetsList.data.length === 0 ?
                                        <div style={{
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center"
                                        }}>
                                            <SentimentDissatisfiedIcon style={{fontSize: 100}}/>
                                            <div>No Data</div>
                                        </div>
                                        :
                                        budgetsList.data.map((budget, index) =>
                                            <Budget
                                                key={index}
                                                data={budget}
                                                handleDeleteBudget={handleDeleteBudget}
                                            />)
                            }
                        </List>
                    </Paper>
            }
        </div>
    )
}

export default BudgetsView