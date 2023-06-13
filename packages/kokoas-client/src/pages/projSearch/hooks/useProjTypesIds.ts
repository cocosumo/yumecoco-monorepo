import { useProjTypes } from 'kokoas-client/src/hooksQuery';

export const useProjTypesIds = (projTypes: string[]) => {
  return useProjTypes({
    select: (data) => {
      return data?.reduce((acc, curr) => {
        const { uuid, label } = curr;
        
        if (!projTypes.includes(label.value)) return acc;

        acc.push(uuid.value);
        
        return acc;
      }, [] as string[]);
    },
  });

};