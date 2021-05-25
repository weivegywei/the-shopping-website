import { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import { PriceRangeSlider } from './PriceRangeSlider';
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

const useStyles = makeStyles(() => ({
    filterButton: {
        background: '#ecebeb',
        color: '#494f4d',
        textTransform: 'none',
        margin: '0 10px 0 10px'
    },
    expandIcon: {
      color: '#494f4d',
    }
}));

export const PriceFilter = () => {
  const {filterButton, expandIcon} = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
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
