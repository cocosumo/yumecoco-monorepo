import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { FormikSelectAdvanced } from '../../../../components/ui/selects/FormikSelectAdvanced';
import { getProjEstimates } from '../../api/getProjEstimates';
import { TypeOfForm, getFieldName } from '../../form';
import { SelectMenu } from './SelectMenu';


export const SelectProjEstimates = () => {
  const { values: { projId } } = useFormikContext<TypeOfForm>();
  const [options, setOptions] = useState<OptionNode[]>([]);

  useEffect(()=>{
    if (projId) {
      getProjEstimates(projId)
        .then((records)=>{
          const newOptions = records.map<OptionNode>((rec)=>{
            const { contractPrice, $id, 作成日時 } = rec;
            return {
              value: $id.value,
              key: $id.value,
              component: <SelectMenu contractPrice={contractPrice.value} dateCreated={作成日時.value} id={$id.value}/>,
            };
          });

          setOptions(newOptions);
        });
    } else {
      setOptions([]);
    }
  }, [projId]);

  return (

    <FormikSelectAdvanced label='見積もりリスト' name={getFieldName('projEstimateId') } options={options}/>
  );
};