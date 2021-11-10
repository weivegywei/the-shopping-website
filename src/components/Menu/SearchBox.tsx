import {useState} from 'react';
import { searchStore } from '../../store/searchStore';
import { observer } from "mobx-react";
import { postData } from '../../api/postData';
import { useHistory } from 'react-router-dom';
import styles from './SearchBox.module.scss';
import { ChangeEvent, MouseEvent } from 'react';
import { SearchStoreKey } from '../../store/searchStore';

type SearchBoxItemType = {
  _id: string;
  imageUrl: string;
  name: string;
  price: number;
}

export const SearchBar = observer(() => {
  const {input,dropdown,searchDiv,form, itemDiv, li, list, itemName, flexfiller, priceDiv} = styles;
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Object[]>([]);
  const changeValue = async(e: ChangeEvent<HTMLInputElement>) => {
    searchStore.changeValue(SearchStoreKey.query, e.target.value);
    const res = await postData('/api/homepage/search', {query: searchStore.query});
    const newArr = [];
    if(res.data) {
      for (let i=0; i<res.data.length; i++) {
        newArr.push(res.data[i]);
      };
      setSuggestions(newArr);
    }
  };
  

  const history = useHistory();
  const handleClick = (e: MouseEvent<HTMLElement>, item: SearchBoxItemType) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(item._id, 'id? in search box')
    history.push({pathname: `/product/${item._id}`})
    searchStore.changeValue(SearchStoreKey.query, '');
    setOpen(false);
  };

  return (
    <div className={searchDiv} onBlur={()=>setOpen(false)}>
      <form noValidate autoComplete="off" className={form}>
        <input 
        type='text' 
        className={input}
        placeholder='Search for a product'
        onChange={(e) => changeValue(e) && setOpen(true)}
        value={searchStore.query}
        ></input>
      </form>
      {open && Boolean(suggestions.length) && <div className={dropdown}>
        <ul className={list}>
          {suggestions.map((item: SearchBoxItemType) =>
            <div key={item._id.toString()} onMouseDown={(e) => handleClick(e, item)} className={itemDiv}>
              <li className={li}>
                <img src={item.imageUrl} alt='' width='26px' height='30px'/>
                <div className={itemName}>{item.name}</div>
                <div className={flexfiller}></div>
                <div className={priceDiv}>€ {item.price}</div>
              </li>
            </div>
          )}
        </ul>
      </div>}
    </div>
  );
})
