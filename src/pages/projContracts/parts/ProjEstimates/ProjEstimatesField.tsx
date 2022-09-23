import {  Button, Box } from '@mui/material';
import { useFormikContext } from 'formik';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormikSelectAdvanced } from '../../../../components/ui/selects/FormikSelectAdvanced';
import { generateParams } from '../../../../helpers/url';
import { pages } from '../../../Router';
import { getFieldName, TypeOfForm } from '../../form';
import { ItemEstimate } from './ItemEstimate';

export const ProjEstimatesField = ({
  estimatesRecord,
}: {
  estimatesRecord: Estimates.main.SavedData[],
}) => {

  const { 
    values: {
      projId, projEstimateId,
    },
    status,
  } = useFormikContext<TypeOfForm>();

  const navigate = useNavigate();


  const emptyOption: OptionNode = useMemo(() =>  ({
    value: '',
    key: 'clear',
    component: '---',
  }), []);

  const registerNewOption: OptionNode = useMemo(() =>  ({
    value: '',
    key: 'new',
    component: (
      <Button
        onClick={() => navigate(`${pages.projEstimate}?${generateParams({ projId })}`)}
        variant="text" color={'inherit'}
        fullWidth disableRipple
      >
        見積作成
      </Button>
    ),
  }),
  /** navigateは依存配列として不安定 */
  [projId]);

  const actualOptions: OptionNode[] = estimatesRecord.map<OptionNode>((rec)=>{
    const { $id } = rec;
    return {
      value: $id.value,
      key: $id.value,
      component: (
        <ItemEstimate 
          estimateRecord={rec}
        />),
    };
  });

  const isWithProjId = !!projId && status === '';
  const isWithProjIdNoEstimates = isWithProjId && !estimatesRecord.length;

  return (

    <FormikSelectAdvanced
      disabled={!isWithProjId || isWithProjIdNoEstimates}
      label='見積もりリスト'
      name={getFieldName('projEstimateId')}
      selectedValue={projEstimateId}
      options={[emptyOption, ...actualOptions, registerNewOption  ]}
    />
   
  );
};