import { useState, useEffect } from 'react';
import Slider from '@material-ui/core/Slider';
import { filterQueryStore as store, FilterQueryStoreType, FilterQueryStoreKeys } from '../../store/filterStore';
import { observer } from "mobx-react";
import styles from './PriceRangeSlider.module.scss';
import { ChangeEvent } from 'react';

type PriceRangeSliderComponentProps = {
  store: FilterQueryStoreType
}
  
export const PriceRangeSlider = () => <PriceRangeSliderComponent store={store} />

const PriceRangeSliderComponent = observer(({store}: PriceRangeSliderComponentProps) => {
  const {root, inputDiv, label, input, flexFiller, slider, buttonClear,buttonConfirm} = styles;
  const priceRangeMin = Math.floor(store.minPrice);
  const priceRangeMax = Math.ceil(store.maxPrice);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [range, setRange] = useState([minPrice, maxPrice])

  const handleChange = (_: React.ChangeEvent<{}>, [min, max]: number[]) => {
      setRange([min, max]);
      setMinPrice(min);
      setMaxPrice(max)
  };

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
      setMinPrice(Number(e.target.value));
      setRange([minPrice, maxPrice]);
  };
  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
      setMaxPrice(Number(e.target.value));
      setRange([minPrice, maxPrice]);
  };

  useEffect(()=>{
      setMinPrice(priceRangeMin);
      setMaxPrice(priceRangeMax);
      setRange([priceRangeMin, priceRangeMax])
  },[store.minPrice, store.maxPrice])

  return (
    <div className={root}>
      <div className={inputDiv}>
          <label className={label}>€</label>
          <input className={input} type='number' id='min' onChange={handleMinChange} value={minPrice}></input>
          <div className={flexFiller}></div>
          <label className={label}>€</label>
          <input className={input} type='number' id='max' onChange={handleMaxChange} value={maxPrice}></input>
      </div>
      <Slider
        value={range}
        onChange={handleChange as ((_: React.ChangeEvent<{}>, [min, max]: any) => void)}
        valueLabelDisplay="auto"
        min={priceRangeMin}
        max={priceRangeMax}
        className={slider}
      />
      <div>
          <button className={buttonClear} onClick={()=>{
              store.changeValue(FilterQueryStoreKeys.priceFilterMin, 0);
              store.changeValue(FilterQueryStoreKeys.priceFilterMax, 0);
              store.changeValue(FilterQueryStoreKeys.filter, !store.filter);
              setMinPrice(priceRangeMin);
              setMaxPrice(priceRangeMax);
              setRange([priceRangeMin, priceRangeMax])}}>Clear</button>
          <button className={buttonConfirm} onClick={()=>{
              store.changeValue(FilterQueryStoreKeys.priceFilterMin, minPrice);
              store.changeValue(FilterQueryStoreKeys.priceFilterMax, maxPrice);
              store.changeValue(FilterQueryStoreKeys.filter, !store.filter)}}>Confirm</button>
      </div>
    </div>
  );
});
