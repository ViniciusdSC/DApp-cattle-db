import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from 'react-router-dom';

import CattleTable from 'cattle/components/Table';
import AppPaper from 'core/components/Paper/index';
import { useCattleList } from 'cattle/hooks';

const CattleHome: React.FC = () => {
  const history = useHistory();
  const cattleList = useCattleList();

  const CattleActions = (
    <Tooltip title="Create a new Cattle">
      <Button variant="outlined" color="primary" onClick={() => history.push('/cattle/create')}>
        New Cattle
      </Button>
    </Tooltip>
  )

  return (
    <AppPaper title="Biggest Cattles" actions={CattleActions}>
      <CattleTable cattles={cattleList} />
    </AppPaper>
  )
}

export default CattleHome;