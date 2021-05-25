import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { filterQueryStore as store } from '../../store/filterStore';
import { observer } from "mobx-react";

const useStyles = makeStyles({
    root: {
      width: 300,
      margin: '0',
      padding: '0'
    },
    inputDiv: {
      display: 'flex', 
      margin: '12px'
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      color: '#494f4d'
    },
    input: {
      height: '40px',
      width: '70px',
      margin: '5px',
      fontSize: '15px',
      border: '1px solid #494f4d',
      color: '#494f4d'
    },
    flexFiller: {
        flex: '1'
    },
    slider: {
      width: '250px',
      color: '#7a8e82',
      margin: '20px'
    },
    buttonConfirm: {
      background: '#7a8e82',
      color: '#f5f5f5',
      border: '1px solid #7a8e82',
      fontWeight: 'bold',
      width: '50%',
      minWidth: '103px',
      height: '35px',
      '&:hover': {
          cursor: 'pointer',
          background: '#cad2a8',
          border: '1px solid #cad2a8',
          color: '#f5f5f5'
        },
      '&:focus': {
      outline: 'none',
      background: '#506e69',
      color: '#f5f5f5'
      },
    },
    buttonClear: {
      background: '#f5f5f5',
      color: '#7a8e82',
      border: '1px solid #7a8e82',
      borderLeft: 'none',
      fontWeight: 'bold',
      width: '50%',
      minWidth: '103px',
      height: '35px',
      '&:hover': {
          cursor: 'pointer',
          background: '#cad2a8',
          border: '1px solid #cad2a8',
          color: '#f5f5f5'
        },
      '&:focus': {
      outline: 'none',
      background: '#506e69',
      color: '#f5f5f5'
      },
  }
  });
  
  export const PriceRangeSlider = () => <PriceRangeSliderComponent store={store} />

  const PriceRangeSliderComponent = observer(() => {
    const {root, inputDiv, label, input, flexFiller, slider, buttonClear,buttonConfirm} = useStyles();
    const priceRangeMin = Math.floor(store.minPrice);
    const priceRangeMax = Math.ceil(store.maxPrice);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [range, setRange] = useState([minPrice, maxPrice])

    const handleChange = (e, [min, max]) => {
        setRange([min, max]);
        setMinPrice(min);
        setMaxPrice(max)
    };
    const handleMinChange = (e) => {
        setMinPrice(Number(e.target.value));
        setRange([minPrice, maxPrice]);
    };
    const handleMaxChange = (e) => {
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
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={priceRangeMin}
          max={priceRangeMax}
          className={slider}
        />
        <div>
            <button className={buttonClear} onClick={()=>{
                store.changeValue('priceFilterMin', 0);
                store.changeValue('priceFilterMax', 0);
                store.changeValue('filter', !store.filter);
                setMinPrice(priceRangeMin);
                setMaxPrice(priceRangeMax);
                setRange([priceRangeMin, priceRangeMax])}}>Clear</button>
            <button className={buttonConfirm} onClick={()=>{
                store.changeValue('priceFilterMin', minPrice);
                store.changeValue('priceFilterMax', maxPrice);
                store.changeValue('filter', !store.filter)}}>Confirm</button>
        </div>
      </div>
    );
  });