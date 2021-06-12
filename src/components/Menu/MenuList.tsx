import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import SpaRoundedIcon from '@material-ui/icons/SpaRounded';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import KingBedIcon from '@material-ui/icons/KingBed';
import ComputerIcon from '@material-ui/icons/Computer';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import { RiSurgicalMaskLine } from 'react-icons/ri';
import { RiTShirtLine } from 'react-icons/ri';
import { FaShoePrints } from 'react-icons/fa';
import { GiSpiralBottle } from 'react-icons/gi';
import styles from './MenuList.module.scss';

  const menuItems = [
    {name: 'Skin Care', icon: <FaceRoundedIcon />, linkTo: ''}, 
    {name: 'Garments', icon: <RiTShirtLine style={{ fontSize : 24 }} />, linkTo: ''},
    {name: 'Cosmetics', icon: <SpaRoundedIcon />, linkTo: ''},
    {name: 'Fitness', icon: <FitnessCenterIcon />, linkTo:''},
    {name: 'Electric Appliances', icon:<ComputerIcon /> , linkTo: ''},
    {name: 'Perfumes & Fragrances', icon: <GiSpiralBottle style={{ fontSize : 24 }} />,linkTo: ''},
    {name: 'Footwears', icon:<FaShoePrints style={{ fontSize : 24 }} />, linkTo:'' },
    {name: 'Personal Protective Equipment', icon:<RiSurgicalMaskLine style={{ fontSize : 24 }}/>, linkTo:''},
    {name: 'Kitchenware', icon:<FreeBreakfastIcon /> , linkTo: ''},
    {name: 'Beddings', icon:<KingBedIcon />, linkTo:''}
  ];


export const MenuList = () => { 
  const {icon, text, button} = styles;

  return (         
      <List>
      {menuItems.map((item) => (
        <ListItem button key={item.name} className={button} >
          <ListItemIcon className={icon}>{item.icon}</ListItemIcon>
          <ListItemText className={text} primary={item.name} />
        </ListItem>
      ))}
    </List>
  )
}