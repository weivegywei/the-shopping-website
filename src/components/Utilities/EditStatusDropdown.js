import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { observer } from 'mobx-react-lite';

const BootstrapInput = withStyles((theme) => ({
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
    fontWeight: '500',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      outline: 'none',
    },
  }
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export const EditStatusDropdown = observer(({store}) => {
  const {margin} = useStyles();
  const changeValue = (e) => {store.changeValue('status', e.target.value)};

  return (
    <div>
      <FormControl className={margin}>
        <NativeSelect
          value={store.status}
          onChange={(e) => {changeValue(e)}}
          input={<BootstrapInput />}
        >
          <option value='paid'>Paid</option>
          <option value='shipped'>Shipped</option>
          <option value='delivered'>Delivered</option>
          <option value='returned'>Returned</option>
          <option value='refunded'>Refunded</option>
        </NativeSelect>
      </FormControl>
    </div>
  );
})
