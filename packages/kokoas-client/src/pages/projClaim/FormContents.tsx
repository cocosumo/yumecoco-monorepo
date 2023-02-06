import { Box, Stack, useTheme } from '@mui/material';
import { SearchProjects } from 'kokoas-client/src/components';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { useNavigate } from 'react-router-dom';

export const FormContents = () => {
  const navigate = useNavigate();
  const { breakpoints: { values: { sm } } } = useTheme();
  return (
    <Stack spacing={2}>
      <Box maxWidth={sm / 2}>
        <SearchProjects
          label='工事情報の検索'
          onChange={(_, opt) => {
            navigate(`?${generateParams({
              projId: opt?.id,
            })}`);
          }}
        />
      </Box>

    </Stack>
  );
};