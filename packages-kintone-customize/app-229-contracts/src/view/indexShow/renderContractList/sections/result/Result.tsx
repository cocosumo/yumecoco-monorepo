import { Stack } from '@mui/material';
import { Summary } from './Summary/Summary';
import style from './Result.module.css';
import { ContactsV2 } from './contracts/ContactsV2';
import { Title } from './Title';

export const Result = () => {
  
  return (
    <Stack
      spacing={2}
      p={1}
      /* component={Paper} */
      className={style.print}
      id='printNode'
      width={'fit-content'}
      justifyContent={'space-between'}
      bgcolor={'#fff'}
    >
      <Title />
      <ContactsV2 />
      <Summary />
    </Stack>
  );
};