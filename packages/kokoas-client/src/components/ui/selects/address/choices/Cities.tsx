import { Box, Button, Divider, Grid, Tooltip } from '@mui/material';
import { useAddressCities } from 'kokoas-client/src/hooksQuery';
import { useCallback, useMemo, useRef } from 'react';
import { heartRailsGrouper } from '../common/heartRailsGrouper';
import { KanaNavigation } from '../common/KanaNavigation';
import { locationSorter } from '../common/sorter';

export const Cities = ({
  prefecture,
  handleClick,
  selectedCity,
} : {
  prefecture: string,
  selectedCity: string,
  handleClick: (city: string) => void
}) => {
  const kanaRows = useRef<Array<HTMLElement | null>>([]);
  const { data: sortedCities } = useAddressCities(
    prefecture,
    {
      select: useCallback((d) => {
        const groupedCities = d.reduce((accu, curr) => heartRailsGrouper(accu, curr, 'city_kana'), {} as  { [char: string]: Record<string, string>[] } );
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

                const selected = selectedCity === _city;

                return (
                  <Grid key={city_kana} item xs={3}>
                    <Tooltip title={city_kana}>
                      <Button
                        fullWidth
                        ref={(el) => {
                          if (selected && el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
                          }
                        }}
                        variant={selected ? 'contained' : 'outlined'}
                        color={selected ? 'primary' : 'secondary'}
                        onClick={() => handleClick(_city)}
                      >
                        {_city}
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