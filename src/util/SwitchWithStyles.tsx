import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

export const SwitchWithStyles = withStyles({
    switchBase: {
      color: '#a6b3a4',
      '&$checked': {
        color: '#506e69',
      },
      '&$checked + $track': {
        backgroundColor: '#506e69',
      },
    },
    checked: {},
    track: {},
  })(Switch)

