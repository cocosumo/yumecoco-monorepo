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
    'ここすも営業': { isNotify: false, ids: [] },
    'ここすも工事': { isNotify: false, ids: [] },
    'ゆめてつAG': { isNotify: false, ids: [] },
  },
};

export default initialMemoState;