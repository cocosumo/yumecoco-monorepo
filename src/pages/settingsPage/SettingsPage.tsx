import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';
import { SettingsList } from './SettingsList';

export const SettingsPage = () => {

  return (
    <MainContainer>
      <PageTitle label='設定' />

      <SettingsList />
    </MainContainer>
  );
};