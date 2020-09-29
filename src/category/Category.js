import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Clear} from '@material-ui/icons';
import {Card, CardContent, CardHeader, IconButton, makeStyles} from '@material-ui/core';
import {toggleProduct} from '../store/selectedItems/selectedItems.actions';

import find from 'lodash/find';
import FadeIn from '../fade-in/FadeIn';

import './category.scss';

const styles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%',
    transition: 'border-width 0.3s',
    border: ({isSelected}) => (isSelected ? `1px solid ${theme.palette.grey[500]}` : 'none'),
    margin: ({isSelected}) => (isSelected ? '6px' : theme.spacing(1)),
    opacity: ({readOnly}) => readOnly ? '0.6' : '',
    pointerEvents: ({readOnly}) => readOnly ? 'none' : ''
  },
  cardWrapper: {
    height: '100%',
    display: 'flex'
  },
  thumbnail: {
    paddingBottom: '100%',
    marginTop: 'auto',
    backgroundColor: ({hasImage}) => (hasImage ? 'transparent' : theme.palette.grey[100])
  },
  removeBtn: {
    marginLeft: theme.spacing(1)
  }
}));

export const CategoryComponent = params => {
  const [visible, setVisible] = useState(false);
  const isRemovable = params.variant === 'removable';
  const isSelected = Boolean(find(params.selectedCategories, {id: params.item.id}));
  const {readOnly} = params.SDK.form;
  const toggle = () => {
    debugger;
    return params.toggleProduct(params.item, isSelected);
  }

  const hideProduct = () => {
    setVisible(true);
    toggle();
  };

  useEffect(() => setVisible(true), []);

  const {name, id, parent} = params.item;
  const {backend: {locale = 'en'}} = params;

  const classes = styles({
    isSelected,
    readOnly,
  });

  const CardAction = () => (
    <IconButton
      aria-label="Remove"
      onClick={hideProduct}
      className={classes.removeBtn}>
      <Clear/>
    </IconButton>
  );

  return (
    <FadeIn
      show={visible}
      className={classes.cardWrapper}>
      <Card
        className={'product ' + classes.root}
        raised={isSelected}
        onClick={isRemovable ? null : toggle}>

        <CardHeader
          action={isRemovable && <CardAction/>}
          title={name[locale]}
          subheader={`ID: ${id}`}
          titleTypographyProps={{variant: 'subtitle1'}}
          subheaderTypographyProps={{variant: 'body2'}}/>
        {parent ? (<CardContent
          titleTypographyProps={{variant: 'subtitle1'}}
        >
          {'Parent category - ' + parent.name[locale]}
        </CardContent>) : ''}
      </Card>
    </FadeIn>
  );
};

const Category = connect(
  ({selectedCategories, backend, SDK}) => ({selectedCategories, backend, SDK}),
  ({toggleProduct})
)(CategoryComponent);

export default Category;
