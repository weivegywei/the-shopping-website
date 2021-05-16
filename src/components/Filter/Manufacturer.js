import { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { filterQueryStore as store } from '../../store/filterStore';
import { observer } from "mobx-react";
import { set, toJS } from 'mobx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles(() => ({
    filterButton: {
        background: '#ecebeb',
        color: '#494f4d',
        textTransform: 'none',
        margin: '0 10px 0 10px'
    },
    expandIcon: {
      color: '#494f4d',
    },
    formGroup: {
      fontSize: '13px!important',
      color: '#494f4d',
      padding: '0'
    },
    formControlLabel: {
        margin: '0',
        fontSize: '13px!important',
        textTransform: 'capitalize',
    }, 
    buttonClear: {
      background: '#f5f5f5',
      color: '#7a8e82',
      border: '1px solid #7a8e82',
      borderLeft: 'none',
      fontWeight: 'bold',
      width: '50%',
      minWidth: '103px',
      height: '35px',
      '&:focus': {
        outline: 'none'
      },
      '&:hover': {
          cursor: 'pointer',
          background: '#cad2a8',
          border: '1px solid #cad2a8',
          color: '#f5f5f5'
        },
      '&:focus': {
      outline: 'none',
      background: '#506e69',
      color: '#f5f5f5'
      },
    },
    buttonConfirm: {
      background: '#7a8e82',
      color: '#f5f5f5',
      border: '1px solid #7a8e82',
      fontWeight: 'bold',
      width: '50%',
      minWidth: '103px',
      height: '35px',
      '&:focus': {
        outline: 'none'
      },
      '&:hover': {
          cursor: 'pointer',
          background: '#cad2a8',
          border: '1px solid #cad2a8',
          color: '#f5f5f5'
        },
      '&:focus': {
      outline: 'none',
      background: '#506e69',
      color: '#f5f5f5'
      },
    },
}));

export const ManufacturerFilter = () => <ManufacturerFilterComponent store={store} />

const ManufacturerFilterComponent = observer(({store}) => {
  const {filterButton, expandIcon, formGroup, formControlLabel, buttonClear, buttonConfirm} = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const changeValue = async (e, fieldName) => {
      await set(store.manufacturerFilters, fieldName, e.target.checked);
      store.changeValue('hack', !store.hack);
  }

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filters = toJS(store.manufacturerFilters);

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
              control={<Checkbox color='default' onChange={(e) => changeValue(e, item.name)}  name={item.name} checked={!!filters[item.name]}/>}
              label={item.name}
              />
            )}
            <div>
                <button className={buttonClear} onClick={()=>{
                  store.changeValue('filter', !store.filter)
                  store.changeValue('manufacturerFilters',{})}}>Clear</button>
                <button className={buttonConfirm} onClick={()=>store.changeValue('filter', !store.filter)}>Confirm</button>
            </div>
          </FormGroup>
        </FormControl>
      </StyledMenu>
    </div>
  );
})
