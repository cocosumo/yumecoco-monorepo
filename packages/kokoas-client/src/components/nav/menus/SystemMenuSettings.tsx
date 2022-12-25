import SettingsIcon from '@mui/icons-material/Settings';
import { pages } from '../../../pages/Router';
import { LinkListItemButton } from './common/LinkListItemButton';

//href={`https://rdmuhwtt6gx7.cybozu.com/k/admin/app/flow?app=${kintone.app.getId()}#section=settings`}

export const SystemMenuSettings = () => {
  return (
    <LinkListItemButton
      to={pages.settings}
      icon={<SettingsIcon />}
      text={'設定'}
      indented={false}
    />
  );
};