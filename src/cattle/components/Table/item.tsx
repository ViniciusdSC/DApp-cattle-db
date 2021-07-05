import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Cattle } from 'cattle/interfaces';

interface Props {
  cattle: Cattle;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableContainer: {
      padding: theme.spacing(0, 3),
      width: 'auto'
    },
    btn: {
      float: 'right'
    },
    spinner: {
      marginRight: theme.spacing(1)
    }
  }),
);

const CattleTableItem: React.FC<Props> = ({ cattle }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function _handleVote() {
    try {
      setIsLoading(true);

      await cattle.addVote();

      setIsLoading(false);
    } catch (err) {
      console.log('err', err);
      setIsLoading(false);
    }
  }

  return (
    <TableRow key={cattle.name}>
      <TableCell component="th" scope="row">
        {cattle.name}
      </TableCell>
      <TableCell component="th" scope="row">
        {cattle.votes}
      </TableCell>
      <TableCell component="th" scope="row">
        <Button onClick={_handleVote} className={classes.btn} variant="outlined" color="primary" startIcon={isLoading && (
          <CircularProgress className={classes.spinner} size={20} />
        )}>
          Vote
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default CattleTableItem;