import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { ItemCard } from '../Cards/ItemCard';
import { Link } from "react-router-dom";
import { getData } from '../../api/getData';
import { postData } from '../../api/postData';
import { filterQueryStore as store } from '../../store/filterStore';
import { observer } from "mobx-react";
import { toJS } from 'mobx';
import { userStore } from '../../store/userStore';
import { NotificationSnackbar } from '../Utilities/Snackbar';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    card: {
        margin: '5px'
    },
    row: {
        display:'flex', 
        justifyContent:'center', 
        width: '100%'
    },
}));

export const MainGrid = () => <MainGridComponent store={store} userStore={userStore} />

const MainGridComponent = observer(({store, userStore}) => {
  const {root, card, row} = useStyles();
  const [list, setList] = useState([]);
  const [openNotification, setOpenNotification] = useState(false);
  const successMsg = 'Item added to cart.'

  useEffect(() => {getData('/api/homepage/maingrid').then(function (res) {
    setList(res.data);
  })
  .catch(function (error) {
    console.log(error);
  })},[]);

  useEffect(async() => {
    const res = await postData('/api/product/filter/result', {
    manufacturerFilters: Object.keys(toJS(store.manufacturerFilters)),
    categoryFilters: Object.keys(toJS(store.categoryFilters)),
    priceFilterMin: store.priceFilterMin,
    priceFilterMax: store.priceFilterMax
    });
    setList(res.data)
    return res
  },[store.filter])

  const FormRow = ({sliceStartIdx}) => {
    return ( 
        <div className={row}> 
          {list.slice(sliceStartIdx, sliceStartIdx + 5).map((item) => 
          <Grid key={item._id.toString()} item xs = { 2 } className={card}>
            <Link to={{
                pathname: '/product',
                state: {item}}} style={{textDecoration: 'none'}}>
              <ItemCard item={item} userStore={userStore} setOpenNotification={setOpenNotification} />
            </Link>
          </Grid>)} 
        </div>
  )};
            
  return ( 
    <>
      <div className = { root }>
          <Grid container spacing = { 1 } >
              <Grid container item xs = { 12 } spacing = { 1 } >
                  <FormRow sliceStartIdx={0} />
              </Grid> 
              <Grid container item xs = { 12 } spacing = { 1 } >
                  <FormRow sliceStartIdx={5} />
              </Grid> 
              <Grid container item xs = { 12 } spacing = { 1 } >
                  <FormRow sliceStartIdx={10} />
              </Grid>
          </Grid> 
      </div>
      {openNotification && <NotificationSnackbar state={'success'} openNotification={openNotification} 
        setOpenNotification={setOpenNotification} errorMsg={''} successMsg={successMsg}/>}
    </>
  );
})