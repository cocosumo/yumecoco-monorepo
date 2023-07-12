import {  Button, Grid } from '@mui/material';
import { ArrayHelpers, FieldArray, useFormikContext } from 'formik';
import {  CustomerInstance, initialCustomerValue, KeyOfForm, TypeOfForm } from '../../form';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { nativeMath, string as randomStr } from 'random-js';
import { Customer } from './Customer';

const maxCust = 3;

export const Customers = ({
  disabled,
}: {
  disabled: boolean
}) => {
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
        render={(arrHelpers: ArrayHelpers) => {
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
                    disabled={disabled}
                    {...arrHelpers}

                  />
                );
              })}

              {!isMaxCust && !disabled &&
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