import { MemoFormState } from './../../../../../types/form.memo';

const testData : MemoFormState = {
  groupId: '131',
  isSubmitted: false,
  memoType: { label: '登録内容', value: 'test', touched: false, hasError: false, helperText: '', isRequired: true },
  memoContents: { label: 'メモ', value: 'test', touched: false, hasError: false, helperText: '', isRequired: true },
  submitState: 'EDITTING',
  isNotify: true,
  hasError: false,
  notifyTo: {
    'ここすも営業': { isNotify: false, ids: ['44', '45'] },
    'ここすも工事': { isNotify: false, ids: ['44', ''] },
    'ゆめてつAG': { isNotify: false, ids: [] },
  },
};

export default testData;