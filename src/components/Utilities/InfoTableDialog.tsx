import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import styles from './InfoTableDialog.module.scss';

type InfoItemEntryType = {
    fieldName: string;
    fieldValue: string | number;
}

export type InfoItemType = InfoItemEntryType[];

type InfoTableDialogProps = {
    open: boolean;
    handleClose: () => void;
    info: InfoItemType[] | null;
}

export const InfoTableDialog = ({open, handleClose, info}: InfoTableDialogProps) => {
    const { paper } = styles;
    
return (
    <Dialog open={open} onClose={handleClose}>
        <DialogContent>
            {info.map((item, idx) => 
                <div>
                    <Paper elevation={0} className={paper}>
                        {item.map((it) =>
                            <div>
                                <TableRow key={it.fieldValue}>
                                    {it.fieldName + ': ' + it.fieldValue}
                                </TableRow>
                            </div>
                        )}
                    </Paper>
                {idx + 1 < info.length && <Divider variant="middle" />}
                </div>
            )}
        </DialogContent>
    </Dialog>
)}

