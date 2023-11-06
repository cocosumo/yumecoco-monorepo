import { Box, Typography } from '@mui/material';

export const ChoiceTooltip = ({
  label,
}: {
  label: 'はい' | 'いいえ'
}) => {

  return (
    <Box>
      契約合計金額（税込）に設計契約金を      
      <Typography 
        component={'span'}
        fontWeight={'bold'} 
        fontSize={12}
        sx={{
          textDecoration: 'underline',
        }}
      >
        {label === 'はい' ? '含めれた' : '含めれていない'}
      </Typography>
      金額を入力してください

    </Box>
  );
};