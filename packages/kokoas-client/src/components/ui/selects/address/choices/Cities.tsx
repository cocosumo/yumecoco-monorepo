import { Box, Button, Divider, Grid, Stack, Tooltip } from '@mui/material';
import { useCities } from 'kokoas-client/src/hooksQuery';
import { useCallback, useMemo, useRef } from 'react';
import { alphabeticalReducer } from '../common/alphabeticalReducer';
import { KanaNavigation } from '../common/KanaNavigation';
import { locationSorter } from '../common/sorter';

export const Cities = ({
  prefecture,
  handleClick,
} : {
  prefecture: string
  handleClick: (city: string) => void
}) => {
  const kanaRows = useRef<Array<HTMLElement | null>>([]);
  const { data: sortedCities } = useCities(
    prefecture,
    {
      select: useCallback((d) => {
        const groupedCities = d.reduce((accu, curr) => alphabeticalReducer(accu, curr, 'city_kana'), {} as  { [char: string]: Record<string, string>[] } );
        return Object.entries(groupedCities)
          .sort(locationSorter);
      }, []),
    });

  const kanaKeys = useMemo(() => sortedCities?.map(([key]) => key ), [sortedCities]);

  return (
    <Box>
      <KanaNavigation 
        kanaKeys={kanaKeys || []}
        kanaRowsRef={kanaRows}
      />
      {
      sortedCities
        ?.map(([groupKey, values], index) => {
          return (
            <Grid
              key={groupKey}
              ref={(el) =>  kanaRows.current[index] = el}
              container
              item
              xs={12}
              pb={2}
              p={4}
              spacing={2}
            >
              <Grid item xs={12}>
                <Divider textAlign='left'>
                  {groupKey}
                </Divider>
              </Grid>
              {
              values.map(({ city_kana, city: _city }) => {

                return (
                  <Grid key={city_kana} item xs={3}>
                    <Tooltip title={city_kana}>
                      <Button
                        fullWidth
                        variant={'outlined'}
                        onClick={() => handleClick(_city)}
                      >
                        <Stack>
                          {_city}
                        </Stack>
                      </Button>
                    </Tooltip>
                  </Grid>
                );
              })
            }

            </Grid>
          );
        })
    }
    </Box>
  );
};