import { TabContext } from '@mui/lab';
import { Box } from '@mui/system';
import { ReactNode } from 'react';

export const TabContextContainer = (
  { 
    children,
    tabValue,
  }: {
    children: ReactNode
    tabValue: string
  },
) =>{

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tabValue}>
        {children}
      </TabContext>
    </Box>
  );

};