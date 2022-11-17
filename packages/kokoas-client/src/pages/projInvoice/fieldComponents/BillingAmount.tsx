import { FormikMoneyField } from 'kokoas-client/src/components/ui/textfield';
import { debounce } from 'lodash';
import { useState } from 'react';
import { getFieldName } from '../form';
import { useContractAmount } from '../hooks/useContractAmount';

export const BillingAmount = ({
  projId,
}:{
  projId: string
}) => {
  
  const billingAmountInit = useContractAmount(projId); // 請求済み額を差し引く

  const [billingAmount, setBillingAmount] = useState(billingAmountInit);

  const handleChange = (e: any) => {
    debounce(() => { setBillingAmount(e.target.value); }, 2000);
  };

  return (
    <FormikMoneyField
      label='請求額'
      name={getFieldName('billingAmount')}
      onChange={handleChange}
      value={billingAmount}
    />
  );
};