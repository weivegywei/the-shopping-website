import Menu from '@material-ui/core/Menu';

type FilterMenuProps = {
    props: {open: boolean; anchorEl: any; keepMounted: boolean; onClose: () => void}
}

export const FilterMenu = ({props}: FilterMenuProps) => <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />

