import { Box, Button, LinearProgress, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';

import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { Info } from './Info';

export const StaticContents = ({
  data,
  buttonLabel = '編集する',
  isLoading,
  editUrl,
}: {
  data: Array<{
    label: string,
    value: ReactNode,
  }>
  buttonLabel?: string,
  isLoading?: boolean,
  editUrl: string,
}) => {


  const navigate = useNavigate();

  
  return (
    <Box 
      bgcolor='white'
      p={2}
      border={1}
      borderColor={grey[300]}
    >
      {isLoading && ( <LinearProgress  /> )}
      {!isLoading && (
        <>
          <Stack spacing={2}>
            {data.map(({ label, value }) => (
              <Info key={label} label={label} value={value} />
            ))}
          </Stack>
          <Button
            onClick={() => {
              navigate(editUrl);
            }}
            variant='outlined'
            sx={{ mt: 2 }}
          >
            {buttonLabel}
          </Button>
        </>
      )}
      
    </Box>
  );
};