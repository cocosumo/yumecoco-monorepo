import {  Button } from '@mui/material';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormikSelectAdvanced } from '../../../../components/ui/selects/FormikSelectAdvanced';
import { generateParams } from '../../../../helpers/url';
import { pages } from '../../../Router';
import { useEstimateRecords } from '../../hooks/useEstimatesRecords';
import { ItemEstimate } from './ItemEstimate';

export const ProjEstimatesField = ({
  projId,
  projEstimateId,
  name = 'projEstimateId',
}: {
  projId: string,
  projEstimateId: string,
  name?: string
}) => {

  const {
    projEstimateRecords,
  } = useEstimateRecords(projId);


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
        onClick={() => navigate(`${pages.projEstimate}?${generateParams({ projId, projEstimateId })}`)}
        variant="text" color={'inherit'}
        fullWidth disableRipple
      >
        見積作成
      </Button>
    ),
  }),
  /** navigateは依存配列として不安定 */
  [projId]);

  const actualOptions: OptionNode[] = projEstimateRecords.map<OptionNode>((rec)=>{
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

  return (

    <FormikSelectAdvanced
      disabled={!projId || !projEstimateRecords.length}
      label='見積もりリスト'
      name={name}
      selectedValue={projEstimateId}
      options={[emptyOption, ...actualOptions, registerNewOption  ]}
    />
   
  );
};