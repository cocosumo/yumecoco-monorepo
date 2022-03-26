import { FormikSelect } from '../../../../../components/ui/selects';

interface ConstructionAgentProps {
  number?: number
}

const ConstructionAgent = (props: ConstructionAgentProps) => {
  const { number = 1 } = props;
  const tempAgents = [
    { label: 'Aさん' },
  ];

  const helperText = number > 1 ? '※工事担当者が2名いる場合選択してください。' : undefined;

  return (
    <FormikSelect
    name={`constnAgent${number}`}
    label={`工事担当者${number}`}
    options={tempAgents}
    helperText={helperText}
    />
  );
};

export default ConstructionAgent;