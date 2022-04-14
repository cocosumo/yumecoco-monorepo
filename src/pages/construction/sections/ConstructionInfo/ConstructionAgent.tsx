import { useEffect, useState } from 'react';
import { getCocoConst } from '../../../../api/kintone/employees/GET';
import { FormikSelect } from '../../../../components/ui/selects';
import { KeyOfConstructionDetails } from '../../form';

interface ConstructionAgentProps {
  number?: number
}

export const ConstructionAgent = (props: ConstructionAgentProps) => {
  const [agents, setAgents] = useState<Options>([]);
  const { number = 1 } = props;

  useEffect(()=>{
    getCocoConst()
      .then(records => {
        setAgents(
          records.map<Option>(({ $id, 文字列＿氏名: name, mainStore  })=>{
            return { value: $id.value, label: name.value, secondaryLabel: mainStore.value };
          }),
        );
      });
  }, []);

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