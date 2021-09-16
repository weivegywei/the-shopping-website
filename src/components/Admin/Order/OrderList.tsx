import { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
//import EditIcon from '@material-ui/icons/Edit';
import { getData } from '../../../api/getData';
import { postData } from '../../../api/postData';
//import IconButton from '@material-ui/core/IconButton';
//import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { InfoDialog, InfoItemProps } from '../../Utilities/InfoDialog';
import { InfoTableDialog, InfoItemType } from '../../Utilities/InfoTableDialog';
import { EditDialog } from '../../Utilities/EditDialog';
import { orderStatusStore as store } from '../../../store/orderStatusStore';
import { observer } from "mobx-react";
import styles from './OrderList.module.scss';
import { UserDataType, ListItemProps, ResDataMapProps, ReturnedTimeProps, Events, tableHeadItems, tableHeadItemsProps} from './OrderList.util'
import { OrderListTable } from './OrderListTable'

export const OrderList = observer(() => {
    const {container, table, button} = styles;
    const [list, setList] = useState([]);
    const [guestOrderList, setGuestOrderList] = useState([]);
    const [openUserInfo, setOpenUserInfo] = useState(false);
    const [openStatusInfo, setOpenStatusInfo] = useState(false);
    const [openStatusEdit, setOpenStatusEdit] = useState(false);
    const [openOrderInfo, setOpenOrderInfo] = useState(false);
    const [selectedItem, setSelectedItem] = useState<InfoItemProps[] | UserDataType | ListItemProps | InfoItemType | null>(null);

    const getAndSetOrderList = async() => {
        const res = await getData('/api/admin/order/list');
        setList(res.data.map((it: ResDataMapProps) => ({...it, userData: it.userInfo[0]})));
    };

    const getAndSetGuestOrderList = async() => {
        const res = await getData('/api/admin/guestorder/list');
        setGuestOrderList(res.data)
    }
    
    useEffect(() => {
        getAndSetOrderList();
        getAndSetGuestOrderList()
    },[openStatusEdit]);
//util
    const returnedTime = (item: ReturnedTimeProps) => {
        const event = item.events?.find(({status}) => status === 'returned');
        return event ? event.time : null;
    };
//TODO: all handle function can be wrapped with useCallBack();
    const handleUserInfoClickOpen = (item: UserDataType) => {
        const info = [{fieldName: 'First Name', fieldValue: item.firstName}, {fieldName: 'Last Name', fieldValue: item.lastName}, 
        {fieldName: 'Email', fieldValue: item.email}, {fieldName: 'Address', fieldValue: item.address}, 
        {fieldName: 'Country', fieldValue: item.country}];
        setOpenUserInfo(true);
        setSelectedItem(info);
    };
    
    const handleOrderInfoClickOpen = async(guestId: string, cartId: string) => {
        let res;
        if (guestId) {
            res = await postData('/api/admin/order/info', {guestId, cartId})
        } else {
            res = await postData('/api/admin/order/info', {cartId});
        }   
        const info = res.data.map(it => {
            const { name, _id, inventory, price, packageSize, _doc: { quantity, specificationValue }} = it;
            return [{fieldName: 'Product Name', fieldValue: name}, {fieldName: 'Product Id', fieldValue: _id}, 
            {fieldName: 'Inventory', fieldValue: inventory}, {fieldName: 'Price', fieldValue: price }, 
            {fieldName: 'Package Size', fieldValue: packageSize}, {fieldName: 'Quantity', fieldValue: quantity}, 
            {fieldName: 'Specification Value', fieldValue: specificationValue}]});
        setSelectedItem(info);
        setOpenOrderInfo(true);
    }

    const handleStatusInfoClickOpen = (items: Events[]) => {
        const info = items.map(item => {return {fieldName: item.status, fieldValue: item.time}});
        setOpenStatusInfo(true);
        setSelectedItem(info)
    };
    
    const handleStatusEditOpen = (item: ListItemProps) => {
        setOpenStatusEdit(true);
        setSelectedItem(item);
    }

    const handleSave = () => {
        //@ts-ignore
        if (selectedItem.guestId) {
            const editStatus = async() => await postData('/api/admin/order/edit', {   //@ts-ignore
                id: selectedItem?._id, status: store.status, guestId: selectedItem.guestId
            });
            editStatus();
        } else {
            //@ts-ignore
            const editGuestStatus = async() => await postData('/api/admin/order/edit', {id: selectedItem?._id, status: store.status});
            editGuestStatus();
        }
        getAndSetOrderList();
        getAndSetGuestOrderList()
        setOpenStatusEdit(false);
    };

    const handleClose = () => {
        setOpenUserInfo(false);
        setOpenStatusInfo(false);
        setOpenStatusEdit(false);
        setOpenOrderInfo(false);
    };

return (
    <>
        <TableContainer component={Paper} className={container}>
          <Table className={table}>
            <TableHead>
                <TableRow>
                {tableHeadItems.map((item: tableHeadItemsProps) => 
                    <TableCell key={item.entry} align={item.align || 'inherit'}>{item.entry}</TableCell>
                )}
                </TableRow>
            </TableHead>
            <TableBody>
                {list.map((item: ListItemProps) => 
                    <OrderListTable item={item} 
                        handleUserInfoClickOpen={handleUserInfoClickOpen} 
                        handleOrderInfoClickOpen={handleOrderInfoClickOpen} 
                        returnedTime={returnedTime} 
                        handleStatusInfoClickOpen={handleStatusInfoClickOpen} 
                        handleStatusEditOpen={handleStatusEditOpen}
                    />
                )}
            </TableBody>
            <TableBody>
                {guestOrderList.map((item: ListItemProps) =>
                    <OrderListTable item={item} 
                        handleOrderInfoClickOpen={handleOrderInfoClickOpen} 
                        returnedTime={returnedTime} 
                        handleStatusInfoClickOpen={handleStatusInfoClickOpen} 
                        handleStatusEditOpen={handleStatusEditOpen}
                    />
                )}
            </TableBody>
          </Table>
        </TableContainer>
        {openUserInfo && <InfoDialog 
            open={openUserInfo} 
            //@ts-ignore
            info={selectedItem}
            handleClose={handleClose}
        />}
        {openStatusInfo && <InfoDialog 
            open={openStatusInfo} 
            //@ts-ignore
            info={selectedItem} 
            handleClose={handleClose}
        />}
        {openStatusEdit && <EditDialog
            open={openStatusEdit} 
            handleClose={handleClose}
            handleSave={handleSave}
        />}
        {openOrderInfo && <InfoTableDialog 
            open={openOrderInfo} 
            //@ts-ignore
            info={selectedItem} 
            handleClose={handleClose}
        />}
    </>
    );
})


{/* {list.map((item: ListItemProps) => {
                    return(
                    <TableRow key={item._id}>
                        <TableCell component='th' scope='row' align='inherit'>
                            {`${item.userData.firstName} ${item.userData.lastName}`}
                            <IconButton className={button} onClick={() => handleUserInfoClickOpen(item.userData)}>
                                <InfoOutlinedIcon color="action" />
                            </IconButton>
                        </TableCell>
                        <TableCell align='center'>
                            <IconButton className={button} onClick={() => handleOrderInfoClickOpen(item.cartId)}>
                                <InfoOutlinedIcon color="action" />
                            </IconButton>
                        </TableCell>
                        <TableCell align='center'>
                            {item.createdAt}
                        </TableCell>
                        <TableCell align='center'>
                            {item.amount}
                        </TableCell>
                        <TableCell align='center'>
                            {returnedTime(item) ? 'true' : 'false'}
                        </TableCell>
                        <TableCell align='center'>
                            {item.status}
                            <IconButton className={button} onClick={() => handleStatusInfoClickOpen(item.events)}>
                                <InfoOutlinedIcon color="action" />
                            </IconButton>
                        </TableCell>
                        <TableCell align='center'>
                            <IconButton className={button} onClick={() => handleStatusEditOpen(item)}>
                                <EditIcon color="action" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                )})} */}