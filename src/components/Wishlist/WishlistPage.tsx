import { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router'
import { Paper, Typography, Divider } from '@material-ui/core'
import { postData } from '../../api/postData'
import { AppContext } from '../../AppContext'
import { TopBar } from '../Menu/TopBar'
import { ListItem } from './ListItem'
import { observer } from 'mobx-react'
import { UserStoreType } from '../../store/userStore'
import styles from './WishlistPage.module.scss'
import { BackToHomeButton } from '../Utilities/BackToHomeButton'

type WishlistPageProps = {
    userStore: UserStoreType
  }

export const WishlistPage = observer(({userStore}: WishlistPageProps) => {
  const { rootDiv, root, listDiv, listTitle, itemcard, suggestionDiv, goToShopSuggestion } = styles;
  const [ listItems, setListItems ] = useState([]);
  const [ ready, setReady ] = useState<boolean>(false);
  const [ loading , setLoading ] = useState<boolean>(true);
  const { setOpenNotification, setSuccessMsg, wishlistItemNumber } = useContext(AppContext);
  const history = useHistory();
  const handleClick = () => history.push('/');
  const buttonMsg = 'Go browsing'

  const setListItemsAndNotificationAfterDeleteHandler = () => {
    setOpenNotification(true);
    setSuccessMsg('You have deleted this item from your wishlist.');
    setItemsHandler()
  }

  const setItemsHandler = async() => {
    setReady(false)
    setLoading(true)
    let res;
    try {
      if (userStore.id) {
        res = await postData('/api/wishlist/get', {ownerId: userStore.id});
      } else if (localStorage.guestId) {
        res = await postData('/api/wishlist/get', {ownerId: localStorage.guestId});
      } else res = {}
    } catch (error) {
      res = {}
    }
    if (res.data && res.data.length) {
      setReady(true); 
      setLoading(false)
      setListItems(res.data)
    } else {
      setLoading(false)
      setReady(false)
      setListItems([])
    }
  }

  useEffect(() => {
    setItemsHandler()
  },[userStore.id, wishlistItemNumber, localStorage.guestId]);

  return loading ?
    null :
  ready ? (
    <>
      <TopBar userStore={userStore} />
      <div className={rootDiv}>
        <div className={root}>
          <Paper elevation={0} className={listDiv} >
            <Typography variant='h5' className={listTitle}>
                Your Wishlist
            </Typography>
            {listItems.map((item, idx) => 
              <div key={item._id.toString() + item.specificationValue}>
                <Paper elevation={0} className={itemcard}>
                  <ListItem item={item} userStore={userStore} 
                  setListItemsAndNotificationAfterDeleteHandler={setListItemsAndNotificationAfterDeleteHandler}/>
                </Paper>
                {idx + 1 < listItems.length && <Divider variant="middle" />}
              </div>
              )
            }
          </Paper>
        </div>
      </div>
    </>
    ) : (
      <>
      <TopBar userStore={userStore} />
        <div className={rootDiv}>
          <div className={suggestionDiv}>
            <Typography className={goToShopSuggestion} variant='h6'>
              You have no item in wishlist. Put some items here!
            </Typography>
            <BackToHomeButton onClick={handleClick} buttonMsg={buttonMsg}/>
          </div>
        </div>
    </>
    )
})

