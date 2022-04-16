import {  Button, Zoom, Grid, Stack } from '@mui/material';
import { PageSubTitle } from '../../../../../components/ui/labels';
import {  FormikTextField } from '../../../../../components/ui/textfield';
import { SelectGender } from './SelectGender';
import { MemoizedSelectBirthdate } from './SelectBirthdate';
import { FieldArray, ArrayHelpers, useFormikContext } from 'formik';
import { CustomerForm, CustomerFormKeys, CustomerInstance, getCustFieldName, initialCustomerValue } from '../../form';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Address } from './Address';
import { TransitionGroup } from 'react-transition-group';

import { nativeMath, string as randomStr } from 'random-js';


interface CustomerProps extends ArrayHelpers{
  customers: CustomerForm['customers']
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



  return (
    <Grid container item xs={12} spacing={2}>

      <PageSubTitle label={`契約者${index + 1}`} xs={isFirstCustomer ? 12 : 8}/>
      {
        !isFirstCustomer &&
        <Grid container justifyContent={'flex-end'} item xs={4}>

          <Button variant="outlined" color="error"
          onClick={()=>{
            remove(index);
          }}
            startIcon={<PersonRemoveIcon />} fullWidth>
            削除
          </Button>

        </Grid>
      }


      <Grid item xs={12}>
        <FormikTextField name={`${namePrefix}${getCustFieldName('custName')}`} label="氏名" placeholder='山田　太郎' required/>
      </Grid>
      <Grid item xs={12}>
        <FormikTextField name={`${namePrefix}${getCustFieldName('custNameReading')}`} label="氏名フリガナ" placeholder='ヤマダ　タロウ' required/>
      </Grid>
      <SelectGender namePrefix={namePrefix}/>
      <MemoizedSelectBirthdate namePrefix={namePrefix} birthYear={birthYear} birthMonth={birthMonth} />
      <Address namePrefix={namePrefix} index={index}/>


    </Grid>

  );
};

export const Customers = () => {
  const { values: { customers } } = useFormikContext<CustomerForm>();
  const arrayFieldName: CustomerFormKeys = 'customers';
  const isMaxCust = maxCust === customers.length;


  return (
    <>

      <Grid item xs={12}>
        <FieldArray
        name={arrayFieldName}
        render={(arrHelpers) => {         

          return (
            <Stack key={arrayFieldName} spacing={2}>
              {/* Render first element without animating */}
              <Customer index={0} namePrefix={`${arrayFieldName}[${0}].`} {...arrHelpers} customers={customers}/>
              
              <TransitionGroup component={null} >
                {
                  customers
                    .filter((_, index)=> index !== 0)
                    .map((_, index) => {                
                      return (
                        <Zoom key={_.key} >
                          <Stack key={_.key} spacing={2} >
                            <Customer key={_.key}  index={index + 1} namePrefix={`${arrayFieldName}[${index + 1}].`} {...arrHelpers} customers={customers}/>
                          </Stack>
                          
                        </Zoom>
                      );
                    })
  
                }

              </TransitionGroup>
       
              <Zoom in={!isMaxCust} style={{ transitionDelay: '500ms' }}>
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
                fullWidth>
                  契約者を追加する
                </Button>

              </Zoom>
            </Stack>);


        }}
      />
      </Grid>

    </>


  );
};