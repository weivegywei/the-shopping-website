import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TableRow from '@material-ui/core/TableRow';

export const InfoDialog = ({open, handleClose, info}) => 
    <Dialog open={open} onClose={handleClose}>
        <DialogContent>
            {info.map(item => 
                <TableRow key={item.fieldValue}>
                    {item.fieldName + ': ' + item.fieldValue}
                </TableRow>)}
        </DialogContent>
    </Dialog>