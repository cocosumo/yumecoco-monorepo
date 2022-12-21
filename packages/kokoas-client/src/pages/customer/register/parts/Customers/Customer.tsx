import { Button, Grid } from '@mui/material';
import { grey, yellow } from '@mui/material/colors';
import { ArrayHelpers } from 'formik';
import { PageSubTitle } from 'kokoas-client/src/components';
import { getCustFieldName, TypeOfForm } from '../../form';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { NameInput } from './NameInput';
import { SelectGender } from './SelectGender';
import { MemoizedSelectBirthdate } from './SelectBirthdate';
import { Address } from './Address';
import { Contacts } from './Contacts';


interface CustomerProps extends ArrayHelpers {
  customers: TypeOfForm['customers']
  namePrefix: string,
  index: number,
}

export const Customer =  (props: CustomerProps) => {
  //const [animated, setAnimated] = useState(false);
  const {
    namePrefix,
    index,
    remove,
    customers,

  } = props;

  const { birthYear, birthMonth } = customers[index] ?? { birthYear: '', birthMonth: '' };

  const isFirstCustomer = !index;

  const custNameFN = `${namePrefix}${getCustFieldName('custName')}`;
  const custNameReadingFN = `${namePrefix}${getCustFieldName('custNameReading')}`;

  return (
    <Grid
      container
      item
      xs={12}
      spacing={2}
      mb={2}
      px={2}
      pb={2}
      sx={{
        backgroundColor: (index % 2) ? yellow[50] : grey[50],
      }}
    >
      <PageSubTitle label={`契約者${index + 1}`} xs={isFirstCustomer ? 12 : 8} />
      {
        !isFirstCustomer &&
        <Grid
          container
          justifyContent={'flex-end'}
          item
          xs={4}
        >

          <Button variant="outlined" color="error"
            onClick={()=>{
              remove(index);
            }}
            startIcon={<PersonRemoveIcon />} fullWidth
          >
            削除
          </Button>

        </Grid>
      }

      <NameInput
        custNameFN={custNameFN}
        custNameReadingFN={custNameReadingFN}
      />
      <SelectGender namePrefix={namePrefix} />
      <MemoizedSelectBirthdate namePrefix={namePrefix} birthYear={birthYear} birthMonth={birthMonth} />
      <Address namePrefix={namePrefix} index={index} />
      <Contacts namePrefix={namePrefix} />

    </Grid>

  );
};