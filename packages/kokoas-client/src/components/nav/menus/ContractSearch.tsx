
import { pages } from '../../../pages/Router';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { LinkListItemButton } from './common/LinkListItemButton';

export const ContractSearch = () => {
  return (
    <LinkListItemButton to={pages.projContractSearch} icon={<ManageSearchIcon />} text={'契約一覧'} />
  );
};