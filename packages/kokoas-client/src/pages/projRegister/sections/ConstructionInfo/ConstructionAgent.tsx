
import { Territory } from 'types';
import { FormikSelect } from '../../../../components/ui/selects';
import { useEmployeeOptions } from '../../../../hooksQuery/useEmployeeOptions';
import { getFieldName } from '../../form';

interface ConstructionAgentProps {
  number?: number
  storeId: string,
  territory?:  Territory,
  disabled: boolean
}

export const ConstructionAgent = (props: ConstructionAgentProps) => {
  const { storeId, territory, disabled = false } = props;
  const agents = useEmployeeOptions({
    agentType: 'cocoConst',
    storeId,
    territory,
    secondaryLabel: 'territory',
  });

  const { number = 1 } = props;

  const helperText = number > 1 ? '※工事担当者が2名いる場合選択してください。' : undefined;

  return (
    <FormikSelect
      name={getFieldName(`cocoConst${number.toString() as '1' | '2'}`)}
      label={`工事担当者${number}`}
      options={agents}
      helperText={helperText}
      required={number === 1}
      disabled={disabled || !agents}
    />
  );
};