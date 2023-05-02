import { Box, Button, Grid } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';
import { LogRow } from './LogRow';
import { PageSubTitle } from 'kokoas-client/src/components';
import { useState } from 'react';

export const LogDisplay = () => {
  const { values: {
    andpadDetails,
    logs,
  } } = useFormikContext<TypeOfForm>();
  
  // デフォールトは直近の３件のみ表示

  const [isAllLogs, setIsAllLogs] = useState(false);   

  const displayedLogs = isAllLogs ? logs : logs.slice(0, 3) || [];

  const isRegistered = !!andpadDetails;
  

  return (
    <>
      <PageSubTitle label="ログ" />
      <Grid item xs={12}>
        <Box
          sx={{
            bgcolor: blue[50],
            p: 2,
          }}
        >
          {isRegistered && !logs.length && 'Andpadに登録されています。'}
          {isRegistered && !!logs.length && displayedLogs.map((log) => <LogRow key={log.id} {...log} />)}
          {!isRegistered && 'Andpadに登録されていません。'}
          {logs.length > 3 && (
            <Button
              onClick={() => setIsAllLogs(!isAllLogs)}
            >
              {`[${logs.length}] ${isAllLogs ? '閉じる' : 'もっと見る'}`}
            </Button>
          )}
        </Box>
      </Grid>
    </>
   
  );
};