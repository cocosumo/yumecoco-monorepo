
import { Box, FormControl, Stack, FormHelperText } from '@mui/material/';
import LabeledCheckBox from '../../ui/checkboxes/LabeledCheckBox';
import { EmployeesToNotify, FieldActionType, MemoFormState } from '../../../types/form.memo';

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
  /*   const [agents, setAgents] = useState<AgentsCheckValues>({
    'ここすも営業': true,
    'ここすも工事': true,
    'ゆめてつAG': true,
  }); */

  const handleCheckAgent = (key: keyof EmployeesToNotify) => {
    dispatch({ type: 'CHANGE_CHECKED_AGENT', payload: { key } });
  };

  return (
      <FormControl>
        <FormHelperText>{'<通知する担当者を選択してください>'}</FormHelperText>
        <Box pl={2} borderRadius={2} border="1px solid #d4d7d7">
          <Stack direction="row" justifyContent="space-around">
            {Object.entries(notifyTo).map(([key, value]) => {

              return (
                <LabeledCheckBox
                  key={key}
                  label={key}
                  checked={value}
                  setCheckedHandler={()=>handleCheckAgent(key as keyof EmployeesToNotify)}
                />);
            })}

          </Stack>
        </Box>
      </FormControl>
  );

};

export default MemoFormAgentCheckBox;