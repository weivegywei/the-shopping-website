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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import styles from './Manufacturer.module.scss';
import { ChangeEvent } from 'react';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    height: 500,
    width: 223
  },
  list: {
    padding: 0,
  }
})((props: {open: boolean; anchorEl: any; keepMounted: boolean; onClose: () => void}) => (
  <FilterMenu props={props} />
));

type ManufacturerFilterComponentProps = {
  store: FilterQueryStoreType;
}

export const ManufacturerFilter = () => <ManufacturerFilterComponent store={store} />

const ManufacturerFilterComponent = observer(({store}: ManufacturerFilterComponentProps) => {
  const {filterButton, expandIcon, formGroup, formControlLabel, buttonClear, buttonConfirm} = styles;
  const [anchorEl, setAnchorEl] = useState<EventTarget | null>(null);
  const changeValue = async (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
      await set(store.manufacturerFilters, fieldName, e.target.checked);
      store.changeValue(FilterQueryStoreKeys.hack, !store.hack);
  }

  const handleClick = (e: ChangeEvent<EventTarget>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filters: any = toJS(store.manufacturerFilters);

  return (
    <div>
      <Button
        variant="contained"
        className={filterButton}
        onClick={handleClick}
      >
        Manufacturer
        {Boolean(anchorEl) ? <ExpandLessIcon className={expandIcon} /> : <ExpandMoreIcon className={expandIcon} />}
      </Button>
      <StyledMenu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <FormControl component="fieldset">
          <FormGroup className={formGroup}>
            {store.allManufacturer.map((item) => 
            <FormControlLabel
              key={item.name}
              className={formControlLabel}
              control={<Checkbox color='default' onChange={(e) => changeValue(e, item.name)}  
              name={item.name} checked={Boolean(filters[item.name])}/>}
              label={item.name}
              />
            )}
            <div>
                <button className={buttonClear} onClick={()=>{
                  store.changeValue(FilterQueryStoreKeys.filter, !store.filter)
                  store.changeValue(FilterQueryStoreKeys.manufacturerFilters,{})}}>Clear</button>
                <button className={buttonConfirm} onClick={()=>store.changeValue(FilterQueryStoreKeys.filter, !store.filter)}>Confirm</button>
            </div>
          </FormGroup>
        </FormControl>
      </StyledMenu>
    </div>
  );
})
