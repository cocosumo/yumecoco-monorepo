import { MemoFormState, FieldActionType } from '../../types/form.memo';
import changeMemoValue from './actions/changeMemoValue';
import setInitial from './actions/setInitial';
import submitMemo from './actions/submitMemo';


const memoReducer = (state: MemoFormState, action: FieldActionType): MemoFormState => {

  console.log(state, action, 'ACTION');
  switch (action.type) {
    case 'CHANGE_MEMO_VALUE':
      return changeMemoValue(state, action.payload);

    case 'SET_INITIAL':
      return setInitial(state, action.payload);

    case 'CHANGE_SUBMITSTATE':
      return submitMemo(state, action.payload);

    default:
      throw new Error('わざとエラーです。Lenz! Fix this! lenzras@gmail.com. Unhandled action ' + action);
  }

};

export default memoReducer;