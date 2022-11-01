import {  Card, CardHeader, IconButton } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useState } from 'react';

export const SettingsItem = ({
  settingsName,
  settingsDescription,
  link,
}: {
  settingsName: string,
  settingsDescription: string,
  link: string,
}) => {
  const  [isRaised, setIsRaised] = useState(false);

  return (

    <Card
      sx={{
        minHeight: '8vw',
      }}
      raised={isRaised}
      onMouseEnter={() => setIsRaised(true)}
      onMouseLeave={() => setIsRaised(false)}
    >
      <CardHeader
        title={settingsName}
        subheader={settingsDescription}
        action={
          <IconButton href={link} target={'_blank'}>
            <NavigateNextIcon />
          </IconButton>
        }
      />
    </Card>


  );
};