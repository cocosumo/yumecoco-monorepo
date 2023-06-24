import {  Button, LinearProgress, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';

import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { Info } from './Info';

export const StaticContents = ({
  data,
  buttonLabel = '編集する',
  isLoading,
  editUrl,
  children,
}: {
  data: Array<{
    label: string,
    value: ReactNode,
  }>
  buttonLabel?: string,
  isLoading?: boolean,
  editUrl: string,
  children?: ReactNode
}) => {


  const navigate = useNavigate();

  
  return (
    <Stack 
      bgcolor='white'
      py={2}
      px={4}
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
          <Button
            onClick={() => {
              navigate(editUrl);
            }}
            sx={{
              alignSelf: 'flex-start',
            }}
            variant='outlined'
          >
            {buttonLabel}
          </Button>
        </>
      )}

     
      
    </Stack>
  );
};