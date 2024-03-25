
import { pages } from '../../../pages/Router';
import { LinkListItemButton } from './common/LinkListItemButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export const OrderInput = () => {
  return (
    <LinkListItemButton to={pages.projOrderInput} icon={<AddShoppingCartIcon />} text={'新規登録'}
      indented
    />
  );
};