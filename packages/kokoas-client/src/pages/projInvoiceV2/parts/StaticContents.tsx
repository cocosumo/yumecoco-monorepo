import { Box, Button, LinearProgress, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../Router';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { useFormContext } from 'react-hook-form';
import { ReactNode } from 'react';
import { Info } from './Info';
import { TForm } from '../schema';

export const StaticContents = ({
  data,
  buttonLabel,
  isLoading,
  pageUrl,
}: {
  data: Array<{
    label: string,
    value: ReactNode,
  }>
  buttonLabel: string,
  isLoading?: boolean,
  pageUrl: typeof pages[keyof typeof pages],
}) => {
  const {
    getValues,
  } = useFormContext<TForm>();

  const navigate = useNavigate();


  return (
    <Box
      bgcolor='white'
      p={2}
      border={1}
      borderColor={grey[300]}
    >
      {isLoading && (<LinearProgress />)}
      {!isLoading && (
        <>
          <Stack spacing={1}>
            {data.map(({ label, value }) => (
              <Info key={label} label={label} value={value} />
            ))}
          </Stack>
          <Button
            onClick={() => {
              const [
                projId,
                custGroupId,
              ] = getValues([
                'projId',
                'custGroupId',
              ]) as [string, string];
              navigate(`${pageUrl}?${generateParams({
                projId,
                custGroupId,
              })}`);
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
