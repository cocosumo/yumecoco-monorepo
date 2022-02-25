import initialMemoState from '../../stores/memo';
import { MemoFormState, FieldActionType } from '../../types/form.memo';
import changeCheckedAgent from './actions/changeCheckedAgent';
import changeMemoValue from './actions/changeMemoValue';
import setEdit from './actions/setEdit';
import setInitial from './actions/setInitial';
import submitMemo from './actions/submitMemo';


const memoReducer = (state: MemoFormState, action: FieldActionType): MemoFormState => {
  console.log(state);

  switch (action.type) {
    case 'CHANGE_MEMO_VALUE':
      return changeMemoValue(state, action.payload);

    case 'CHANGE_CHECKED_AGENT':
      return changeCheckedAgent(state, action.payload);

    case 'CHANGE_ISNOTIFY':
      return { ...state, isNotify: !state.isNotify };

    case 'SET_INITIAL':
      return setInitial(state, action.payload);

    case 'SET_EDIT':
      return setEdit(state, action.payload);

    case 'CHANGE_SUBMITSTATE':
      return submitMemo(state, action.payload);

    case 'RESET':
      return JSON.parse(JSON.stringify(initialMemoState));

    default:
      throw new Error('わざとエラーです。Lenz! Fix this! lenzras@gmail.com. Unhandled action ' + action);
  }

};

export default memoReducer;