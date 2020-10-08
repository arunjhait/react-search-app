import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';


const useStyles = () => ({
  mainSkeleton: {
    width: '100%',
    height: 100,
  },
  skeleton: {
    width: '100%',
    height: 200,
    marginTop: 15
  }
});

const Skeletons = ({ classes }) => {

  return (
    <Grid container justify="center" spacing={2}>
      <Skeleton className={classes.mainSkeleton} />
      {Array.from(new Array(12)).map(() => (
        <Grid key={Math.random()} item xs={12} sm={4} role="listitem">
          <Skeleton variant="rect" className={classes.skeleton} />
        </Grid>
      ))}
    </Grid>
  )
};

export default (withStyles(useStyles)(Skeletons));