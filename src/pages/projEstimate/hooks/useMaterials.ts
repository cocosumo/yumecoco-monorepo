import { usePromise } from '../../../hooks';



/**
 * Get all yume employees.
 * Will adjust hook name to getYumeEmployees
 * on next refactoring. Or I'll deprecate this in favor
 * of more customizeable useEmployeeOptions Hook
 * @returns
 */
export const useMaterials  = () => {

  const { data,  error, loading } = usePromise(getEmployees);


  return {
    employees: (data as EmployeeTypes.SavedData[]),
    error,
    loading,
  };

};