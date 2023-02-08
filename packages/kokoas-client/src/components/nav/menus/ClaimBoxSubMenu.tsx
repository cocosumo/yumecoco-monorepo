import { generateParams } from 'kokoas-client/src/helpers/url';
import { pages } from 'kokoas-client/src/pages/Router';
import { CollapsibleList } from './common/CollapsibleList';
import { LinkListItemButton } from './common/LinkListItemButton';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';


export const ClaimBoxSubMenu = ({
  open,
}: { open: boolean }) => {
  return (
    <CollapsibleList open={open}>
      <LinkListItemButton
        to={`${pages.projClaim}?${generateParams({ menuOpen: +false })}`}
        icon={<AppRegistrationIcon />}
        text={'登録'}
      />
    </CollapsibleList>
  );
};