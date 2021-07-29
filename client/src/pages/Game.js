import React from "react";

import { Typography, makeStyles, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  outer: {
    minHeight: '100vh',
    display: 'flex',
    backgroundImage: `url(${"https://res.cloudinary.com/dqhd5slcy/image/upload/v1627415371/background_dijj6c.png"})`,
    backgroundSize: 'cover'
  },
  container: {
    position: 'relative',
    display: 'flex',
    width: '30%',
    padding: '20px',
    margin: 'auto auto auto auto',
    boxShadow:
      '0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18)',
    border: '2px solid #ffc400',
    borderRadius: '10px',
    textAlign: 'center',
    background: 'linear-gradient(0deg, #006600 30%, #003300 90%)',
    minHeight: '80vh',
    maxHeight: '90%',
    [theme.breakpoints.down('xl')]: {
      width: '85%',
    },
  },
  white: {
    color: '#ffc400'
  },
  red: {
    color: '#ff0000'
  },
  dealer: {
    width: '50%',
    borderTop: '5px solid #ffc400',
    marginTop: '30px',
    marginBottom: '10px',
    marginLeft: '25%'
  },
  player1: {
    width: '50%',
    borderTop: '5px solid #ffc400',
    marginTop: '100%',
    marginBottom: '30px',
    marginLeft: '-300%'
  },
  player2: {
    width: '50%',
    borderTop: '5px solid #ffc400',
    marginTop: '100px',
    marginBottom: '30px',
    marginLeft: '-200%'
  },
  player3: {
    width: '50%',
    borderTop: '5px solid #ffc400',
    marginTop: '100px',
    marginBottom: '0px',
    marginLeft: '-75%'
  },
  player4: {
    width: '50%',
    borderTop: '5px solid #ffc400',
    marginTop: '-6px',
    marginBottom: '30px',
    marginLeft: '100%'
  },
  player5: {
    width: '50%',
    borderTop: '5px solid #ffc400',
    marginTop: '-143px',
    marginBottom: '30px',
    marginLeft: '250%'
  },
  player6: {
    width: '50%',
    borderTop: '5px solid #ffc400',
    marginTop: '-141px',
    marginBottom: '30px',
    marginLeft: '350%'
  },
  inner: {
    marginTop: '30px',
    margin: 'auto'
  }
}))

const GamePage = () => {
  const classes = useStyles();

  return (
    <div className={classes.outer}>
      <div className={classes.container}>
        <div className={classes.inner}>
          <Typography variant="h2" className={classes.white}>Mint Jack</Typography>
          <Typography variant="body2" className={classes.white}>Please Wait To Join The Game</Typography>
          <Divider className={classes.dealer} />
          <Typography variant="h4" className={classes.red}>Dealer</Typography>
          <Divider className={classes.player1} />
          <Divider className={classes.player2} />
          <Divider className={classes.player3} />
          <Divider className={classes.player4} />
          <Divider className={classes.player5} />
          <Divider className={classes.player6} />
        </div>
      </div>
    </div>
  )

}

export default GamePage;