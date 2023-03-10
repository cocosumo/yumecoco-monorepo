import { Menu } from '@mui/material';
import { AndpadLogo } from 'kokoas-client/src/components/ui/icons';
import { RiFileExcel2Fill } from '@react-icons/all-files/ri/RiFileExcel2Fill';
import { MenuItemWithIcon } from 'kokoas-client/src/components/ui/buttons/MenuItemWithIcon';


export const ExportEstimateMenu = ({
  anchorEl,
  handleClose,
}: {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}) => {
  const open = Boolean(anchorEl);

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItemWithIcon 
        onClick={handleClose} 
        icon={<AndpadLogo size={16} />} 
        label={'ANDPAD形式'}
        tooltipTitle={'ANDPAD形式のエクセルをダウンロードします'}
      />

      <MenuItemWithIcon 
        onClick={handleClose} 
        icon={<RiFileExcel2Fill color='green' size={16} />} 
        label={'エクセル'}
        tooltipTitle={'顧客用の見積書をダウンロードします'}
      />

    </Menu>
  );
};