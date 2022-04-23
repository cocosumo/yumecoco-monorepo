
import { useCallback } from 'react';
import { getSpecifiedEmployees, Params } from '../api/kintone/employees/GET';
import usePromise from './usePromise';

interface EmployeeOptionsParams extends Params {
  secondaryLabel?: keyof EmployeeTypes.SavedData
}

/**
 *
 * @param params
 * @param params.isStoreRequired
 * @returns
 */
export const useEmployeeOptions = (params: EmployeeOptionsParams): Options | undefined => {

  /* useCallBack to avoid inifinite re-render  */
  const  fn = useCallback(() => getSpecifiedEmployees(params), [params.storeId]);
  const { data } = usePromise(fn);

  const options: Options | undefined = (data as EmployeeTypes.SavedData[] | undefined)
    ?.map((rec) => ({
      value: rec.$id.value,
      label: rec.文字列＿氏名.value,
      ...(params.secondaryLabel ? { secondaryLabel: rec[params.secondaryLabel].value as string } : {}),
    }));

  options?.unshift({ label: '---', value: '' });


  return options;

};