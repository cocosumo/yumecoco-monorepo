import { Checkbox, FormControlLabel, Tooltip } from '@mui/material';
import { useSaveProject } from 'kokoas-client/src/hooksQuery';
import { ChangeEvent, useMemo, useState } from 'react';
import { IProjects } from 'types';
import { useLastBillingDate } from './useLastBillingDate';
import { LastBillingLabel } from './LastBillingLabel';

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
  
  const { mutate, isLoading } = useSaveProject();

  const {
    isLoading: isLoadingPayments,
    lastBillingDate: lastBillingDateFromPayments,
    sortedData,
  } = useLastBillingDate(systemId);

  const hasPaymentData = !!sortedData?.length;

  const handleCheck = (_: ChangeEvent<HTMLInputElement>, newChecked: boolean) => {
    setChecked(newChecked);
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
    if (!hasPaymentData ) {
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
    hasPaymentData,
    checked,
    lastBillingDateFromPayments,
  ]);

  return (
    <Tooltip title={tooltipTText}>

  
      <FormControlLabel 
        disabled={!hasPaymentData}
        control={(
          <Checkbox
            onChange={handleCheck} 
            checked={checked}
          />
          )} 
        label={(
          <LastBillingLabel
            isLoading={isLoading || isLoadingPayments}
            lastBillingDate={lastBillingDateFromProj.value || ''}
          />)}
      />
    </Tooltip>
  );
};