import { Card, CardContent, CardHeader, CircularProgress, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { dateStrToJA } from 'kokoas-client/src/helpers/utils';
import { useSystemUpdate } from 'kokoas-client/src/hooksQuery';
import { useMemo } from 'react';
import LinkIcon from '@mui/icons-material/Link';
import { getRecordPath } from 'api-kintone';
import { AppIds } from 'config';


export const SystemUpdate = () => {

  const { data, isFetching } = useSystemUpdate();
  const { records } = data || {};

  const { releaseDate, contents, $id } = records?.[0] || {};

  const jaReleaseDate = releaseDate ? dateStrToJA(releaseDate.value, false) : '';


  const groupedContents = useMemo(() => {
    const grouped =  contents?.value.reduce((acc, curr) => {
      const key = curr.value.category.value || '@全体';

      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(curr.value.details.value);
      return acc;
    }, {} as Record<string, string[]>);
    if (grouped) {
      return Object.entries(grouped);
    }
  }, [contents]);

  return (
    <Card sx={{
      backgroundColor: grey[50],
    }}
    >
      <CardHeader
        title={'システム改修のお知らせ'}
        subheader={jaReleaseDate}
        action={$id?.value ?
          <Tooltip title="Kintoneで見る">
            <IconButton onClick={() =>{
              window.open(getRecordPath({
                recordId: $id?.value,
                appId: AppIds.systemUpdate.toString(),
              }), '_blank', 'noopener,noreferrer');
            }}
            >
              <LinkIcon />
            </IconButton>
          </Tooltip>
          : undefined}
        sx={{
          py: 1,
        }}
      />
      <CardContent
        sx={{
          borderTop: 1,
          borderBotton: 1,
          borderColor: grey[100],
          px: 2, pt: 0,
          maxHeight: '100px',
          overflow: 'auto',
          mb: 2,
          '&:last-child': { pb: 2 },
        }}
      >
        {isFetching && <CircularProgress />}
        {!isFetching && groupedContents && (
          groupedContents.map(([category, items]) => {
            return (
              <Stack
                key={category} mt={2}
              >
                <Typography variant={'h6'}>
                  {category}
                </Typography>
                {
                  items.map((i) => {
                    return (
                      <Typography key={i} variant={'caption'} >
                        {i}
                      </Typography>
                    );
                  })
                }
              </Stack>
            );
          })
        )}

      </CardContent>
    </Card>
  );
};