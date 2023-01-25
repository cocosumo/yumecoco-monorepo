import {
  FormLabel,
  Stack,
  StackProps,
  Typography,
  TypographyProps } from '@mui/material';
import { ReactNode } from 'react';

type LabeledInfoProps = TypographyProps & {
  label: string,
  info: ReactNode,
  direction?: StackProps['direction']
};

export const LabeledInfo = ( props : LabeledInfoProps) =>{

  const {
    info,
    label,
    fontSize = 16,
    direction = 'column',
    fontWeight = 'bold',
    variant = 'subtitle1',
  } = props;


  return (

    <Stack direction={direction} alignItems={'center'} spacing={1}>
      <FormLabel>
        {label}
      </FormLabel>
      <Typography noWrap variant={variant} fontSize={fontSize}
        fontWeight={fontWeight}
      >
        {info}
      </Typography>
    </Stack>

  );
};

export default LabeledInfo;