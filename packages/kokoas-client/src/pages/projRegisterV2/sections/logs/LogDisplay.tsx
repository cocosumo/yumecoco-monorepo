import { Box, Button } from '@mui/material';
import { blue } from '@mui/material/colors';
import { TypeOfForm } from '../../form';
import { LogRow } from './LogRow';
import { useState } from 'react';
import { useWatch } from 'react-hook-form';
import Grid from '@mui/material/Unstable_Grid2/';


export const LogDisplay = () => {
  

  const [isAllLogs, setIsAllLogs] = useState(false);   

  const [
    andpadDetails,
    logs,
  ] = useWatch<TypeOfForm>({
    name: [
      'andpadDetails',
      'logs',
    ],
  }) as [
    TypeOfForm['andpadDetails'],
    TypeOfForm['logs'],
  ];

  const displayedLogs = isAllLogs ? logs : logs.slice(0, 3) || [];

  const isRegistered = !!andpadDetails;
  

  return (
    <Grid xs={12}>
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
   
  );
};