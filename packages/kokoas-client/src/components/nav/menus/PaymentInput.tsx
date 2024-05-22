
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { pages } from '../../../pages/Router';
import { LinkListItemButton } from './common/LinkListItemButton';


export default function PaymentInput() {

  return (
    <LinkListItemButton to={pages.projPaymentInput} icon={<FactCheckIcon />} text={'入金入力'}
      indented
    />
  );
}