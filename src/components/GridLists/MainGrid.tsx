import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { ItemCard } from '../Cards/ItemCard';
import { Link } from "react-router-dom";
import { getData } from '../../api/getData';
import { postData } from '../../api/postData';
import { filterQueryStore as store, FilterQueryStoreType } from '../../store/filterStore';
import { observer } from "mobx-react";
import { toJS } from 'mobx';
import { userStore, UserStoreType } from '../../store/userStore';
import { NotificationSnackbar } from '../Utilities/Snackbar';
import styles from './MainGrid.module.scss';

type MainGridComponentProps = {
  store: FilterQueryStoreType;
  userStore: UserStoreType;
}

type FormRowProps = {
  sliceStartIdx: number;
}

type MainGridItemType = {
  availability: boolean; 
  category: string; 
  description: string;
  imageUrl: string;
  inventory: number;
  manufacturerId: string;
  name: string;
  packageSize: string;
  price: number;
  rating: string[][];
  specification: string;
  specificationDescr: string[];
  _id: string;
}

export const MainGrid = () => <MainGridComponent store={store} userStore={userStore} />

const MainGridComponent = observer(({store, userStore}: MainGridComponentProps) => {
  const {root, card, row} = styles;
  const [list, setList] = useState<MainGridItemType[]>([]);
  const [openNotification, setOpenNotification] = useState(false);
  const successMsg = 'Item added to cart.'

  useEffect(() => {try{
    const res = getData('/api/homepage/maingrid');
    if (res.data) {
      setList(res.data);
    }
  }
  catch(error) {
    console.log(error);
  }},[]);

  useEffect(() => {
    const getFilterResults = async () => {
      const res = await postData('/api/product/filter/result', {
        manufacturerFilters: Object.keys(toJS(store.manufacturerFilters)),
        categoryFilters: Object.keys(toJS(store.categoryFilters)),
        priceFilterMin: store.priceFilterMin,
        priceFilterMax: store.priceFilterMax
        });
        if(res.data) {
          setList(res.data)
        }
    };
    getFilterResults();
  },[store.filter])

  const FormRow = ({sliceStartIdx}: FormRowProps) => {
    return ( 
        <div className={row}> 
          {list.slice(sliceStartIdx, sliceStartIdx + 5).map((item: MainGridItemType) => 
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
