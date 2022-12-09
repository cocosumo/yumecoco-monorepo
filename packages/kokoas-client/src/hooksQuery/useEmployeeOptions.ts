import { IEmployees, KEmployees } from 'types';
import { useFilteredEmployees } from './useFilteredEmployees';

export const useEmployeeOptions = (
  params: Parameters<typeof useFilteredEmployees>[0] & {
    secondaryLabel?:  KEmployees
  },
) => {
  const { data } = useFilteredEmployees(params);

  const options: Options | undefined = (data as IEmployees[] | undefined)
    ?.map((rec) => ({
      value: rec.uuid.value,
      label: rec.文字列＿氏名.value,
      ...(params.secondaryLabel ? { secondaryLabel: rec[params.secondaryLabel].value as string } : {}),
    }));

  options?.unshift({ label: '---', value: '' });

  return options;
};