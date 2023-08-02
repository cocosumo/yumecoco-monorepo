import { pages } from 'kokoas-client/src/pages/Router';
import { LinkListItemButton } from '../common/LinkListItemButton';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HardwareIcon from '@mui/icons-material/Hardware';
import { FaFileSignature } from '@react-icons/all-files/fa/FaFileSignature';
import { Divider } from '@mui/material';

export const Registrations = () => {

  return (
    <>
      <Divider textAlign='left'>
        登録
      </Divider>
      <LinkListItemButton to={pages.custGroupEditV2} icon={<GroupAddIcon />} text={'顧客登録'}  />
      <LinkListItemButton to={pages.projEditV2} icon={<HardwareIcon />} text={'工事情報登録'}  />
      <LinkListItemButton to={pages.projContractPreviewV2} icon={<FaFileSignature size={18} />} text={'契約登録'}  />

    </>
  );
}; 