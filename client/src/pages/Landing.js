import React, { useState } from "react";

import { Typography, makeStyles, Divider } from "@material-ui/core";
import LandingDefault from "../components/LandingDefault";
import Login from "../components/Login";
import Register from "../components/Register";

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    width: '30%',
    padding: '20px',
    margin: '10vh auto auto auto',
    boxShadow:
      '0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18)',
    border: '2px solid #ffc400',
    borderRadius: '10px',
    textAlign: 'center',
    background: 'rgb(33,33,33)',
    background: 'radial-gradient(circle, rgba(33,33,33,1) 0%, rgba(25,25,25,1) 35%, rgba(0,0,0,1) 100%)',
    minHeight: '80vh',
    maxHeight: '90%',
    [theme.breakpoints.down('md')]: {
      width: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  gold: {
    color: '#ffc400'
  },
  divider: {
    width: '50%',
    borderTop: '1px solid #ffc400',
    marginTop: '30px',
    marginBottom: '30px',
    marginLeft: '25%'
  },
  landingButton: {
    width: '100px',
  },
  inner: {
    margin: 'auto'
  },
  m30: {
    marginTop: '20px',
    marginBottom: '20px'
  },
  button: {
    backgroundColor: '#ffc400',
    color: '#212121',
    '&:hover': {
      backgroundColor: '#b28900'
    }
  }
}))

const LandingPage = () => {
  const classes = useStyles();
  const [page, setPage] = useState("default")

  return (
    <div className={classes.container}>
      <div className={classes.inner}>
        <Typography variant="h2" className={classes.gold}>MintJack</Typography>
        <Typography variant="body2" className={classes.gold}>An online multiplayer web app</Typography>
        <Divider className={classes.divider} />
        <LandingDefault checked={page === "default"} setPage={setPage} />
        <Login checked={page === "login"} setPage={setPage} />
        <Register checked={page === "register"} setPage={setPage} />
      </div>
    </div>
  )

}

export default LandingPage;