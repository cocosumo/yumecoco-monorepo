
import { pages } from '../../../pages/Router';
import CalculateIcon from '@mui/icons-material/Calculate';
import { generateParams } from '../../../helpers/url';
import { LinkListItemButton } from './common/LinkListItemButton';

export const EstimateSubMenuRegister = () => {
  return (
    <LinkListItemButton
      to={`${pages.projEstimate}?${generateParams({ menuOpen: +false })}`}
      icon={<CalculateIcon />}
      text={'見積もり登録'}
      target="_blank"
      rel="noopener noreferrer"
    />
  );
};