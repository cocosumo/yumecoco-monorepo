
import { pages } from '../../../pages/Router';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { LinkListItemButton } from './common/LinkListItemButton';
import { Box } from '@mui/material';



export const ContractInput = () => {
  return (
    <LinkListItemButton 
      to={pages.projContractPreview} 
      icon={<LocalPrintshopIcon />} 
      text={(
        <Box sx={{
          textDecoration: 'line-through',
        }}
        >
          契約を印刷
        </Box>)}
    />
  );
};