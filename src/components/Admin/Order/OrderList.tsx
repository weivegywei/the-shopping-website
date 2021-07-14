import { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import { getData } from '../../../api/getData';
import { postData } from '../../../api/postData';
import IconButton from '@material-ui/core/IconButton';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { InfoDialog, InfoItemProps } from '../../Utilities/InfoDialog';
import { InfoTableDialog, InfoItemType } from '../../Utilities/InfoTableDialog';
import { EditDialog } from '../../Utilities/EditDialog';
import { orderStatusStore as store } from '../../../store/orderStatusStore';
import { observer } from "mobx-react";
import styles from './OrderList.module.scss';

type UserName = {
    firstName: string;
    lastName: string
}

type Events = {
    status: string;
    time: string
}

type OrderInfoType = {
    productId: string;
    quantity: number;
    specificationValue: string;
    _id: string;
}

type CartInfoType = {
    cartItems: OrderInfoType;
}

type ResDataMapProps = {
    _id: string;
    userInfo: UserName[];
    cartInfo: CartInfoType;
    createdAt: string;
    status: string
}

type ReturnedTimeProps = {
    events: Events[]
}

type UserDataType = {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    country: string
}

type ListItemProps = {
    _id: string;
    cartId: string;
    userData: UserDataType;
    createdAt: string;
    amount: number;
    status: string;
    events: Events[]
}

enum AlignTypes {
    align = "center"
}

type tableHeadItemsProps = {
    entry: string;
    align?: AlignTypes
}

const tableHeadItems = [
    {entry: 'User name & info'},
    {entry: 'Order info', align: AlignTypes.align},
    {entry: 'Paid time', align: AlignTypes.align},
    {entry: 'Order amount', align: AlignTypes.align},
    {entry: 'Returned status', align: AlignTypes.align},
    {entry: 'Current status', align: AlignTypes.align},
    {entry: 'Edit status', align: AlignTypes.align}
];

export const OrderList = observer(() => {
    const {container, table, button} = styles;
    const [list, setList] = useState([]);
    const [openUserInfo, setOpenUserInfo] = useState(false);
    const [openStatusInfo, setOpenStatusInfo] = useState(false);
    const [openStatusEdit, setOpenStatusEdit] = useState(false);
    const [openOrderInfo, setOpenOrderInfo] = useState(false);
    const [selectedItem, setSelectedItem] = useState<InfoItemProps[] | UserDataType | ListItemProps | InfoItemType | null>(null);

    const getOrderList = async() => {
        console.log('pre res')
        const res = await getData('/api/admin/order/list');
        console.log('post res', res);
        setList(res.data.map((it: ResDataMapProps) => ({...it, userData: it.userInfo[0]})));
      };
      console.log('list', list);
    
      useEffect(() => {
        getOrderList();
        },[]);

    const returnedTime = (item: ReturnedTimeProps) => {
        const event = item.events?.find(({status}) => status === 'returned');
        return event ? event.time : null;
    };

    const handleUserInfoClickOpen = (item: UserDataType) => {
        const info = [{fieldName: 'First Name', fieldValue: item.firstName}, {fieldName: 'Last Name', fieldValue: item.lastName}, 
        {fieldName: 'Email', fieldValue: item.email}, {fieldName: 'Address', fieldValue: item.address}, 
        {fieldName: 'Country', fieldValue: item.country}];
        setOpenUserInfo(true);
        setSelectedItem(info);
    };
    
    const handleOrderInfoClickOpen = async(cartId) => {
        const res = await postData('/api/admin/order/info', {cartId});
        const info = res.data.map(it => {
            const { name, _id, inventory, price, packageSize, _doc: { quantity, specificationValue }} = it;
            return [{fieldName: 'Product Name', fieldValue: name}, {fieldName: 'Product Id', fieldValue: _id}, 
            {fieldName: 'Inventory', fieldValue: inventory}, {fieldName: 'Price', fieldValue: price }, 
            {fieldName: 'Package Size', fieldValue: packageSize}, {fieldName: 'Quantity', fieldValue: quantity}, 
            {fieldName: 'Specification Value', fieldValue: specificationValue}]});
        console.log(info , 'info');
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
        getOrderList();
        setOpenStatusEdit(false);
    };

    const handleClose = () => {
        setOpenUserInfo(false);
        setOpenStatusInfo(false);
        setOpenStatusEdit(false);
        setOpenOrderInfo(false);
    };

    console.log('list', list);

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
                {list.map((item: ListItemProps) => {
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
                )})}
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
