import { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import { PriceRangeSlider } from './PriceRangeSlider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import styles from './Price.module.scss';
import { ChangeEvent } from 'react';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: {open: boolean; anchorEl: EventTarget | null; keepMounted: boolean; onClose: () => void}) => (
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

export const PriceFilter = () => {
  const {filterButton, expandIcon} = styles;
  const [anchorEl, setAnchorEl] = useState<EventTarget | null>(null);

  const handleClick = (e: ChangeEvent<EventTarget>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <div>
      <Button
        variant="contained"
        className={filterButton}
        onClick={handleClick}
      >
        Price
        {Boolean(anchorEl) ? <ExpandLessIcon className={expandIcon} /> : <ExpandMoreIcon className={expandIcon} />}
      </Button>
      <StyledMenu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <PriceRangeSlider />
      </StyledMenu>
    </div>
  );
}
