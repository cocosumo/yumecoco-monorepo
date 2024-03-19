import { Chip, Stack, Typography, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ReactNode } from 'react';
import { MdOutlineKeyboardReturn } from 'react-icons/md';

const CustomChip = styled(Chip)(() => ({
  backgroundColor: grey[600],
  borderRadius: 5,
  fontSize: 9,
  fontWeight: 600,
  height: 'unset',
  color: 'white',
  '& > span.MuiChip-label': {
    padding: '0px 4px',
  },
}));

const Info = ({
  label,
  value,
  icon,
}:{
  label: string,
  value: string,
  icon: ReactNode
}) => {
  return (
    <Stack
      direction={'row'}
      spacing={1}
    >
      <CustomChip label={(
        <Stack 
          direction={'row'} 
          spacing={0.5}
          alignItems={'center'}
        >
          <span>
            {label}
          </span>
          {icon}
        </Stack>
        )}  
      />
      <Typography color={'grey.600'}>
        {value}
      </Typography>
    </Stack>
  );
};

export const Usage = () => {
  return (
    <Stack
      direction={'row'}
      spacing={2}
    >

      <Info
        label='Enter'
        value='編集モード'
        icon={<MdOutlineKeyboardReturn fontSize={16} />}
      />

      <Info
        label='Esc'
        value='セル移動モード'
        icon={null}
      />


    </Stack>
  );
};