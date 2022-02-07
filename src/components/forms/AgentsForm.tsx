import { Divider, Stack, Typography } from '@mui/material';
import useCustFormAgents from '../../hooks/useCustFormAgents';
import { InputField } from '../../types/forms';
import BasicSelect from '../ui/selects/BasicSelect';
import CustomerSelect from '../ui/selects/CustomerSelect';


export default function AgentsForm() {
  const { agentForm, dispatch, storeState, stores, groupedEmpOptions } = useCustFormAgents();

  return (

    <Stack spacing={2}>
      <Divider />
      <Typography variant="h5">【担当者情報】</Typography>
      <BasicSelect name={'store'} value={storeState.value} label={storeState.label} options={stores} isRequired={true} onChange={(e) => dispatch({ type: 'CHANGE_STORE', payload: { element: e } })} />

      {Object.entries(agentForm)
        .map(([fieldName, fieldState]) => {
          const { label, helperText, value, isRequired } : InputField =  fieldState;
          const group = fieldName.includes('coco') ? 'coco' : 'yume';
          return <CustomerSelect key={fieldName} value={value} name={fieldName} label={label} helperText={helperText} options={groupedEmpOptions[group]} isRequired={isRequired} fieldState={fieldState} onChange={(e) => dispatch({ type: 'CHANGE_AGENT', payload: { element: e } })} />;
        })}

    </Stack>

  );
}

