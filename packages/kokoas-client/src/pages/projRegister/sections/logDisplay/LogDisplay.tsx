import { Box, Grid } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';
import { LogRow } from './LogRow';

export const LogDisplay = () => {
  const { values: {
    andpadDetails,
    logs,
  } } = useFormikContext<TypeOfForm>();

  const isRegistered = !!andpadDetails;
  

  return (
    <Grid item xs={12}>
      <Box
        sx={{
          bgcolor: blue[50],
          p: 2,
        }}
      >
        {isRegistered && !logs.length && 'Andpadに登録されています。'}
        {isRegistered && !!logs.length && logs.map((log) => <LogRow key={log.id} {...log} />)}
        {!isRegistered && 'Andpadに登録されていません。'}
      </Box>
    </Grid>
  );
};