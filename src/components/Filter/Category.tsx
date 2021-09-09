import { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FilterMenu } from '../../util/FilterMenu';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { filterQueryStore as store, FilterQueryStoreType, FilterQueryStoreKeys } from '../../store/filterStore';
import { observer } from "mobx-react";
import { set, toJS } from 'mobx';
import { productCategory } from '../../const/constants.js';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import styles from './Category.module.scss';
import { ChangeEvent } from 'react';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    width: 280,
    fontSize: 13,
  },
  list: {
    padding: 0,
  }
})((props: {open: boolean; anchorEl: EventTarget | null; keepMounted: boolean; onClose: () => void}) => (
  <FilterMenu props={props} />
));

type CategoryFilterComponentProps = {
  store: FilterQueryStoreType
}

export const CategoryFilter = () => <CategoryFilterComponent store={store} />

const CategoryFilterComponent = observer(({store}: CategoryFilterComponentProps) => {
  const {filterButton, expandIcon, formControl, formControlLabel, formGroup, buttonClear, buttonConfirm} = styles;
  const [anchorEl, setAnchorEl] = useState<EventTarget | null>(null);
  const changeValue = async (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
      await set(store.categoryFilters, fieldName, e.target.checked);
      store.changeValue(FilterQueryStoreKeys.hack, !store.hack);
  }

  const handleClick = (e: ChangeEvent<EventTarget>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filters = toJS(store.categoryFilters);

  return (
    <div>
      <Button
        variant="contained"
        className={filterButton}
        onClick={handleClick}
      >
        Category
        {Boolean(anchorEl) ? <ExpandLessIcon className={expandIcon} /> : <ExpandMoreIcon className={expandIcon} />}
      </Button>
      <StyledMenu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <FormControl component="fieldset" className={formControl}>
          <FormGroup className={formGroup}>
            {productCategory.map((item) => 
            <FormControlLabel
              key={item}
              className={formControlLabel}
              control={<Checkbox color='default' 
                onChange={(e) => changeValue(e, item)}  name={item} checked={!!filters[item]}/>}
              label={item}
              />
            )}
            <div>
                <button className={buttonClear} onClick={()=>{
                  store.changeValue(FilterQueryStoreKeys.filter, !store.filter)
                  store.changeValue(FilterQueryStoreKeys.categoryFilters,{})}}>Clear</button>
                <button className={buttonConfirm} onClick={()=>{
                  store.changeValue(FilterQueryStoreKeys.filter, !store.filter);
                  handleClose()}}>Confirm</button>
            </div>
          </FormGroup>
        </FormControl>
      </StyledMenu>
    </div>
  );
})
