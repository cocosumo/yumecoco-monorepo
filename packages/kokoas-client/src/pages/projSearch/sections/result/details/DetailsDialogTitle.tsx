import { Chip, CircularProgress, Stack, Typography } from '@mui/material';
import { useDetailedAndpadOrderByProjId } from 'kokoas-client/src/hooksQuery';

export const DetailsDialogTitle = ({
  projName,
  projId,
}:{
  projName: string
  projId : string
}) => {

  const { data: andpadData, isLoading } = useDetailedAndpadOrderByProjId({
    projId,
    series: ['案件フロー'],
  });

  const {
    data,
  } = andpadData || {};

  const {
    案件フロー: flow,    
  } = data?.object || {};


  return (
    <Stack
      direction={'row'}
      spacing={2}
    >
      <Typography variant='h5'>
        {projName}
      </Typography>
      {!isLoading && flow && <Chip label={flow} size='small' />}
      {isLoading && <CircularProgress size={16} />}
    </Stack>
  );
};