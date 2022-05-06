import { Grid, Divider, Button, Stack, Typography } from '@mui/material';
import { GetTownsResponseLocation } from '../../../../../../api/others/address';

export const SortedTowns = (props : {
  groupedTowns: {
    [key: string]: GetTownsResponseLocation
  },
  handleChoice: (postal: string, town: string) => void
}) => {

  const { groupedTowns, handleChoice } = props;

  return (<>
    {Object.entries(groupedTowns)
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
              values.map(({
                postal: _postal,
                town: _town,
              }) => {

                return (
                  <Grid key={_town} item xs={'auto'}>
                    <Button
                      variant={'outlined'}
                      onClick={() =>
                        handleChoice(_postal, _town)
                      }
                    >
                      <Stack>
                        {_town}
                        <Typography variant="caption">
                          〒 {_postal.slice(0, 3) + '-' + _postal.slice(3)}
                        </Typography>
                      </Stack>
                    </Button>
                  </Grid>
                );
              })
            }
          </Grid>

        );
      })}

  </>);
};