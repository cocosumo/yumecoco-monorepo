import { Menu } from '@mui/material';
import { useProspectsNextMonth } from '../../../../../hooks/useProspectsNextMonth';
import { ProspectItem } from './ProspectItem';

export const ProspectsList = ({
  anchorEl,
  open,
  handleClose,
}:{
  anchorEl: HTMLElement | null,
  open: boolean,
  handleClose: () => void,
}) => {
  const { data } = useProspectsNextMonth();
  const {
    filteredData,
  } = data || {};



  return (
    <Menu
      id="demo-positioned-menu"
      aria-labelledby="demo-positioned-button"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      
    >
      {filteredData?.map((projRec, idx) => {
        return (
          <ProspectItem 
            idx={idx}
            handleClose={handleClose}
            key={projRec.uuid.value}
            {...projRec}
          />
          
        );
      })}
    </Menu>
  );
};