import React from 'react';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      borderBottom: `1px solid ${theme.palette.primary.main}`,
      borderLeft: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: 'transparent'
    },
    toolbarTitle: {
      marginRight: 'auto'
    }
  }),
);

interface Props {
  title?: string;
  actions?: React.ReactNode;
}

const AppPaper: React.FC<Props> = ({ children, title, actions }) => {
  const classes = useStyles();

  return (
    <Paper elevation={0} variant="elevation" className={classes.paper} square>
      <Toolbar>
        <Typography className={classes.toolbarTitle} variant="h6" id="tableTitle" component="div">
          {title}
        </Typography>
        {actions}
      </Toolbar>
      {children}
    </Paper>
  );
}

AppPaper.defaultProps = {
  title: '',
  actions: <></>
}

export default AppPaper;