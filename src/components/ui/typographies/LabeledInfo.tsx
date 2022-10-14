import { Stack, StackProps, Typography } from '@mui/material';
import { Caption } from './Caption';


export const LabeledInfo = ({
  label,
  info = '',
  fontSize = 16,
  direction = 'column',
}: {
  label: string,
  info?: string
  fontSize?: number
  direction?: StackProps['direction']
}) =>{


  return (

    <Stack direction={direction}>
      <Caption text={label} />
      <Typography fontSize={fontSize} >
        {info ? info : '-'}
      </Typography>
    </Stack>

  );
};

export default LabeledInfo;