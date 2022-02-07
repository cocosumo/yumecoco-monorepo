
import { getEmployees } from './../api/kintone/employees/GET';
import usePromise from './usePromise';

type UseEmployees = (storeId?: number) => { employees: EmployeeTypes.SavedData[], error: object, loading: boolean };

const useEmployees : UseEmployees = () => {

  const { data,  error, loading } = usePromise(getEmployees);
  
  return { 
    employees: (data as EmployeeTypes.SavedData[]),
    error, 
    loading, 
  }; 

};

export default useEmployees;