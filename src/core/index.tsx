import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Header from './components/Header';
import Routes from './routes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      minWidth: '100vw',
      minHeight: '100vh',
      top: 0,
      left: 0,
      backgroundColor: '#f1f1f1'
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    },
    content: {
      marginTop: theme.spacing(5),
      flexGrow: 1
    }
  }),
);


const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Header />

        <main className={classes.content}>
          <Routes />
        </main>
      </Container>
    </div>
  );
}

export default App;