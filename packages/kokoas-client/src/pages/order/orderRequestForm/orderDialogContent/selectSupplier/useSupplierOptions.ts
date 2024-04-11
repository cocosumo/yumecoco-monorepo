import { useAllSuppliers } from 'kokoas-client/src/hooksQuery';

export const useSupplierOptions = () => {
  return useAllSuppliers({
    queryOptions: {
      select: (data) => {
        if (!data) return [];
        return data.map((supplier) => ({
          label: supplier.supplierName.value,
          id: supplier.managementID.value,
        }));
      },
    },
  });

  
};