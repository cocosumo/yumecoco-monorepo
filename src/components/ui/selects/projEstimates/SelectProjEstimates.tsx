import {  Button } from '@mui/material';
import { ChangeEvent, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormikSelectAdvanced } from '../FormikSelectAdvanced';
import { generateParams } from '../../../../helpers/url';
import { pages } from '../../../../pages/Router';
import { useEstimateRecords } from '../../../../pages/projContracts/hooks/useEstimatesRecords';
import { ItemEstimate } from './ItemEstimate';

export const SelectProjEstimates = ({
  projId,
  projEstimateId,
  name = 'projEstimateId',
  handleChange,
}: {
  projId: string,
  projEstimateId: string,
  name?: string
  /** Can pass an optional handleChange
   * to capture selected 見積 and projEstimateId and process it.
   */
  handleChange?: ( 
    selected?: Estimates.main.SavedData, 
    projEstimateId?: string) => void
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

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange?.(
      projEstimateRecords
        .find(({ $id }) => $id.value === e.target.value),
      e.target.value,
    );
  };
  

  return (

    <FormikSelectAdvanced
      disabled={!projId || !projEstimateRecords.length}
      label='見積もりリスト'
      name={name}
      onChange={onChange}
      selectedValue={projEstimateId}
      options={[emptyOption, ...actualOptions, registerNewOption  ]}
    />
   
  );
};