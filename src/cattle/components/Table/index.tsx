import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { HeadCell } from './interfaces';
import { Cattle } from 'cattle/interfaces';
import CattleTableItem from './item';

const headCells: HeadCell[] = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Cattle name' },
  { id: 'votes', numeric: true, disablePadding: false, label: 'Cattle power' }
];

interface Props {
  cattles: Cattle[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableContainer: {
      padding: theme.spacing(0, 3),
      width: 'auto'
    },
    btn: {
      float: 'right'
    }
  }),
);

const CattleTable: React.FC<Props> = ({ cattles }) => {
  const classes = useStyles();

  return (
    <TableContainer className={classes.tableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell key={headCell.id}>{headCell.label}</TableCell>
            ))}
            <TableCell key={'actions'}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cattles.map(row => <CattleTableItem key={row.address} cattle={row} />)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CattleTable