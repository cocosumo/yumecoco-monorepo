import { Divider, Stack, Typography } from '@mui/material';
import { useWatch } from 'react-hook-form';
import { TForm } from '../schema';
import { blue, green, grey } from '@mui/material/colors';

const SummaryContent = ({
  label,
  value,
}:{
  label: string;
  value: string;
}) => {
  return (
    <Stack 
      py={1}
      width={'100%'}
    >
      <Typography textAlign={'center'} fontSize={12} color={grey[600]}>
        {label}
      </Typography>
      <Typography textAlign={'center'} fontSize={16}>
        {value}
      </Typography>
    </Stack>
  );
};

export const Summary = () => {
  const items = useWatch<TForm>({
    name: 'items',
  });

  

  return (
    <Stack 
      bgcolor={'red'} 
      direction={'row'}
      justifyContent={'space-between'}
      divider={<Divider color={grey[200]} orientation={'vertical'} flexItem />}
      sx={{
        '& div:nth-of-type(odd)': {
          bgcolor: blue[50],
        },
        '& div:nth-of-type(even)': {
          bgcolor: green[50],
        },
        border: 2,
        borderColor: grey[300],
      }}
    >
      <SummaryContent
        label='税抜金額'
        value='1000'
      />
      <SummaryContent
        label='消費税'
        value='1000'
      />
      <SummaryContent
        label='税込金額'
        value='1000'
      />
      <SummaryContent
        label='原価'
        value='1000'
      />
      <SummaryContent
        label='粗利'
        value='1000'
      />
      <SummaryContent
        label='粗利率'
        value='1000'
      />
    </Stack>
  );
};