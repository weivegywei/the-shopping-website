import { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router'
import { Paper, Typography, Divider } from '@material-ui/core'
import { postData } from '../../api/postData'
import { AppContext } from '../../AppContext'
import { TopBar } from '../Menu/TopBar'
import { WishlistItem } from './WishlistItem'
import { observer } from 'mobx-react'
import { UserStoreType } from '../../store/userStore'
import styles from './WishlistPage.module.scss'
import { BackToHomeButton } from '../Utilities/BackToHomeButton'

type WishlistPageProps = {
    userStore: UserStoreType
  }

export const WishlistPage = observer(({userStore}: WishlistPageProps) => {
  const { rootDiv, root, listDiv, listTitle, itemcard, suggestionDiv, goToShopSuggestion } = styles;
  const [ WishlistItems, setWishlistItems ] = useState([]);
  const [ ready, setReady ] = useState<boolean>(false);
  const [ loading , setLoading ] = useState<boolean>(true);
  const { setNotificationInfo, wishlistItemNumber } = useContext(AppContext);
  const history = useHistory();
  const handleClick = () => history.push('/');
  const buttonMsg = 'Go browsing'

  const handleAfterDelete = () => {
    setNotificationInfo('success', 'You have deleted this item from your wishlist.')
    setItemsHandler();
  }

  const setItemsHandler = async() => {
    setLoading(true)
    if (userStore.id || localStorage.guestId) {
      const res = await postData('/api/wishlist/get', {ownerId: userStore.id ?? localStorage.guestId});
      if (res.data.length) {
        setWishlistItems(res.data)
        setReady(true); 
      } else {
        setWishlistItems([])
        setReady(false)
      }
    } else {
      setWishlistItems([])
      setReady(false)
    }
    setLoading(false)
  }

  useEffect(() => {
    setItemsHandler();
  },[wishlistItemNumber, userStore.id, localStorage.guestId]);

  return loading ? null : ready ? (
    <>
      <TopBar userStore={userStore} />
      <div className={rootDiv}>
        <div className={root}>
          <Paper elevation={0} className={listDiv} >
            <Typography variant='h5' className={listTitle}>
                Your Wishlist
            </Typography>
            {WishlistItems.map((item, idx) => 
              <div key={item._id.toString() + item.specificationValue}>
                <Paper elevation={0} className={itemcard}>
                  <WishlistItem item={item} userStore={userStore} 
                  handleAfterDelete={handleAfterDelete}/>
                </Paper>
                {idx + 1 < WishlistItems.length && <Divider variant="middle" />}
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

