import { useEffect, useState, useContext } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';
import { getData } from '../../../api/getData';
import { postData } from '../../../api/postData';
import { InfoDialog, InfoItemProps } from '../../Utilities/InfoDialog';
import { InfoTableDialog, InfoItemType } from '../../Utilities/InfoTableDialog';
import { EditDialog } from '../../Utilities/EditDialog';
import { orderStatusStore as store } from '../../../store/orderStatusStore';
import { observer } from "mobx-react";
import styles from './OrderList.module.scss';
import { UserDataType, ListItemProps, ResDataMapProps, ReturnedTimeProps, Events, tableHeadItems, tableHeadItemsProps} from './OrderList.util'
import { OrderListTable } from './OrderListTable'
import { AppContext } from '../../../AppContext'

export const OrderList = observer(() => {
    const {container, table} = styles;
    const [list, setList] = useState([]);
    const [openUserInfo, setOpenUserInfo] = useState(false);
    const [openStatusInfo, setOpenStatusInfo] = useState(false);
    const [openStatusEdit, setOpenStatusEdit] = useState(false);
    const [openOrderInfo, setOpenOrderInfo] = useState(false);
    const [selectedItem, setSelectedItem] = useState<InfoItemProps[] | UserDataType | ListItemProps | InfoItemType | null>(null);
    const { setNotificationInfo } = useContext(AppContext);

    const getAndSetOrderList = async() => {
        const res = await getData('/api/admin/order/list');
        setList(res.data.map((it: ResDataMapProps) => ({...it, userData: it.userInfo[0]})));
    };

    useEffect(() => {
        getAndSetOrderList();
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
    
    const handleOrderInfoClickOpen = async(cartId: string) => {
        const res = await postData('/api/admin/order/info', {cartId});
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
        const editStatus = async() => await postData('/api/admin/order/edit', {id: selectedItem?._id, status: store.status});
        editStatus();
        getAndSetOrderList();
        setOpenStatusEdit(false);
        setNotificationInfo('success', `Order status updated to '${store.status}'.`)
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

