import { InitialMemoPayload, MemoFormState } from '../../../types/form.memo';

const setInitial = <T extends MemoFormState, U extends InitialMemoPayload>(state: T, payload: U): T => {
  console.log(payload, 'INITIAL');
  const { groupId, custId, custName, cocoAg, yumeAg  } = payload;

  return {
    ...state,
    memoType: { ...state.memoType, value: '', hasError: false },
    memoContents: { ...state.memoContents, value: '', hasError:false  },
    $id: undefined,
    isNotify: false,
    groupId,
    custId,
    custName,
    notifyTo: { ...state.notifyTo,
      ここすも営業: { isNotify: false, ids: cocoAg },
      ゆめてつAG: { isNotify: false, ids: yumeAg },
    },
  };
};

export default setInitial;