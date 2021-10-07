import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { MenuList } from './MenuList';
import styles from './MenuDrawer.module.scss';

const useStyles = makeStyles((theme) => ({
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
        backgroundColor: ' #7a8e82'
      }
}));

type MenuDrawerProps = {
  open: boolean;
  handleDrawerClose: () => void;
}

export const MenuDrawer = ({open, handleDrawerClose}: MenuDrawerProps) => {
    const theme = useTheme();
    const {drawer, drawerPaper, color, icons} = styles;
    const { drawerHeader } = useStyles();

    return(    
        <Drawer
          className={drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: drawerPaper,
          }}
        >
          <div className={drawerHeader}>
            <IconButton className={icons} onClick={handleDrawerClose} data-test='homepage-menu-closeButton'>
              {theme.direction === 'ltr' ? <ChevronLeftIcon className={color} /> : <ChevronRightIcon className={color} />}
            </IconButton>
          </div>
          <Divider />
            <MenuList />
          <Divider />
        </Drawer>
    )
}
