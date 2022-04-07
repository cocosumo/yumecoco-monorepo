
import { FormControl, Stack, FormHelperText } from '@mui/material/';
import { LabeledCheckBox } from '../../ui/checkboxes';
import { EmployeesToNotify, FieldActionType, MemoFormState, NotifyAgent } from '../../../types/form.memo';
import { BorderedContainer } from '../../ui/containers/';

/* interface AgentsCheckValues {
  [key: string] : boolean
} */

interface MemoFormAgentCheckBoxProps {
  formState: MemoFormState,
  dispatch : (action : FieldActionType) => void
}


const MemoFormAgentCheckBox = (props : MemoFormAgentCheckBoxProps) => {

  const { formState, dispatch } = props;

  const notifyTo = formState!.notifyTo;


  const handleCheckAgent = (key: keyof EmployeesToNotify) => {
    dispatch({ type: 'CHANGE_CHECKED_AGENT', payload: { key } });
  };

  return (
    <FormControl>
      <FormHelperText>{'<通知する担当者を選択してください>'}</FormHelperText>
      <BorderedContainer>

        <Stack direction="row" justifyContent="space-around">
          {Object.entries(notifyTo).map(([key, value]) => {

            return (
              <LabeledCheckBox
                  key={key}
                  label={key}
                  checked={(value as NotifyAgent).isNotify}
                  setCheckedHandler={()=>handleCheckAgent(key as keyof EmployeesToNotify)}
                />);
          })}

        </Stack>

      </BorderedContainer>
    </FormControl>
  );

};

export default MemoFormAgentCheckBox;