import { MemoFormState } from '../../../types/form.memo';

const setEdit = <T extends MemoFormState, U extends CustomerMemoTypes.SavedData>(state: T, payload: U): T => {

  const {
    recordId,
    memoType,
    contents,
    createdBy,

    $id,
  } = payload;

  return { ...state,
    $id: $id.value,
    groupId: recordId.value,
    createdBy: createdBy.value.name,
    memoType: { ...state.memoType, value: memoType.value },
    memoContents: { ...state.memoContents, value: contents.value },
    isNotify: false,
  };
};

export default setEdit;