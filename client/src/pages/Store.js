import React, { useEffect, useState } from 'react';
import { useUserContext, useUserUpdateContext } from '../contextProvider/user';
import { makeStyles, Box, Typography, Grid, Modal, Divider, Avatar, Button } from "@material-ui/core";
import ExitButton from '../components/ExitButton';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { avatarMap } from '../helper/imageMap'
import StoreItem from '../components/StoreItem';
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        display: 'flex',
        width: '60%',
        padding: '20px',
        margin: '10vh auto auto auto',
        boxShadow:
            '0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18)',
        border: '2px solid #ffc400',
        borderRadius: '10px',
        textAlign: 'center',
        background: 'radial-gradient(circle, rgba(33,33,33,1) 0%, rgba(25,25,25,1) 35%, rgba(0,0,0,1) 100%)',
        minHeight: '80vh',
        maxHeight: '90%',
        [theme.breakpoints.down('md')]: {
            width: '80%',
        },
    },
    divider: {
        width: '102%',
        borderTop: '1px solid #ffc400',
        marginTop: '80px',
        marginBottom: '30px',
        transform: 'translateX(-20px)',
        [theme.breakpoints.down('xs')]: {
            marginTop: '50px',
            transform: 'translateX(-40px)',
            width: '125%'
        },
    },
    dividerV: {
        height: '95%',
        position: 'absolute',
        transform: 'translateX(100px)',
        borderLeft: '1px solid #ffc400',
        [theme.breakpoints.down('xs')]: {
            transform: 'translate(40px, -20px)',
            height: '95%'
        },
    },
    gold: {
        color: '#ffc400'
    },
    shiftDown: {
        transform: 'translateY(3px)'
    },
    selected: {
        border: '1px solid #ffc400'
    },
    unselected: {
        '&:hover': {
            border: '1px solid #ffc400',
            cursor: 'pointer'
        }
    },
    topLeft: {
        borderRight: '1px solid #ffc400',
        borderBottom: '1px solid #ffc400',
        height: '15%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    topRight: {
        borderLeft: '1px solid #ffc400',
        borderBottom: '1px solid #ffc400',
        height: '15%',
        display: 'flex',
        alignItems: "center",
        justifyContent: "flex-end"
    },
    bottomLeft: {
        borderTop: '1px solid #ffc400',
        borderRight: '1px solid #ffc400',
        height: '85%',
        padding: '20px 20px 0px 0px',
        alignItems: "center",
        justifyContent: "flex-start",
        display: 'flex',
        flexDirection: "column"
    },
    bottomRight: {
        borderTop: '1px solid #ffc400',
        borderLeft: '1px solid #ffc400',
        padding: '20px',
        height: '85%',
        display: 'flex',
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        overflow: 'auto',
        [theme.breakpoints.down('xs')]: {
            padding: '10px'
        },
        scrollbarColor: '#424242 #212121',
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
            height: '12px',
            width: '12px',
            background: '#212121',
            borderRadius: '10px'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#424242',
            borderRadius: '10px'
        },
    },
    box: {
        width: '100%',
        height: '50px',
        marginBottom: '10px',
        borderRadius: '10px',
    },
    storeItem: {
        '&:hover': {
            cursor: 'pointer'
        }
    },
    modal: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid gold',
        height: '50%',
        width: '50%',
        background: 'radial-gradient(circle, rgba(33,33,33,1) 0%, rgba(25,25,25,1) 35%, rgba(0,0,0,1) 100%)',
        margin: "auto",
        borderRadius: '10px',
        textAlign: 'center'
    },
    divider: {
        width: '30%',
        borderTop: '1px solid #ffc400',
        marginTop: '30px',
        marginBottom: '30px',
    },
    buttonRed: {
        backgroundColor: '#f44336',
        color: '#212121',
        '&:hover': {
            backgroundColor: '#aa2e25'
        }
    },
    buttonGreen: {
        backgroundColor: '#4caf50',
        color: '#212121',
        '&:hover': {
            backgroundColor: '#357a38'
        }
    },
}))

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Store = () => {

    const classes = useStyles();
    const userState = useUserContext();
    const setUserState = useUserUpdateContext();
    const [selected, setSelected] = useState("avatars")
    const [ownedAvatars, setOwnedAvatars] = useState([])
    const [openSnackBar, setOpenSnackBar] = useState({ open: 'false', severity: '', message: '' })
    const [modal, setModal] = useState({ open: false, type: 'avatar', id: 'a0' })

    const handleSelected = (select) => {
        if (selected !== select) {
            setSelected(select)
        }
    }

    useEffect(() => {
        if (userState.username) {
            axios
                .get("http://localhost:5000/api/users/get-owned-avatars", {
                    params: {
                        email: userState.email
                    },
                })
                .then(res => {
                    setOwnedAvatars(res.data.avatar.owned)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [userState])

    const renderItems = () => {
        if (userState.username) {
            return selected === "avatars" ? Object.keys(avatarMap).map(avatar => <Box
                className={classes.storeItem}
                onClick={() => openModal("avatar", avatar)}
                key={avatar}>
                <StoreItem
                    id={avatar}
                    type="avatar"
                    src={avatarMap[avatar].src}
                    cost={avatarMap[avatar].cost}
                    owned={ownedAvatars.find(av => av === avatar)}

                />
            </Box>) : <Typography variant="h5" className={classes.gold}>Coming soon...</Typography>
        }

    }

    const openModal = (type, id) => {
        if (!ownedAvatars.find(av => av === id)) {
            if (avatarMap[id].cost > userState.balance) {
                setOpenSnackBar({ open: true, severity: "error", message: 'You do not have enough credits!' })
            } else {
                setModal({ open: true, type, id })
            }
        }
    }

    const purchase = (type, id) => {
        if (!ownedAvatars.find(av => av === id)) {
            if (avatarMap[id].cost > userState.balance) {
                setOpenSnackBar({ open: true, severity: "error", message: 'You do not have enough credits!' })
            } else {
                axios
                    .post("http://localhost:5000/api/users/purchase-avatar", {
                        id: id,
                        email: userState.email,
                        cost: avatarMap[id].cost
                    })
                    .then(res => {
                        setOpenSnackBar({ open: true, severity: "success", message: 'Purchase Successful!' })
                        setUserState({ ...res.data.payload, isAuth: true, currentMatchId: '' })
                        handleModalClose()
                    })
                    .catch(err => { console.log(err) })
            }
        }
    }

    const handleClose = (event, reason) => {
        setOpenSnackBar({ open: false, severity: "", message: '' })
    };

    const handleModalClose = () => {
        setModal({ open: false, type: 'avatar', id: 'a0' });
    };

    return (
        <div className={classes.container}>
            <Snackbar open={openSnackBar.open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity={openSnackBar.severity}>
                    {openSnackBar.message}
                </Alert>
            </Snackbar>
            <Modal
                open={modal.open}
                onClose={handleModalClose}
                className={classes.modal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            ><>
                    <Typography variant="h6" className={classes.gold}>Are you sure you want to purchase?</Typography>
                    <Divider className={classes.divider} />
                    <Avatar src={avatarMap[modal.id].src} />
                    <Typography variant="h6" className={classes.gold}><MonetizationOnIcon className={classes.shiftDown} />{avatarMap[modal.id].cost}</Typography>
                    <Divider className={classes.divider} />
                    <Box display="flex">
                        <Box p={1}>
                            <Button variant="contained" className={classes.buttonGreen} onClick={() => purchase("avatar", modal.id)}>Yes</Button>
                        </Box>
                        <Box p={1}>
                            <Button variant="contained" className={classes.buttonRed} onClick={handleModalClose}>No</Button>
                        </Box>
                    </Box>
                </>
            </Modal>
            <Grid container alignItems="flex-start">
                <Grid item xs={3} sm={2} lg={2} className={classes.topLeft} >
                    <ExitButton />
                </Grid>
                <Grid item xs={9} sm={10} lg={10} className={classes.topRight}>
                    <Typography variant="h5" className={classes.gold}>Your Balance: <MonetizationOnIcon className={classes.shiftDown} />{userState.balance}</Typography>
                </Grid>
                <Grid item xs={3} sm={2} lg={2} className={classes.bottomLeft}>
                    <Box className={classes.box + " " + (selected === "avatars" ? classes.selected : classes.unselected)}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        onClick={() => handleSelected("avatars")}>
                        <Typography variant="h6" className={classes.gold}>Avatars</Typography>
                    </Box>
                    <Box className={classes.box + " " + (selected === "cardbacks" ? classes.selected : classes.unselected)}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        onClick={() => handleSelected("cardbacks")}>
                        <Typography variant="h6" className={classes.gold}>Card Backs</Typography>
                    </Box>
                </Grid>
                <Grid item xs={9} sm={10} lg={10} className={classes.bottomRight}>
                    {renderItems()}
                </Grid>
            </Grid>
        </div>
    );
}

export default Store;