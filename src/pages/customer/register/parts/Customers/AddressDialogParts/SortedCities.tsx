import { Grid, Divider, Button, Stack, Chip } from '@mui/material';
import { MutableRefObject } from 'react';

export type SortedItems = Array<[string, {
  city: string;
  city_kana: string;
}[]]>;

export const SortedCities = (props : {
  sortedCities :  SortedItems,
  handleChoice: (city: string) => void
  kanaRows : MutableRefObject<(HTMLElement | null)[]>
}) => {
  const { sortedCities, kanaRows, handleChoice } = props;
  //const kanaRows = useRef<Array<HTMLElement | null>>([]);

  return (<>

    <Stack direction={'column'} sx={{ position: 'absolute', right: '1rem' }} spacing={1} p={1}>
      {
        sortedCities.map(([groupKey], kanaIdx) => (
          <Chip
            key={groupKey}
            label={`${groupKey}`}
            size='small'
            onClick={()=>{
              kanaRows.current[kanaIdx]?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
            }} />
        ))
      }
    </Stack>

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
                <Divider textAlign='left'>{groupKey} </Divider>
              </Grid>
              {
              values.map(({ city_kana, city: _city }) => {

                return (
                  <Grid key={city_kana} item xs={'auto'}>
                    <Button
                      variant={'outlined'}
                      onClick={() =>
                        handleChoice(_city)
                      }
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