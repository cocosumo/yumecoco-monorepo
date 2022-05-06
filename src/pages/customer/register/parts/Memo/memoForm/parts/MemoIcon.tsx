import CarpenterIcon from '@mui/icons-material/Carpenter';
import NordicWalkingIcon from '@mui/icons-material/NordicWalking';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import ForumIcon from '@mui/icons-material/Forum';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import { MemoType } from '../MemoForm';

export const MemoIcon = ({ type }: { type: MemoType }) => {
  switch (type) {
    case '顧客情報':
      return <PermIdentityIcon />;
    case '打ち合わせ':
      return <ForumIcon />;
    case '契約内容':
      return <NordicWalkingIcon />;
    case '工事場所情報':
      return <CarpenterIcon />;
    case '問い合わせ':
      return <ContactSupportIcon />;
    case 'その他':
      return <OtherHousesIcon />;
  }
};