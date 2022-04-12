import { Button, Grid, Grow  } from '@mui/material';
import { PageSubTitle } from '../../../../../components/ui/labels';
import {  FormikTextField } from '../../../../../components/ui/textfield';
import { SelectGender } from './SelectGender';
import { SelectBirtdate } from './SelectBirtdate';
import { FieldArray, ArrayHelpers, useFormikContext } from 'formik';
import { CustomerForm, CustomerFormKeys, getCustFieldName, initialCustomerValue } from '../../form';
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



const Customer =  (props: CustomerProps) => {
  //const [animated, setAnimated] = useState(false);
  const {
    namePrefix,
    index,
    push,
    remove,
    customers: { length },
  } = props;
  const maxCust = 3;
  const isLastCustomer = index === length - 1;
  const isMaxCust = maxCust === length;
  const isFirstCustomer = !index;


  return (

    <Grid container item xs={12} spacing={2} justifyContent="space-between" >
      <PageSubTitle label={`契約者${index + 1}`} xs={isFirstCustomer ? 12 : 8}/>
      {
        !isFirstCustomer &&
        <Grid container justifyContent={'flex-end'} item xs={4}>

          <Button variant="outlined" color="error" 
          onClick={()=>{ 
            console.log('removing index', index);
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
      <SelectBirtdate namePrefix={namePrefix} index={index}/>
      <Address namePrefix={namePrefix} index={index}/>

      {
        isLastCustomer && !isMaxCust &&
        
          <Grid item xs={12}>
            <Button variant="outlined" color="success" startIcon={<PersonAddIcon />} onClick={() => push({ ...initialCustomerValue, key: randomStr()(nativeMath, 5) })} fullWidth>
              契約者を追加する
            </Button>
          </Grid>
      }

    </Grid>

  );
};


export const Customers = () => {
  const { values: { customers } } = useFormikContext<CustomerForm>();
  const arrayFieldName: CustomerFormKeys = 'customers';


  return (

    
    <Grid container item xs={12} md={6} spacing={2}>

      <FieldArray
      name={arrayFieldName}
      
      render={(arrHelpers) => (
        <TransitionGroup component={null}>
          {
            customers.map((_, index) => {
              const namePrefix = `${arrayFieldName}[${index}].`;
  
              return (
                index ?
                  <Grow key={_.key}>
                    <Grid container item xs={12}>
                      <Customer index={index} namePrefix={namePrefix} {...arrHelpers} customers={customers}/>
                    </Grid>
                  </Grow>
                  : <Customer key={_.key} index={index} namePrefix={namePrefix} {...arrHelpers} customers={customers}/>
                
              );
            })
          }
        </TransitionGroup>
        
      )}
    />

  

    </Grid>


  );
};