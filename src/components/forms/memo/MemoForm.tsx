import Stack from '@mui/material/Stack/Stack';
import BasicSelect from '../../ui/selects/BasicSelect';
import TextField from '@mui/material/TextField/TextField';
import LabeledCheckBox from '../../ui/checkboxes/LabeledCheckBox';
import Caption from '../../ui/typohraphies/Caption';
import MemoFormAgentCheckBox from './MemoFormAgentCheckBox';
import {  useState } from 'react';
import { FieldActionType, MemoFormState } from '../../../types/form.memo';
import { ElementTarget } from '../../../types/forms';

const options = [
  { label: '顧客情報' },
  { label: '打ち合わせ' },
  { label: '契約内容' },
  { label: '工事場所情報' },
  { label: '問い合わせ' },
  { label: 'その他' },

];

export interface MemoFormProps {
  formState: MemoFormState,
  dispatch: (action: FieldActionType)=>void
}

const MemoForm : React.FC<MemoFormProps> = (props) => {
  const [isNotify, setIsNotify] = useState(false);
  const { formState, dispatch } = props;
  const { custName, memoType, memoContents } = formState;
  const [contents, setContents] = useState(memoContents.value);

  const handleChange = (e : ElementTarget) => {
    dispatch({ type: 'CHANGE_MEMO_VALUE', payload: e });
  };

  /*  useEffect(()=>{

  } ); */

  return (
    <Stack spacing={2} p={1}>
    <Stack direction="row" justifyContent="end">顧客名：{custName}</Stack>
    <BasicSelect
      name={'memoType'}
      value={memoType.value}
      label={memoType.label}
      placeholder={memoType.placeholder}
      helperText={memoType.hasError ? memoType.helperText : ''}
      hasError={memoType.hasError && (memoType.touched || formState.isSubmitted) }
      options={options} onChange={handleChange} isRequired={memoType.isRequired}
    />

    <TextField
      name="memoContents"
      label="メモ"
      fullWidth
      variant="outlined"
      multiline
      onBlur={handleChange}
      onChange={(e)=>setContents(e.target.value)}
      value={contents}
      helperText={memoContents.hasError ? memoContents.helperText : ''}
      error={memoContents.hasError && (memoContents.touched || formState.isSubmitted)}
      required={memoContents.isRequired}
    />
    <Stack direction="row" justifyContent="space-between">

      <LabeledCheckBox label="担当者に通知する" checked={isNotify} setCheckedHandler={()=>setIsNotify(prev=> !prev)} />
      <Stack>
        <Caption text="作成日時：2022.1.28T12:10" />
        <Caption text="作成者：健太郎" />
      </Stack>
    </Stack>
    {isNotify && <MemoFormAgentCheckBox />}
  </Stack>
  );
};

export default MemoForm;