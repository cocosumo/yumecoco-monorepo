import { Divider, Stack, Typography } from '@mui/material';
import useCustFormAgents from '../../hooks/useCustFormAgents';
import { ElementTarget,  InputField } from '../../types/forms';

import BasicSelect from '../ui/selects/BasicSelect';
import AgentFormSelect from '../ui/selects/AgentFormSelect';


export default function AgentsForm() {
  const {
    agentForm,
    dispatch,
    storeState,
    stores,
    groupedEmpOptions,
    isWithCocoAgents,
    isSubmitted,
  } = useCustFormAgents();


  const handleChangeStore = (e : ElementTarget) => {

    dispatch({ type: 'CHANGE_STORE', payload: { element: e } });

    /* Reset Agents */
    Object.keys(agentForm).map(fieldName => {
      dispatch({ type: 'CHANGE_AGENT', payload: { element: { target: { name: fieldName, value: '' } } } });
    });
  };

  const storeHelperText = isWithCocoAgents || !!!storeState.value  ? storeState.helperText : 'この店舗にはここすも営業担当者がいません。';
  const isStoreError = (!isWithCocoAgents || storeState.hasError) && (isSubmitted || storeState.touched);

  return (

    <Stack spacing={2}>
      <Divider />
      <Typography variant="h5">【担当者情報】</Typography>

      <BasicSelect name={'store'} value={storeState.value} label={storeState.label} hasError={isStoreError} helperText={storeHelperText} options={stores} isRequired={true} onChange={handleChangeStore} />

      {Object.entries(agentForm)
        .map(([fieldName, fieldState]) => {
          const { label, helperText, value, isRequired, infoText, hasError, touched } : InputField =  fieldState;
          const group = fieldName.includes('coco') ? 'coco' : 'yume';
          let isDisabled = false;

          if (fieldName.includes('2')) isDisabled = !!!(agentForm[`${group}1`].value);

          return <AgentFormSelect key={fieldName} value={value} hasError={hasError && (isSubmitted || touched)} name={fieldName} label={label} helperText={helperText + (infoText || '') } options={groupedEmpOptions[group]} isRequired={isRequired} isDisabled={isDisabled} onChange={(e) => dispatch({ type: 'CHANGE_AGENT', payload: { element: e } })} />;
        })}

    </Stack>

  );
}

