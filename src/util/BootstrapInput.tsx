import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

const inputBoxHeight = '22px';
const inputBoxWidth = `335px`;

export const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

export const BootstrapInputForSpecificationValueDropdown = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    width: 265,
    height: 30,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid black',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    textTransform: 'capitalize',
    '&:focus': {
      border: '2px solid black',
    },
  },
}))(InputBase);

export const BootstrapInputForCountryDropdown = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    position: 'relative',
    width: `${inputBoxWidth}`,
    height: `${inputBoxHeight}`,
    padding: '14px 22px 14px 10px',
    backgroundColor: '#fff',
    border: '1px solid lightgrey',
    fontSize: 14,
    fontWeight: 500,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      outline: 'none',
      border: 'solid 1px black'
    },
  }
}))(InputBase);

export const BootstrapInputForEditStatusDropdown = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    position: 'relative',
    width: '262px',
    height: '22px',
    backgroundColor: '#e8fdff',
    border: '1px solid darkgrey',
    fontSize: 14,
    fontWeight: 500,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      outline: 'none',
    },
  }
}))(InputBase);


