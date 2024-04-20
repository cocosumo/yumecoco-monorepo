import { InputAdornment, OutlinedInput, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

export const InvoiceAmount = () => {

  return (
    <Stack 
      direction={'row'} 
      spacing={2}
      alignItems={'center'}
    >
      <Typography 
        color={grey[600]} 
        component={'span'} 
        whiteSpace={'nowrap'}
      >
        請求金額
      </Typography>
    
      <OutlinedInput 
        size='small'
        sx={{
          flexGrow: 1,
        }}
        inputProps={{
          style: { 
            textAlign: 'right', 
          },
        }}
        endAdornment={(
          <InputAdornment position="end">
            円
          </InputAdornment>
        )}
        fullWidth
      />
    </Stack>
  );
};