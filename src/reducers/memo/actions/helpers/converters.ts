import { getUserCodesByIds } from '../../../../api/kintone/users/GET';
import { EmployeesToNotify, MemoFormState } from '../../../../types/form.memo';

/* type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T; */

export type ConvertedMemo = Partial<CustomerMemoTypes.SavedData>;

export const convertMemo = async (state: MemoFormState) : Promise<ConvertedMemo> => {
  const { groupId, memoType, memoContents, notifyTo, custId } = state;

  const Ags = Object.keys(notifyTo)
    .reduce((acc, curr: keyof EmployeesToNotify) : string[] => {
      console.log(curr, notifyTo[curr]);
      const removeEmpty = notifyTo[curr].ids.filter(val => val);
      return acc.concat(removeEmpty);
    }, [] as string[]);

  return {
    contents: { value: memoContents.value },
    groupId: { value:  groupId },
    memoType: { value: memoType.value },
    custId: { value: custId ?? '' },
    notifyTo: { value: await getUserCodesByIds(Ags) },
  };
};