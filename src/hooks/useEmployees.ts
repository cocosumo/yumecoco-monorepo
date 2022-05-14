
import { getEmployees } from './../api/kintone/employees/GET';
import usePromise from './usePromise';

type UseEmployees = (storeId?: number) => { employees: EmployeeTypes.SavedData[], error: object, loading: boolean };

/**
 * Get all yume employees.
 * Will adjust hook name to getYumeEmployees
 * on next refactoring. Or I'll deprecate this in favor
 * of more customizeable useEmployeeOptions Hook
 * @returns
 */
export const useEmployees : UseEmployees = () => {

  const { data,  error, loading } = usePromise(getEmployees);


  return {
    employees: (data as EmployeeTypes.SavedData[]),
    error,
    loading,
  };

};

export default useEmployees;