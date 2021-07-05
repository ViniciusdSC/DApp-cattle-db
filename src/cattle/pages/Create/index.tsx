import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';

import AppPaper from 'core/components/Paper';
import { Cattle } from 'cattle/interfaces';
import { useHistory } from 'react-router-dom';
import { useCattleFactoryContract } from 'cattle/hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      padding: theme.spacing(3),
      paddingTop: theme.spacing(0)
    },
    btn: {
      float: 'right',
    },
    spinner: {
      marginRight: theme.spacing(1)
    },
    breadcrumbs: {
      float: 'right',
      marginRight: theme.spacing(3)
    },
    link: {
      cursor: 'pointer'
    }
  }),
);

const CattleCreate: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const cattleFactoryContract = useCattleFactoryContract();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const formik = useFormik<Partial<Cattle>>({
    validationSchema: yup.object().shape({
      name: yup.string().required(),
      description: yup.string().required(),
      token: yup.string().required()
    }),
    initialValues: {
      name: '',
      description: '',
      token: '',
    },
    async onSubmit({ name, description, token }) {
      try {
        if (!isLoading && cattleFactoryContract) {
          console.log({ name, description, token });
          setIsLoading(true);

          await cattleFactoryContract.store(name, description, token);

          history.push('/cattle');

          setIsLoading(false);
        }
      } catch (err) {
        console.log('err', err);
        setIsLoading(false);
      }
    }
  });

  return (
    <>
      <Breadcrumbs className={classes.breadcrumbs} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link className={classes.link} color="inherit" onClick={() => history.push('/cattle')}>
          Biggest Cattles
        </Link>
        <Typography color="textPrimary">New Cattle</Typography>
      </Breadcrumbs>
      <AppPaper title="New Cattle">
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item md={6} sm={12}>
              <TextField
                margin="dense"
                fullWidth
                label="Cattle name"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                name="name"
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <TextField
                margin="dense"
                fullWidth
                label="Your wallet public key"
                variant="outlined"
                value={formik.values.token}
                onChange={formik.handleChange}
                name="token"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                fullWidth
                label="Cattle description"
                variant="outlined"
                value={formik.values.description}
                onChange={formik.handleChange}
                name="description"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button className={classes.btn} type="submit" variant="outlined" color="primary" startIcon={isLoading && (
                <CircularProgress className={classes.spinner} size={20} />
              )}>
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </AppPaper>
    </>
  )
}

export default CattleCreate;