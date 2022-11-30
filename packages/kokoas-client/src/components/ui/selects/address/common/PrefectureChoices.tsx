import { Button, Grid, GridProps } from '@mui/material';

export const PrefectureChoices = (
  props: GridProps & {
    prefectures: string[]
  }) => {

  const {
    sx,
    prefectures,
    ...otherBoxProps
  } = props;

  return (
    <Grid
      {...otherBoxProps}
      container
      spacing={0.5}
      sx={{
        position: 'absolute',
        borderRadius: '3px',
        backgroundColor: '#e4bfc7',
        px: '3px',
        pb: '4px',
        pt: '0px',
        width: '150px',
        ...sx,
      }}
    > 
      {prefectures.map(p => (
        <Grid item xs={6} key={p}>
          <Button 
            variant="contained" 
            color={'secondary'}
            size={'small'}
            sx={{ px: 0.5 }}
          >
            {p.replace('県', '')}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};