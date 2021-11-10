import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import TableCell from '@material-ui/core/TableCell';
import { UserDataType, ListItemProps, ReturnedTimeProps, Events } from './OrderList.util';
import styles from './OrderListTable.module.scss'

type OrderListTableProps = {
    item: ListItemProps,
    handleUserInfoClickOpen?: (item: UserDataType) => void,
    handleOrderInfoClickOpen: (cartId: string) => void,
    returnedTime: (item: ReturnedTimeProps) => string | null, 
    handleStatusInfoClickOpen: (items: Events[]) => void,
    handleStatusEditOpen: (item: ListItemProps) => void
}

export const OrderListTable = ({ item, handleUserInfoClickOpen, handleOrderInfoClickOpen, returnedTime, 
    handleStatusInfoClickOpen, handleStatusEditOpen }: OrderListTableProps) => {
        const { button } = styles;
        
    return (
        <TableRow key={item._id}>
            <TableCell component='th' scope='row' align='inherit'>
                { item.userData ? 
                    <>
                    {`${item.userData.firstName} ${item.userData.lastName}`}
                    <IconButton className={button} onClick={() => handleUserInfoClickOpen(item.userData)}>
                        <InfoOutlinedIcon color="action" />
                    </IconButton>
                    </> : 
                    null
                }
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
)}

