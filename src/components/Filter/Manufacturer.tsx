import { useState, useEffect, useContext, ChangeEvent } from 'react';
import { FilterMenu } from '../../util/FilterMenu';
import { Checkbox, FormControl, FormGroup, FormControlLabel, Button, withStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import styles from './Manufacturer.module.scss';
import { AppContext } from '../../AppContext';

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

type ManufacturerItem = {
  name: string,
  state: boolean
}

export const ManufacturerFilter = () => {
  const { filterButton, expandIcon, formGroup, formControlLabel, buttonClear, buttonConfirm } = styles;
  const [ anchorEl, setAnchorEl ] = useState<EventTarget | null>(null);
  const { allManufacturer, setManufacturerFilter } = useContext(AppContext);
  const [ manufacturerSelection, setManufacturerSelection ] = useState<ManufacturerItem[]>();

  useEffect(() => {
    if(allManufacturer) {
      setManufacturerSelection(allManufacturer.map((item) => ({name: item, state: false})))
}
  }, [allManufacturer])

  const handleChange = (e: ChangeEvent<HTMLInputElement>, item: ManufacturerItem) => {
    const newManufacturerSelection = [...manufacturerSelection];
    if (e.target.checked) {
      newManufacturerSelection.find(it => it.name === item.name).state = true;
      setManufacturerSelection(newManufacturerSelection);
    } else {
      newManufacturerSelection.find(it => it.name === item.name).state = false;
      setManufacturerSelection(newManufacturerSelection);
    }
  }

  const handleClick = (e: ChangeEvent<EventTarget>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    manufacturerSelection ? <div>
      <Button variant="contained" className={filterButton} onClick={handleClick}>
        Manufacturer
        {Boolean(anchorEl) ? <ExpandLessIcon className={expandIcon} /> : <ExpandMoreIcon className={expandIcon} />}
      </Button>
      <StyledMenu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <FormControl component="fieldset">
          <FormGroup className={formGroup}>
            {manufacturerSelection.map((item) => 
            <FormControlLabel
              key={item.name} className={formControlLabel} label={item.name}
              control={<Checkbox color='default' onChange={(e) => handleChange(e, item)}  
              name={item.name} checked={item.state}/>}
              />
            )}
            <div>
                <button className={buttonClear} onClick={()=>{
                  setManufacturerFilter([])
                  setManufacturerSelection(allManufacturer.map((item) => ({name: item, state: false})))}}
                >
                  Clear</button>
                <button className={buttonConfirm} onClick={()=>{
                  setManufacturerFilter(manufacturerSelection.filter(it => it.state === true).map(it => it.name))}}
                >
                  Confirm</button>
            </div>
          </FormGroup>
        </FormControl>
      </StyledMenu>
    </div> : null
  );
}

