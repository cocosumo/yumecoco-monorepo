import { Grid, Divider, Button, Stack } from '@mui/material';
import { MutableRefObject } from 'react';
import { KanaNavigation } from './KanaNavigation';


export type SortedCityItems = Array<[string, {
  city: string;
  city_kana: string;
}[]]>;

export const SortedCities = (props : {
  sortedCities :  SortedCityItems,
  handleChoice: (city: string) => void
  kanaRows : MutableRefObject<(HTMLElement | null)[]>
}) => {
  const { sortedCities, kanaRows, handleChoice } = props;
  //const kanaRows = useRef<Array<HTMLElement | null>>([]);

  return (<>
    <KanaNavigation
      kanaKeys={sortedCities.map(([key]) => key)}
      kanaRowsRef={kanaRows}
    />

    {
      sortedCities
        .map(([groupKey, values], index) => {
          return (
            <Grid
              key={groupKey}
              ref={(el) =>  kanaRows.current[index] = el}
              container
              item
              xs={12}
              spacing={2}
            >
              <Grid item xs={12}>
                <Divider textAlign='left'>
                  {groupKey}
                  {' '}
                </Divider>
              </Grid>
              {
              values.map(({ city_kana, city: _city }) => {

                return (
                  <Grid key={city_kana} item xs={'auto'}>
                    <Button
                      variant={'outlined'}
                      onClick={() =>
                        handleChoice(_city)}
                    >
                      <Stack>
                        {_city}
                      </Stack>
                    </Button>
                  </Grid>
                );
              })
            }

            </Grid>
          );
        })
    }

  </>);
};