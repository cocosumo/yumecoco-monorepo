import { MemoFormState } from '../types/form.memo';

const initialMemoState : MemoFormState = {
  groupId: '',
  isSubmitted: false,
  memoType: { label: '登録内容', value: '', touched: false, hasError: false, helperText: '', isRequired: true },
  memoContents: { label: 'メモ', value: '', touched: false, hasError: false, helperText: '', isRequired: true },
  submitState: 'EDITTING',
  isNotify: false,
  hasError: false,
  notifyTo: {
    'ここすも営業': false,
    'ここすも工事': false,
    'ゆめてつAG': false,
  },
};

export default initialMemoState;