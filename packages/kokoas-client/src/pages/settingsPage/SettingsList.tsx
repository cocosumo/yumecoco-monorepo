import { Grid } from '@mui/material';
import { SettingsItem } from './SettingsItem';
import { useSettings } from './useSettings';

export const SettingsList = () => {
  const { settingsList } = useSettings();

  return (
    <>
      {settingsList?.map(item => (
        <Grid item
          key={item.settingsName}
          xs={12}
          md={4}
          lg={3}
        >
          <SettingsItem {...item} />
        </Grid>
      ) )}
    </>


  );
};