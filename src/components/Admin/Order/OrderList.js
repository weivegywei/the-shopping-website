import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import { InfoDialog } from '../../Utilities/InfoDialog';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  table: {
    minWidth: 650,
    maxWidth: 1250
  }
});

const tableHeadItems = [
    {entry: 'User name & info'},    
    {entry: 'Paid time', align: "center"},
    {entry: 'Order amount', align: "center"},
    {entry: 'Returned status', align: "center"},
    {entry: 'Current status', align: "center"},
    {entry: 'Edit', align: "center"}
];

export const OrderListPage = () => {
    const {container, table} = useStyles();
    const [list, setList] = useState([]);
    const [openUserInfo, setOpenUserInfo] = useState(false);
    const [openStatusInfo, setOpenStatusInfo] = useState(false);
    const [selectedItem, setSelectedItem] = useState();

    const getOrderList = async() => {
        const res = await getData('/api/admin/order/list');
        setList(res.data.map(it => ({...it, userData: it.userInfo[0]})));
      }
    
      useEffect(() => {
        getOrderList();
        },[]);

    const returnedTime = (item) => {
        const event = item.events.find(({status}) => status === 'returned');
        return event ? event.time : null;
    }

    const handleUserInfoClickOpen = (item) => {
        const a = [{fieldName: 'First Name', fieldValue: item.firstName}, {fieldName: 'Last Name', fieldValue: item.lastName}, 
        {fieldName: 'Email', fieldValue: item.email}, {fieldName: 'Address', fieldValue: item.address}, 
        {fieldName: 'Country', fieldValue: item.country}];
        setOpenUserInfo(true);
        setSelectedItem(a);
        console.log(item)
      };

    const handleStatusInfoClickOpen = (items) => {
        const a = items.map(item => {return {fieldName: item.status, fieldValue: item.time}});
        setOpenStatusInfo(true);
        setSelectedItem(a)
    };
    
    const handleClose = () => {
        setOpenUserInfo(false);
        setOpenStatusInfo(false);
    };

return (
    <>
        <TableContainer component={Paper} className={container}>
            <Table className={table}>
            <TableHead>
                <TableRow>
                {tableHeadItems.map((item)=> 
                    <TableCell align={item.align || 'inherit'}>{item.entry}</TableCell>
                )}
                </TableRow>
            </TableHead>
            <TableBody>
                {list.map((item) => (
                <TableRow key={item._id}>
                    <TableCell component='th' scope='row' align='inherit'>
                        {`${item.userData.firstName} ${item.userData.lastName}`}
                    <IconButton onClick={() => handleUserInfoClickOpen(item.userData)}>
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
                        <IconButton onClick={() => handleStatusInfoClickOpen(item.events)}>
                            <InfoOutlinedIcon color="action" />
                        </IconButton>
                    </TableCell>
                    <TableCell align='center'><EditIcon color="action" /></TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        {openUserInfo && <InfoDialog 
            open={openUserInfo} 
            info={selectedItem}
            handleClose={handleClose}
        />}
        {openStatusInfo && <InfoDialog 
            open={openStatusInfo} 
            info={selectedItem} 
            handleClose={handleClose}
        />}
    </>
    );
}
//JSON.stringify(selectedItem.userData)