import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SpaRoundedIcon from '@material-ui/icons/SpaRounded';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import KingBedIcon from '@material-ui/icons/KingBed';
import ComputerIcon from '@material-ui/icons/Computer';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import { RiSurgicalMaskLine } from 'react-icons/ri';
import { RiTShirtLine } from 'react-icons/ri';
import { FaShoePrints } from 'react-icons/fa';
import { useContext } from 'react';
import { GiSpiralBottle } from 'react-icons/gi';
import styles from './MenuList.module.scss';
import { AppContext } from '../../AppContext';
import { CategoryType } from '../../store/productStore';

type MenuItemType = {
  name: CategoryType,
  icon: any
}

const menuItems = [
    {name: CategoryType.skinCare, icon: <FaceRoundedIcon />}, 
    {name: CategoryType.garments, icon: <RiTShirtLine style={{ fontSize : 24 }} />},
    {name: CategoryType.cosmetics, icon: <SpaRoundedIcon />},
    {name: CategoryType.fitness, icon: <FitnessCenterIcon />},
    {name: CategoryType.electricAppliances, icon:<ComputerIcon /> },
    {name: CategoryType.perfumesAndFragrances, icon: <GiSpiralBottle style={{ fontSize : 24 }} />},
    {name: CategoryType.footwears, icon:<FaShoePrints style={{ fontSize : 24 }} /> },
    {name: CategoryType.personalProtectiveEquipment, icon:<RiSurgicalMaskLine style={{ fontSize : 24 }}/>},
    {name: CategoryType.kitchenware, icon:<FreeBreakfastIcon /> },
    {name: CategoryType.beddings, icon:<KingBedIcon />}
];

export const MenuList = () => { 
  const {icon, text, button} = styles;
  const { setMenuCategory } = useContext(AppContext);


  return (         
      <List data-test='homepage-menu-list'>
      {menuItems.map((item: MenuItemType) => (
        <ListItem button key={item.name} className={button} onClick={() => 
          setMenuCategory(item.name)
        }>
          <ListItemIcon className={icon}>{item.icon}</ListItemIcon>
          <ListItemText className={text} primary={item.name} />
        </ListItem>
      ))}
    </List>
  )
}
