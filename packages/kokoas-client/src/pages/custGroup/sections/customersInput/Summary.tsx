import { Stack, Typography } from '@mui/material';
import { useFormState } from 'react-hook-form';
import { useTypedFormContext, useTypedWatch } from '../../hooks/useTypedHooks';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const Summary = ({
  index,
}:{
  index: number,
}) => {

  const label = index === 0 ? '代表者' : `顧客${index + 1}`;
  const { control } = useTypedFormContext();
  const {
    errors: {
      customers: {
        [index]: errors,
      } = {},
    },
  } = useFormState({
    name: `customers.${index}`,
    control,
  });

  const [
    custName,
  ] = useTypedWatch({
    name: [
      `customers.${index}.custName`,
    ],
    control,
  }) as string[];
  
  const hasErrors = Boolean(errors);

  return (
    <Stack
      direction={'row'}
      width={'100%'}
      alignContent={'center'}
    >
      
      <Typography 
        fontWeight={'bold'}
        color={hasErrors ? 'error.light' : 'text.secondary'}
        fontSize={18}
        sx={{ width: 100 }}
        component={'span'}
      >
        {hasErrors && (
        <ErrorOutlineIcon 
          sx={{
            verticalAlign: 'text-bottom',
            mr: 1,
          }}
        />)}
        {label}
      </Typography>
      <Typography 
        sx={{ color: 'text.secondary' }}
        component={'span'}

      >
        {custName}
      </Typography>
              
    </Stack>
  );
};