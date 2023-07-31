import { pages } from 'kokoas-client/src/pages/Router';
import { LinkListItemButton } from '../common/LinkListItemButton';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { Divider } from '@mui/material';

export const Search = () => {
  return (
    <>
      <Divider textAlign='left'>
        検索
      </Divider>
      <LinkListItemButton to={pages.projSearch} icon={<PersonSearchIcon />} text={'顧客検索'}  />
      <LinkListItemButton to={pages.projContractSearch} icon={<FindInPageIcon />} text={'契約検索'}  />
    </>
  );
};