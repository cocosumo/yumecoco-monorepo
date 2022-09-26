import { Stack, Typography } from '@mui/material';
import { Caption } from './Caption';

export interface LabeledInfoProps {
  label: string,
  data?: string
}

export const LabeledInfo = ({ label, data = '' }: LabeledInfoProps) =>{


  return (

    <Stack direction={'column'}>
      <Caption text={label} />
      <Typography fontSize={16} >
        {data ? data : '-'}
        {' '}
      </Typography>
    </Stack>

  );
};

export default LabeledInfo;