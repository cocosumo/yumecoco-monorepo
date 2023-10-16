import { Checkbox, FormControlLabel, Tooltip } from '@mui/material';
import { useAndpadPaymentsBySystemId, useSaveProject } from 'kokoas-client/src/hooksQuery';
import { useMemo, useState } from 'react';

export const UpdateLastBillingDate = ({
  systemId,
}:{
  projId: string,
  systemId: number,
}) => {

  const [checked, setChecked] = useState(false);
  const { data } = useAndpadPaymentsBySystemId(systemId);
  //const {} = useSaveProject();

  const handleCheck = () => {
    setChecked(!checked);

  };

  const tooltipTText = useMemo(() => {
    if (!data?.length) {
      return '入金情報がありません。';
    } 

    if (checked) {
      return 'チェックを外したら、最終請求が未設定になります。';
    } else {
      return 'チェックを入れたら、最終請求日が設定されます。';
    }
  }, [
    data,
    checked,
  ]);

  return (
    <Tooltip title={tooltipTText}>

  
      <FormControlLabel 
        disabled={!data?.length}
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