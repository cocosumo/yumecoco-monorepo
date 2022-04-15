import { getUserCodesByIds } from '../../../../api/kintone/users/GET';
import { EmployeesToNotify, MemoFormState } from '../../../../types/form.memo';



export type ConvertedMemo = Partial<CustomerMemoTypes.SavedData>;

const convertAgs = (notifyTo: EmployeesToNotify ) => {
  return Object.keys(notifyTo)
    .reduce((acc, curr: keyof EmployeesToNotify) : string[] => {

      const removedEmpty = notifyTo[curr].isNotify ? notifyTo[curr].ids.filter(val => val) : [];
      return acc.concat(removedEmpty);
    }, [] as string[]);

};

export const convertMemo = async (state: MemoFormState) : Promise<ConvertedMemo> => {
  const { groupId, memoType, memoContents, notifyTo, isNotify } = state;

  return {
    contents: { value: memoContents.value },
    recordId: { value:  groupId },
    memoType: { value: memoType.value },

    notifyTo: { value: isNotify ? await getUserCodesByIds(convertAgs(notifyTo)) : [] },
  };
};