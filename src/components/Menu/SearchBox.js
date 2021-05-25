import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { searchStore } from '../../store/searchStore';
import { observer } from "mobx-react";
import { postData } from '../../api/postData';
import { useHistory } from 'react-router-dom';

const boxwidth = '100%'

const useStyles = makeStyles(() => ({
  input: {
    width: `${boxwidth}`,
    maxWidth: '500px',
    minWidth: '150px',
    height: '35px',
    border: 'none',
    borderRadius: '5px',
    //margin: '0 40px 0 90px',
    padding: '0 0 0 5px',
    '&:focus':{
      outline: 'none'
    }
  },
  dropdown: {
    position: 'absolute',
    top: '32px',
    maxWidth: '500px',
    minWidth: '150px',
    width: `${boxwidth}`,
    height: '173px',
    border: 'solid 1px gray',
    background: 'white',
    //margin: '0 0 0 90px',
    color: 'black',
    textAlign: 'start',
    fontSize: '13px'
  },
  li: {
    display: 'flex',
    margin: '3px 5px 3px 0',
    alignItems: 'center',
    color: 'black',
    '&:hover': {
      cursor:'pointer',
      background: '#fcfcf0'
    }
  },
  searchDiv: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  form: {
    maxWidth: '500px',
    minWidth: '150px',
    width: '100%'
  },
  list: {
    listStyle: 'none',
    margin: '4px 0 4px 0',
    padding: '0 0 0 10px'
  },
  itemName:{
    //width: '380px',
    margin: '0 0 0 10px'
  },
  flexfiller: {
    flex: '1'
  },
  priceDiv: {
    justifySelf: 'end'
  }
}));

export const SearchBar = observer(() => {
  const {input,dropdown,searchDiv,form, li, list, itemName, flexfiller, priceDiv} = useStyles();
  //const [query, setQuery] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const changeValue = async(e) => {
    searchStore.changeValue('query', e.target.value);
    //setQuery(e.target.value);
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
  const handleClick = (e, item) => {
    e.stopPropagation();
    e.preventDefault();
    history.push({pathname: '/product', state: {item}})
  };
//
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
          {suggestions.map((item) =>
            <div key={item._id.toString()} onMouseDown={(e) => handleClick(e, item)}>
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
