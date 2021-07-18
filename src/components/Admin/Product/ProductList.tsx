import { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { DeleteButton } from './DeleteButton';
import { getData } from '../../../api/getData';
import { postData } from '../../../api/postData';
import { AlertDialog } from '../../Utilities/AlertDialog';
import { EditProductDialogWrapper, ProductListItem } from './EditProduct/EditProductDialog';
import styles from './ProductList.module.scss';

const transformBoolean = (val: boolean) => val ? 'Yes' : 'No'

enum AlignType {
  align = 'right'
}

enum ProductListItemKeys {
  _id = '_id',
  specificationDescr = 'specificationDescr',
  name = 'name',
  manufacturerId = 'manufacturerId',
  price = 'price',
  imageUrl = 'imageUrl',
  inventory = 'inventory',
  description = 'description',
  packageSize = 'packageSize',
  availability = 'availability',
  specification = 'specification',
  category = 'category'
}

type TableHeadItems = {
  entry: string;
  align?: AlignType
}

const tableHeadItems = [
    {entry: 'Product name'},    
    {entry:'Manufacturer name', align: AlignType.align},
    {entry:'Inventory', align: AlignType.align},
    {entry:'Price', align: AlignType.align},
    {entry:'Availability', align: AlignType.align},
    {entry: 'Specification', align: AlignType.align},
    {entry: 'Specification description', align: AlignType.align},
    {entry: 'Package size', align: AlignType.align},
    {entry:'Edit', align: AlignType.align},
    {entry:'Delete', align: AlignType.align},
];

export const ProductList = () => {
  const {container, table} = styles;
  const [list, setList] = useState<ProductListItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ProductListItem>();
  const [selectedEditItem, setSelectedEditItem] = useState<ProductListItem>();
  const handleDelete = async(item: ProductListItem) => {
    await postData('/api/admin/product/delete', {productId: item._id});
    getProductList();
  }
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  
  const editItem = (item: ProductListItem) => {
    setOpenEdit(true);
    setSelectedEditItem(item);
  };

  const handleClickOpen = (item: ProductListItem) => {
    setOpenDeleteAlert(true);
    setSelectedItem(item);
  };

  const getProductList = async() => {
    const res = await getData('/api/admin/product/list');
    setList(res.data);
  }

  const handleConfirm = () => {
    if(selectedItem) {
      handleDelete(selectedItem);
      setOpenDeleteAlert(false)
    }
  }

  const handleClose = () => {
    setOpenDeleteAlert(false);
    setOpenEdit(false);
    getProductList();
  }

  useEffect(() => {
    getProductList();
    },[]);

  return (
    <>
    <TableContainer component={Paper} className={container}>
      <Table className={table}>
        <TableHead >
          <TableRow key='productListTableHeadRow' >
            {tableHeadItems.map((item: TableHeadItems)=> 
                <TableCell align={item.align || 'inherit'}>{item.entry}</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item: ProductListItem) => (
            <TableRow key={item.name}>
                <TableCell scope='row'>{item.name}</TableCell>
                <TableCell scope='default' align='right'>{item.manufacturerInfo[0].name}</TableCell>
                <TableCell scope='default' align='right'>{item.inventory}</TableCell>
                <TableCell scope='default' align='right'>{item.price}</TableCell>
                <TableCell scope='default' align='right'>{transformBoolean(item.availability)}</TableCell>
                <TableCell scope='default' align='right'>{item.specification}</TableCell>
                <TableCell scope='default' align='right'>{item.specificationDescr}</TableCell>
                <TableCell scope='default' align='right'>{item.packageSize}</TableCell>
                <TableCell align='right'>
                  <IconButton onClick={() => editItem(item)}>
                      <EditIcon color="action" />
                  </IconButton>
                </TableCell>
                <TableCell align='right'><DeleteButton onClick={() => handleClickOpen(item)} /></TableCell>
            </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
    {openDeleteAlert && 
    <AlertDialog 
      open={openDeleteAlert} 
      handleClose={handleClose} 
      handleConfirm={handleConfirm}
      alertMsg = 'Are you sure you want to delete this product?'
      confirmMsg = 'Delete'
    />}
    {openEdit &&
    <EditProductDialogWrapper
      open={openEdit}
      item={selectedEditItem}
      handleClose={handleClose}
    />}
    </>
  );
}
