import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    background: theme.palette.primary.main,
  },
  headerText: {
    fontSize: 28,
    color: '#fff'
  }
});

const Header = (props) => {
  const { classes } = props;
  return (
    <header className={classes.root}>
      <h1 className={classes.headerText}>Search App</h1>
    </header>
  )
};

export default withStyles(styles)(Header);