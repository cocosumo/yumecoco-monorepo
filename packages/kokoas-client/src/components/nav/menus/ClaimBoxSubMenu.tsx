import { generateParams } from 'kokoas-client/src/helpers/url';
import { pages } from 'kokoas-client/src/pages/Router';
import { CollapsibleList } from './common/CollapsibleList';
import { LinkListItemButton } from './common/LinkListItemButton';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';


export const EstimateSubMenu = ({
  open,
}: { open: boolean }) => {
  return (
    <CollapsibleList open={open}>
      <LinkListItemButton
        to={`${pages.projEstimate}?${generateParams({ menuOpen: +false })}`}
        icon={<HomeRepairServiceIcon />}
        text={'クレームBox登録'}
      />
    </CollapsibleList>
  );
};