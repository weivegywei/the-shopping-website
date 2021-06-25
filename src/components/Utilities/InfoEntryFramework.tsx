import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { observer } from 'mobx-react-lite';
import { manufacturerStoreType, ManufacturerStoreKeys } from '../../store/manufacturerStore';
import { ProductStoreKeys, ProductStoreType } from '../../store/productStore';
import styles from './InfoEntryFramework.module.scss';

type InfoEntryFrameworkProps = {
    item: {
        primary: string;
        type: string;
        key: ManufacturerStoreKeys | ProductStoreKeys;
        error: boolean;
        errorMessage: string;
    };
    store: manufacturerStoreType | ProductStoreType;
}

export const InfoEntryFramework = observer(
    ({item, store}: InfoEntryFrameworkProps) => {
    const {formField, input, errorinput, errorDiv,errorMsg} = styles;

    return (
        <ListItem divider className={formField}>
            <ListItemText primary={item.primary} />
            <div className={errorDiv}>
                <input 
                    type={item.type} 
                    className={item.error ? errorinput : input} 
                    //@ts-ignore
                    onChange={(e) => store.changeValue(item.key, e.target.value)
                }></input>
                <div className={errorMsg}>
                {item.errorMessage ? item.errorMessage : ''}
                </div>
            </div>
        </ListItem>
    )
})
