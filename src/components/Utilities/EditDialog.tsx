import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { EditStatusDropdown } from './EditStatusDropdown';
import { orderStatusStore as store } from '../../store/orderStatusStore';
import { observer } from "mobx-react";
import Button from '@material-ui/core/Button';

type EditDialogProps = {
    open: boolean;
    handleClose: () => void;
    handleSave: () => void;
}

export const EditDialog = observer(({open, handleClose, handleSave}: EditDialogProps) => 
    <Dialog open={open}>
        <DialogContent>
            <EditStatusDropdown store={store} />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
            Save
            </Button>
        </DialogActions>
    </Dialog>
)