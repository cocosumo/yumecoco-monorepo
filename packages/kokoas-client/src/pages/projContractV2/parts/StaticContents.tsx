import { Box, Button, LinearProgress, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Info } from './Info';

export const StaticContents = ({
  data,
  buttonLabel,
  isLoading,
}: {
  data: Array<{
    label: string,
    value: string,
  }>
  buttonLabel: string,
  isLoading?: boolean,
}) => {
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
          <Stack maxWidth={600} spacing={2}>
            {data.map(({ label, value }) => (
              <Info key={label} label={label} value={value} />
            ))}
          </Stack>
          <Button
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