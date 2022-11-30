import { Grid, Button, Stack } from '@mui/material';


export const LocationChoices = (props: {
  choices: string[]
  handleClick : (value: string) => void
}) => {

  const { choices, handleClick } = props;
  return (
    <Stack spacing={2} direction={'row'}>
      {
      choices?.map(
        item => (
          <Grid key={item} item xs={'auto'}>
            <Button
              key={item}
              size={'large'}
              variant={'outlined'}
              onClick={()=> handleClick(item)}
            >
              {item}
            </Button>
          </Grid>
        ),
      )
    }
    </Stack>
  );
};