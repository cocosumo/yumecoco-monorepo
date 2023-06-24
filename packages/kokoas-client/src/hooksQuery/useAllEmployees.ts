import { useEmployees } from './useEmployees';


/**
 * Convenience hook to wrap useEmployees than returns all employees
 * including retired ones.
 */
export const useAllEmployees = () => {
  return useEmployees({
    isActiveOnly: false,
  });
};