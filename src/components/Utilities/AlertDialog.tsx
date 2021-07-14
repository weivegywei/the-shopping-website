import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export const AlertDialog = ({open, handleClose, handleConfirm, alertMsg, confirmMsg}) => 
    <Dialog
    open={open}
    onClose={handleClose}
    >
        <DialogContent>
            <DialogContentText>
            {alertMsg}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
            </Button>
            <Button onClick={handleConfirm} color="primary">
            {confirmMsg}
            </Button>
        </DialogActions>
    </Dialog>
    