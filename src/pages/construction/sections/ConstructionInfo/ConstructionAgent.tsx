
import { FormikSelect } from '../../../../components/ui/selects';
import { useEmployeeOptions } from '../../../../hooks';
import { KeyOfConstructionDetails, ConstructionDetailsType } from '../../form';
import { useFormikContext } from 'formik';

interface ConstructionAgentProps {
  number?: number

}

export const ConstructionAgent = (props: ConstructionAgentProps) => {
  const { values: { storeId, territory } } = useFormikContext<ConstructionDetailsType>();
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
    name={`cocoConst${number}` as KeyOfConstructionDetails}
    label={`工事担当者${number}`}
    options={agents}
    helperText={helperText}
    />
  );
};