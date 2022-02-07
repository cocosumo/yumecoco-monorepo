import { Divider, Stack, Typography } from '@mui/material';
import useCustFormAgents from '../../hooks/useCustFormAgents';
import { InputField } from '../../types/forms';
import BasicSelect from '../ui/selects/BasicSelect';
import { getStoresAsOptions } from '../../api/kintone/stores/GET';
import { useEffect, useState } from 'react';
import CustomerSelect from '../ui/selects/CustomerSelect';

const agentsSample : Options = [
  { value: '1', label: '鮎川義介' },
];

export default function AgentsForm() {
  const { form, dispatch } = useCustFormAgents();
  const [stores, setStores] = useState([{ value: '0', label: '取得中' }]);



  useEffect(()=>{
    getStoresAsOptions().then((resp) => {
      setStores(resp);
    });
  }, []);


  return (

    <Stack spacing={2}>
      <Divider />
      <Typography variant="h5">【担当者情報】</Typography>
      <BasicSelect name={'store'} label={'店舗'} options={stores} isRequired={true} onChange={(e) => dispatch({ type: 'CHANGE', payload: e })} />

      {Object.entries(form.agentForm)
        .map(([fieldName, fieldState]) => {
          const { label, helperText, value, isRequired } : InputField =  fieldState;
          return <CustomerSelect key={fieldName} value={value} name={fieldName} label={label} helperText={helperText} options={agentsSample} isRequired={isRequired} fieldState={fieldState} />;
        })}

    </Stack>

  );
}

