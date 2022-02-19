import { MemoFormState } from '../types/form.memo';

const initialMemoState : MemoFormState = {
  groupId: '',
  memoType: { label: '登録内容', value: '', touched: false, hasError: false, helperText: '', isRequired: true },
  memoContents: { label: 'メモ', value: '', touched: false, hasError: false, helperText: '', isRequired: true },
};

export default initialMemoState;