
import { pages } from '../../../pages/Router';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { LinkListItemButton } from './common/LinkListItemButton';

export const ContractInputV2 = () => {
  return (
    <LinkListItemButton to={pages.projContractPreviewV2} icon={<LocalPrintshopIcon />} text={'契約を印刷'} />
  );
};