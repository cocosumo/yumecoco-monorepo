import {  LinearProgress, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';

import { ReactNode } from 'react';
import { Info } from './Info';

export const StaticContents = ({
  data,
  isLoading,
  children,
  actions,
}: {
  data: Array<{
    label: string,
    value: ReactNode,
  }>
  isLoading?: boolean,
  children?: ReactNode
  actions?: ReactNode
}) => {
  
  return (
    <Stack 
      bgcolor='white'
      p={4}
      border={1}
      borderColor={grey[300]}
      borderRadius={1}
      spacing={2}
    >
      {isLoading && ( <LinearProgress  /> )}
      {!isLoading && (
        <>
          <Stack 
            spacing={2}
          >
            {data.map(({ label, value }) => (
              <Info key={label} label={label} value={value || '-'} />
            ))}
          </Stack>
          {children}

          <Stack direction={'row'} spacing={2}>
            {actions}
          </Stack>

        </>
      )}

     
      
    </Stack>
  );
};