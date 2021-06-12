import { useEffect, useState } from 'react';
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
import styles from './ProductList.module.scss';
import { CategoryType } from '../../../store/productStore';

const transformBoolean = (a: boolean) => a ? 'Yes' : 'No'

enum AlignType {
  align = 'right'
}

enum SpecificationType {
  none = '',
  type = 'type',
  volume = 'volume',
  size = 'size',
  color = 'color',
  flavor = 'flavor',
  aroma = 'aroma'
}

enum TableBodyItemsKeys {
  name = 'name',
  manufacturerName = 'manufacturerName',
  inventory = 'inventory',
  price = 'price',
  availability = 'availability',
  specification = 'specification',
  specificationDescr = 'specificationDescr',
  packageSize = 'packageSize',
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

type ProductListItem = {
  _id: string;
  specificationDescr: string[];
  name: string;
  manufacturerId: string;
  price: number;
  imageUrl: string;
  inventory: number;
  description: string;
  packageSize: string;
  availability: boolean;
  specification: SpecificationType;
  category: CategoryType
}

type TableHeadItems = {
  entry: string;
  align?: AlignType
}

type TableBodyItems = {
  scope?: string;
  key: string;
  align?: AlignType
}

const tableHeadItems = [
    {entry: 'Product name'},    
    {entry:'ManufacturerName', align: AlignType.align},
    {entry:'Inventory', align: AlignType.align},
    {entry:'Price', align: AlignType.align},
    {entry:'Availability', align: AlignType.align},
    {entry: 'Specification', align: AlignType.align},
    {entry: 'Specification description', align: AlignType.align},
    {entry: 'Package size', align: AlignType.align},
    {entry:'Edit', align: AlignType.align},
    {entry:'Delete', align: AlignType.align},
];
const tableBodyItems: {scope?: string | undefined, key: TableBodyItemsKeys, align?: AlignType}[] = [
    {scope: 'row', key: TableBodyItemsKeys.name},
    {align: AlignType.align, key: TableBodyItemsKeys.manufacturerName},
    {align: AlignType.align, key: TableBodyItemsKeys.inventory},
    {align: AlignType.align, key: TableBodyItemsKeys.price},
    {align: AlignType.align, key: TableBodyItemsKeys.availability},
    {align: AlignType.align, key: TableBodyItemsKeys.specification},
    {align: AlignType.align, key: TableBodyItemsKeys.specificationDescr},
    {align: AlignType.align, key: TableBodyItemsKeys.packageSize},
]


export const ProductListPage = () => {
  const {container, table} = styles;
  const [list, setList] = useState<ProductListItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ProductListItem>();
  const handleDelete = async(item: ProductListItem) => {
    await postData('/api/admin/product/delete', {productId: item._id});
    getProductList();
  }
  const [open, setOpen] = useState(false);
  const handleClickOpen = (item: ProductListItem) => {
      setOpen(true);
      setSelectedItem(item);
    };

  const getProductList = async() => {
    const res = await getData('/api/admin/product/list');
    setList(res.data);
  }

  const handleConfirm = () => {
    if(selectedItem) {
      handleDelete(selectedItem);
      setOpen(false)
    }
  }

  const handleClose = () => setOpen(false);

  useEffect(() => {
    getProductList();
    },[]);

  return (
    <>
    <TableContainer component={Paper} className={container}>
      <Table className={table}>
        <TableHead>
          <TableRow>
            {tableHeadItems.map((item: TableHeadItems)=> 
                <TableCell align={item.align || 'inherit'}>{item.entry}</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item: ProductListItem) => (
            <TableRow key={item.name}>
                {tableBodyItems.map((it: TableBodyItems)=>
                    <TableCell  
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
      handleClose={handleClose} 
      handleConfirm={handleConfirm}
      alertMsg = 'Are you sure you want to delete this product?'
      confirmMsg = 'Delete'
    />}
    </>
  );
}
