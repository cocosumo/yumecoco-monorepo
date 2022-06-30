
import { GetEmployeesParams } from '../../../../api/kintone/employees/GET';
import { FormikSelect } from '../../../../components/ui/selects';
import { useEmployeeOptions } from '../../../../hooks';
import { KeyOfProjForm } from '../../form';

interface ConstructionAgentProps {
  number?: number
  storeId: string,
  territory?:  GetEmployeesParams['territory'],
  disabled: boolean
}

export const ConstructionAgent = (props: ConstructionAgentProps) => {
  const { storeId, territory, disabled = false } = props;
  const agents = useEmployeeOptions({
    type: 'cocoConst',
    storeId,
    territory,
    secondaryLabel: 'territory',
  });

  const { number = 1 } = props;


  const helperText = number > 1 ? '※工事担当者が2名いる場合選択してください。' : undefined;

  return (
    <FormikSelect
      name={`cocoConst${number}` as KeyOfProjForm}
      label={`工事担当者${number}`}
      options={agents}
      helperText={helperText}
      required={number === 1}
      disabled={disabled}
    />
  );
};