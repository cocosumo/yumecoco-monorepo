
import { getEmployees } from './../api/kintone/employees/GET';
import usePromise from './usePromise';

type UseEmployees = (storeId?: number) => { employees: EmployeeTypes.SavedData[], error: object, loading: boolean };

/**
 * @deprecated use ../hooksQuery/useActiveEmployees instead.
 * It has a different signature so be sure to update other underlying logic.
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