import { Checkbox, FormControlLabel, Tooltip } from '@mui/material';
import { useAndpadPaymentsBySystemId, useSaveProject } from 'kokoas-client/src/hooksQuery';
import { ChangeEvent, useMemo, useState } from 'react';
import { IProjects } from 'types';

export const UpdateLastBillingDate = ({
  systemId,
  projId,
  projRec,
}:{
  projId: string,
  systemId: number,
  projRec: IProjects
}) => {
  const {
    lastBillingDate: lastBillingDateFromProj,
  } = projRec || {};
  const [checked, setChecked] = useState(!!lastBillingDateFromProj.value);
  const { data } = useAndpadPaymentsBySystemId(systemId);
  
  const { mutate } = useSaveProject();

  const lastBillingDateFromPayments = useMemo(() => {
    // find the last billing date
    return data?.reduce((acc, curr) => {
      const {
        billingDate,
      } = curr;
      if (billingDate) {
        const {
          value,
        } = billingDate;
        if (value > acc) {
          return value;
        }
      }
      return acc;
    },
    '');


  }, [
    data,
  ]);

  const handleCheck = (_: ChangeEvent<HTMLInputElement>, newChecked: boolean) => {
    setChecked(newChecked);
    console.log('lastBillingDate', lastBillingDateFromPayments);
    if (lastBillingDateFromPayments) {
      mutate({
        projId,
        record: {
          lastBillingDate: { value: newChecked ? lastBillingDateFromPayments : '' },
        },
      });
    }

  };

  const tooltipTText = useMemo(() => {
    if (!data?.length ) {
      return '入金情報がありません。';
    } 

    if (!lastBillingDateFromPayments) {
      return '最終請求日がありません。';
    }

    if (checked) {
      return 'チェックを外したら、最終請求が未設定になります。';
    } else {
      return 'チェックを入れたら、最終請求日が設定されます。';
    }
  }, [
    data,
    checked,
    lastBillingDateFromPayments,
  ]);

  return (
    <Tooltip title={tooltipTText}>

  
      <FormControlLabel 
        disabled={!data?.length || !lastBillingDateFromPayments}
        control={(
          <Checkbox
            onChange={handleCheck} 
            checked={checked}
          />
          )} 
        label="最終請求日"
      />
    </Tooltip>
  );
};