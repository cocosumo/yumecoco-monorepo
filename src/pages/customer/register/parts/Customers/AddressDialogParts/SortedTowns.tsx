import { Grid, Divider, Button, Stack, Typography } from '@mui/material';
import { GetTownsResponseLocation } from '../../../../../../api/others/address';
import { MutableRefObject } from 'react';
import { KanaNavigation } from './KanaNavigation';

export type SortedTownItems = Array<[string, GetTownsResponseLocation]>;

export const SortedTowns = (props : {
  sortedTowns: SortedTownItems,
  handleChoice: (postal: string, town: string) => void,
  kanaRows : MutableRefObject<(HTMLElement | null)[]>
}) => {

  const { sortedTowns, handleChoice, kanaRows } = props;

  return (<>
    <KanaNavigation
      kanaKeys={sortedTowns.map((([k])=>k))}
      kanaRowsRef={kanaRows}
    />
    {sortedTowns
      .map(([groupKey, values], index) => {
        return (
          <Grid
            key={groupKey}
            ref={(el) =>  kanaRows.current[index] = el}
            container
            item xs={12}
            spacing={2}
          >
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