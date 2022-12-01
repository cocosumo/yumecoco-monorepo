import { Button, Grid, GridProps } from '@mui/material';

export const PrefectureChoices = (
  props: GridProps & {
    prefectures: string[]
    selected: string,
    handleClick : (pref: string) => void
  }) => {

  const {
    sx,
    prefectures,
    width = '150px',
    handleClick,
    selected,
    ...otherBoxProps
  } = props;

  return (
    <Grid
      {...otherBoxProps}
      container
      spacing={0.5}
      width={width}
      sx={{
        position: 'absolute',
        borderRadius: '3px',
        backgroundColor: '#e4bfc7',
        px: '3px',
        pb: '4px',
        pt: '0px',
        ...sx,
      }}
    >
      {prefectures.map(pref => (
        <Grid item xs={6} key={pref}>

          <Button
            variant="contained"
            color={selected === pref ?  'primary' : 'secondary'}
            size={'small'}
            sx={{ px: 0.5 }}
            onClick={() => handleClick(pref)}
          >
            {pref.replace('県', '')}
          </Button>

        </Grid>
      ))}
    </Grid>
  );
};