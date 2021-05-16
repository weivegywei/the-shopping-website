import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {MenuList} from './MenuList';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
        background: '#7a8e82'
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
      color: {
        color: '#f5f5f5'
      },
      icons: {
        color: '#f5f5f5',
        borderRadius: '5px',
        fontSize: 'small',
        width: 40,
        height: 40,
        margin: 5
      }
}));

export function MenuDrawer({open, handleDrawerClose}) {
    const theme = useTheme();
    const {drawer, drawerHeader, drawerPaper, color, icons} = useStyles();

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
            <IconButton className={icons} onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon className={color} /> : <ChevronRightIcon className={color} />}
            </IconButton>
          </div>
          <Divider />
            <MenuList />
          <Divider />
        </Drawer>
    )
}