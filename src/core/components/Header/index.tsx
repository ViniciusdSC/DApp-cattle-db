import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appbar: {
      background: 'transparent',
      borderBottom: `1px solid ${theme.palette.divider}`
    },
    title: {
      flexGrow: 1,
      color: theme.palette.text.primary,
      fontSize: 44,
      padding: '1rem 0px'
    },
  }),
);

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appbar} position="static" elevation={0}>
      <Toolbar>
        <Typography variant="h1" className={classes.title}>
          Cattle DB
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header;