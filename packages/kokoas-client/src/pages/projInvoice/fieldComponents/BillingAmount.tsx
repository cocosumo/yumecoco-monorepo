import { FormikMoneyField } from 'kokoas-client/src/components/ui/textfield';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { getFieldName } from '../form';
import { useContractAmount } from '../hooks/useContractAmount';

export const BillingAmount = ({
  projId,
}: {
  projId: string
}) => {

  const { billingBalance } = useContractAmount(projId);

  const [billingAmount, setBillingAmount] = useState(billingBalance);

  const handleChange = (e: any) => {
    debounce(() => { setBillingAmount(e.target.value); }, 2000);
  };

  useEffect(() => {
    setBillingAmount((prev) => {
      if (!!prev && (prev > billingBalance)) {
        return billingBalance;
      } else {
        return prev;
      }
    });
  }, [billingBalance]);


  return (
    <FormikMoneyField
      label='請求額'
      name={getFieldName('billingAmount')}
      onChange={handleChange}
      value={billingAmount}
    />
  );
};