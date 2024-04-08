
import { pages } from '../../../pages/Router';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { LinkListItemButton } from './common/LinkListItemButton';

export const ContractInput = () => {
  return (
    <LinkListItemButton to={pages.projContractPreviewV2} icon={<LocalPrintshopIcon />} text={'電子契約'}
      indented
    />
  );
};