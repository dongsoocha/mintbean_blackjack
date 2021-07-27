import React, { useState } from "react";

import { Typography, makeStyles, Divider, Button } from "@material-ui/core";
import { Route, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  outer: {
    height: '100vh',
    display: 'flex',
    backgroundImage: `url(${"https://res.cloudinary.com/dqhd5slcy/image/upload/v1627415371/background_dijj6c.png"})`,
    backgroundSize: 'cover'
  },
  container: {
    position: 'relative',
    display: 'flex',
    width: '30%',
    margin: 'auto auto auto auto',
    boxShadow:
      '0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18)',
    border: '2px solid #9e9e9e',
    borderRadius: '10px',
    textAlign: 'center',
    backgroundColor: '#212121',
    minHeight: '80vh',
    [theme.breakpoints.down('md')]: {
      width: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  white: {
    color: 'white'
  },
  divider: {
    width: '50%',
    borderTop: '1px solid white',
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
  }
}))

const LandingPage = () => {
  const classes = useStyles();
  const [page, setPage] = useState("default")

  return (
    <div className={classes.outer}>
      <div className={classes.container}>
        <div className={classes.inner}>
          <Typography variant="h2" className={classes.white}>MintJack</Typography>
          <Typography variant="body2" className={classes.white}>An online multiplayer web app</Typography>
          <Divider className={classes.divider} />
          <Typography variant="h4" className={classes.white + " " + classes.m30}>Have an account?</Typography>
          <Button variant="contained" className={classes.landingButton}>Log In</Button>
          <Typography variant="h4" className={classes.white + " " + classes.m30}>Need an account?</Typography>
          <Button variant="contained" className={classes.landingButton}>Register</Button>
          <Divider className={classes.divider} />
          <Typography variant="body2" className={classes.white}>Don't want to register? Continute as guest.</Typography>
        </div>
      </div>
    </div>
  )

}

export default LandingPage;