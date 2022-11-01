import { Grid, Button } from '@mui/material';
import { AddressDetails } from '../AddressDialog';


export const SimpleChoices = (props: {
  name: keyof AddressDetails,
  choices: string[]
  handleClick : (name: keyof AddressDetails, value: string, postal?: string) => void
}) => {

  const { choices, handleClick, name } = props;
  return (
    <>
      {
      choices?.map(
        item => (
          <Grid key={item} item xs={'auto'}>
            <Button
              key={item}
              size={'large'}
              variant={'outlined'}
              onClick={()=>{
                handleClick(name, item);
              }}
            >
              {item}
            </Button>
          </Grid>
        ),
      )
    }
    </>
  );
};