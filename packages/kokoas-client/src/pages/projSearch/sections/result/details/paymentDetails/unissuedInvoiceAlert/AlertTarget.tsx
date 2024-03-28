import { Stack, Typography } from '@mui/material';
import { IProjects } from 'types';

export const AlertTarget = ({
  agents,
}: {
  agents: IProjects['agents'] | undefined
}) => {

  const alertTarget = agents?.value.filter(({
    value: {
      agentName,
      agentType,
    },
  }) => agentName.value !== '' && agentType.value === 'cocoAG');

  return (
    <Stack 
      direction={'row'}
      spacing={1}
    >
      <Typography
        variant='body2'
        sx={{
          color: 'gray',
        }}
      >
        通知対象者 :
      </Typography>

      <Typography
        variant='body1'
        sx={{
          pl: '10px',
        }}
      >
        {alertTarget &&
          alertTarget?.map(({ value }) => value.agentName.value)
            .join(', ')}
        {!alertTarget && 'ここすも営業担当者を取得できません。設定を見直してください'}
      </Typography>
    </Stack>
  );
};
