import { Divider, Stack, Typography } from '@mui/material';
import useCustFormAgents from '../../hooks/useCustFormAgents';
import { InputField } from '../../types/forms';
import BasicSelect from '../ui/selects/BasicSelect';
import { getStoresAsOptions } from '../../api/kintone/stores/GET';
import { useEffect, useState } from 'react';

const agentsSample : Options = [
  { value: '1', label: '鮎川義介' },
];

export default function AgentsForm() {
  const agentForm = useCustFormAgents();
  const [stores, setStores] = useState([{ value: '0', label: '取得中' }]);

  useEffect(()=>{
    getStoresAsOptions().then((resp) => {
      setStores(resp);
    });
  }, []);

  console.log(stores);
  return (

    <Stack spacing={2}>
      <Divider />
      <Typography variant="h5">【担当者情報】</Typography>
      <BasicSelect name={'store'} label={'店舗'} options={stores} isRequired={true} />

      {Object.entries(agentForm.agentForm)
        .map(([fieldName, fieldState]) => {
          const { label, hasError, helperText, value, isRequired } : InputField =  fieldState;
          return <BasicSelect key={fieldName} hasError={hasError} value={value} name={fieldName} label={label} helperText={helperText} options={agentsSample} isRequired={isRequired} />;
        })}

    </Stack>

  );
}

