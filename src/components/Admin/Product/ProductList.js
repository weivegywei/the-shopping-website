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
import { DeleteButton } from './DeleteButton';
import { getData } from '../../../api/getData';
import { postData } from '../../../api/postData';
import { AlertDialog } from '../../Utilities/AlertDialog';

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

const transformBoolean = (a) => a ? 'Yes' : 'No'

const tableHeadItems = [
    {entry: 'Product name'},    
    {entry:'ManufacturerName', align: "right"},
    {entry:'Inventory', align: "right"},
    {entry:'Price', align: "right"},
    {entry:'Availability', align: 'right'},
    {entry: 'Specification', align: 'right'},
    {entry: 'Specification description', align: 'right'},
    {entry: 'Package size', align: 'right'},
    {entry:'Edit', align: "right"},
    {entry:'Delete', align: "right"},
];
const tableBodyItems = [
    {component: 'th', scope: 'row', key: 'name'},
    {align: 'right', key: 'manufacturerName'},
    {align: 'right', key: 'inventory'},
    {align: 'right', key: 'price'},
    {align: 'right', key:'availability'},
    {align: 'right', key: 'specification'},
    {align: 'right', key: 'specificationDescr'},
    {align: 'right', key: 'packageSize'},
]

export function ProductListPage() {
  const {container, table} = useStyles();
  const [list, setList] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const handleDelete = async(item) => {
    await postData('/api/admin/product/delete', {productId: item._id});
    getProductList();
  }
  const [open, setOpen] = useState(false);
  const handleClickOpen = (item) => {
      setOpen(true);
      setSelectedItem(item);
    };

  const getProductList = async() => {
    const res = await getData('/api/admin/product/list');
    setList(res.data);
  }

  useEffect(() => {
    getProductList();
    },[]);

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
            <TableRow key={item.name}>
                {tableBodyItems.map((it)=>
                    <TableCell 
                    component={it.component || 'default'} 
                    scope={it.scope || 'default'} 
                    align={it.align || 'inherit'}
                    >
                    {typeof(item[it.key])==='boolean' ? transformBoolean(item[it.key]) : item[it.key]}
                    </TableCell>
                )}
                <TableCell align='right'><EditIcon color="action" /></TableCell>
                <TableCell align='right'><DeleteButton onClick={() => handleClickOpen(item)} /></TableCell>
            </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
    {open && 
    <AlertDialog 
      open={open} 
      handleClose={() => setOpen(false)} 
      handleConfirm={() => handleDelete(selectedItem) && setOpen(false)}
      alertMsg = 'Are you sure you want to delete this product?'
      confirmMsg = 'Delete'
    />}
    </>
  );
}
