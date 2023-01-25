
import { pages } from '../../../pages/Router';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { LinkListItemButton } from './common/LinkListItemButton';

export const ContractInput = () => {
  return (
    <LinkListItemButton to={pages.projContractPreview} icon={<LocalPrintshopIcon />} text={'契約を印刷'} />
  );
};