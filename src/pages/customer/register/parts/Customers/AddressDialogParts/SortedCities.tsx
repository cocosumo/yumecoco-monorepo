import { Grid, Divider, Button, Stack } from '@mui/material';
import { GetCitiesRespLocation } from '../../../../../../api/others/address';



export const SortedCities = (props : {
  groupedCities: {
    [key: string]: GetCitiesRespLocation
  },
  handleChoice: (city: string) => void
}) => {
  const { groupedCities, handleChoice } = props;

  return (<>
    {
      Object.entries(groupedCities)
        .sort(([a], [b])=>{
          return a.includes('そのた') ? 0 : a.localeCompare(b);
        })
        .map(([groupKey, values]) => {
          return (
            <Grid key={groupKey} container item xs={12} spacing={2}>
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