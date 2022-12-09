import {  Button, Grid } from '@mui/material';
import { PageSubTitle } from '../../../../../components/ui/labels';
import { SelectGender } from './SelectGender';
import { MemoizedSelectBirthdate } from './SelectBirthdate';
import { FieldArray, ArrayHelpers, useFormikContext } from 'formik';
import {  CustomerInstance, getCustFieldName, initialCustomerValue, KeyOfForm, TypeOfForm } from '../../form';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Address } from './Address';
import { nativeMath, string as randomStr } from 'random-js';
import { NameInput } from './NameInput';
import { grey, yellow } from '@mui/material/colors';




interface CustomerProps extends ArrayHelpers {
  customers: TypeOfForm['customers']
  namePrefix: string,
  index: number,
}

const maxCust = 3;


const Customer =  (props: CustomerProps) => {
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


    </Grid>

  );
};

export const Customers = () => {
  const { values: { customers } } = useFormikContext<TypeOfForm>();
  const arrayFieldName: KeyOfForm = 'customers';
  const isMaxCust = maxCust === customers.length;

  return (
    <Grid container
      item
      xs={12}
      spacing={2}
    >
      <FieldArray
        name={arrayFieldName}
        render={(arrHelpers) => {
          return (
            <Grid
              item
              xs={12}
              key={arrayFieldName}
            >
              {customers.map((c, idx) => {
                return (
                  <Customer
                    key={c.key}
                    index={idx}
                    namePrefix={`${arrayFieldName}[${idx}].`}
                    customers={customers}
                    {...arrHelpers}

                  />
                );
              },
              )}

              {!isMaxCust &&
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="success"
                  startIcon={<PersonAddIcon />}
                  onClick={() => {
                    arrHelpers.push({
                      ...initialCustomerValue,
                      key: randomStr()(nativeMath, 5),
                      isSameAddress: true,
                    } as CustomerInstance);
                  }}
                  fullWidth
                >
                  契約者を追加する
                </Button>
              </Grid>}

            </Grid>);


        }}
      />
    </Grid>


  );
};