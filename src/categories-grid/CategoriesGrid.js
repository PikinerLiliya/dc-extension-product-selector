import React from 'react';
import { connect } from 'react-redux';
import { CircularProgress, Grid, makeStyles } from '@material-ui/core';

import Pager from '../pager/Pager';
import FadeIn from '../fade-in/FadeIn';
import Category from '../category/Category';
import PaginationSummary from '../pagination-summary/PaginationSummary';

const styles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  items: {
    display: 'grid',
    gridTemplateColumns: '100%',
    justifyContent: 'space-between',
    width: '100%',
    '@media(min-width: 450px)': {
      gridTemplateColumns: '50% 50%'
    },
    '@media(min-width: 800px)': {
      gridTemplateColumns: '25% 25% 25% 25%'
    },
    '@media(min-width: 1024px)': {
      gridTemplateColumns: '20% 20% 20% 20% 20%'
    }
  },
  loader: {
    margin: theme.spacing(2)
  }
}));

export const ProductsGridComponent = params => {
  const classes = styles();

  return (
    <div className={classes.root}>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <FadeIn show={params.items.length && !params.loading}>
            <PaginationSummary />
          </FadeIn>
        </Grid>
      </Grid>

      <FadeIn 
        show={params.loading}
        exitOptions={{ position: 'absolute' }}>
        <CircularProgress className={classes.loader} />
      </FadeIn>
  
      <div className={classes.items}>
        {
          !params.loading &&
          params.items.map(item => <Category key={item.id} item={item} />)
        }
      </div>
  
      <FadeIn show={params.items.length && !params.loading}>
        <Pager />
      </FadeIn>
    </div>
  );
};

const CategoriesGrid = connect(
  state => ({
    items: state.categories,
    loading: state.isFetching,
    initialised: state.initialised,
    backend: state.backend
  }),
  null
)(ProductsGridComponent);

export default CategoriesGrid;
