import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

export const StyledBadge = withStyles(() => ({
    badge: {
      border: `1px solid white`,
      background:'#8ba48a'
    },
  }))(Badge);

