import { useState, useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { ItemCard } from '../Cards/ItemCard';
import { Link } from "react-router-dom";
import { getData } from '../../api/getData';
import { postData } from '../../api/postData';
import { filterQueryStore as store, FilterQueryStoreType } from '../../store/filterStore';
import { observer } from "mobx-react";
import { toJS } from 'mobx';
import { userStore, UserStoreType } from '../../store/userStore';
import styles from './MainGrid.module.scss';
import { AppContext } from '../../AppContext';

type MainGridComponentProps = {
  store: FilterQueryStoreType;
  userStore: UserStoreType;
}

type FormRowProps = {
  items: MainGridItemType[];
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


export const MainGrid = () => 
    <MainGridComponent store={store} userStore={userStore} />

const MainGridComponent = observer(({store, userStore}: MainGridComponentProps) => {
  const {root, card, row} = styles;
  const [list, setList] = useState<MainGridItemType[]>([]);
  const { menuCategory, manufacturerFilter } = useContext(AppContext);

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
        manufacturerFilters: manufacturerFilter,
        categoryFilters: Object.keys(toJS(store.categoryFilters)),
        priceFilterMin: store.priceFilterMin,
        priceFilterMax: store.priceFilterMax
        });
        if(res.data) {
          setList(res.data)
        }
    };
    getFilterResults();
  },[manufacturerFilter, store.filter])

  useEffect(() => {
    const getMenuFilteredResults = async() => {
      const res = await postData('/api/product/menu/result', {
        menuCategory
      });
      if(res.data) {
        setList(res.data)
      }
    };
    getMenuFilteredResults();
  }, [menuCategory])

  const FormRow = ({items}: FormRowProps) => {
    return items ? ( 
        <div className={row}> 
          {items.map((item: MainGridItemType) => 
          <Grid key={item._id.toString()} item xs = { 2 } className={card}>
            <Link to={{
                pathname: '/product',
                state: {item}}} style={{textDecoration: 'none'}}>
              <ItemCard item={item} userStore={userStore} />
            </Link>
          </Grid>)} 
        </div>
  ): null};
            
  return ( 
    <>
      <div className = { root }>
          <Grid container spacing = { 1 } >
            {list.map((_, idx) => 
             idx % 5 === 0 ? 
              <Grid container item xs = { 12 } spacing = { 1 } >
                  <FormRow items={list.slice(idx, Math.min(list.length, idx + 5))} />
              </Grid> : null )}
          </Grid> 
      </div>
    </>
  );
})
