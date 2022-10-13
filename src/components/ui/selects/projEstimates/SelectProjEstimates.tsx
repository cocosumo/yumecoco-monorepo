import {  Button, FormControl, FormHelperText, InputLabel, LinearProgress, MenuItem, Select } from '@mui/material';
import {  useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateParams } from '../../../../helpers/url';
import { pages } from '../../../../pages/Router';
import { ItemEstimate } from './ItemEstimate';
import { useField } from 'formik';
import { useEstimatesByProjId } from '../../../../hooksQuery/useEstimatesByProjId';

export const SelectProjEstimates = ({
  projId,
  handleChange,
  name = 'projEstimateId',
}: {
  name: string,
  projId: string,
  handleChange?: (projEstimateId?: string) => void
}) => {
  const [field, , helpers] = useField(name);
  const {
    value : selectedProjEstimateId,
  } = field;
  const {
    setValue,
  } = helpers;

  const navigate = useNavigate();
  const {
    data,
    error,
    isFetching,
  } = useEstimatesByProjId(projId);

  const {
    calculated,
    records : projEstimateRecords = [],
  } = data || {};

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
        onClick={() => navigate(`${pages.projEstimate}?${generateParams({ projId, projEstimateId: selectedProjEstimateId })}`)}
        variant="text" color={'inherit'}
        fullWidth disableRipple
      >
        見積作成
      </Button>
    ),
  }),
  /**
   * navigateは依存配列として不安定
   * https://github.com/remix-run/react-router/issues/7634
   * */
  [projId, selectedProjEstimateId]);

  /**
   * 本選択肢
   */
  const actualOptions: OptionNode[] = projEstimateRecords?.map<OptionNode>((rec, idx)=>{
    const { $id } = rec;
    return {
      value: $id.value,
      key: $id.value,
      component: (
        <ItemEstimate
          estimateRecord={rec}
          calculated={calculated?.[idx] ?? Object.create(null)}
        />),
    };
  }) || [];


  const options = projId ? [emptyOption, ...actualOptions, registerNewOption  ] : [registerNewOption];



  return (
    <>
      {isFetching && <LinearProgress />}
      {!isFetching && <FormControl
        fullWidth
        disabled={!projId || !!error || isFetching}
                      >
        <InputLabel>
          見積選択
        </InputLabel>
        <Select
          variant={'outlined'}
          label={'見積選択'}
          value={selectedProjEstimateId || ''}
          onChange={(e)=>{
            setValue(e.target.value);
            handleChange?.(e.target.value);
          }}
        >
          {!isFetching && options?.map((option) => {
            const isSelected = option.value === selectedProjEstimateId;
            return (
              <MenuItem key={option.key} value={option.value} selected={isSelected}>
                {option.component}
              </MenuItem>
            );
          })}

        </Select>
        {!!error && (
        <FormHelperText error={true}>
          {`エラーが発生しました。${error}`}
        </FormHelperText>
        )}

      </FormControl>}
    </>
  );
};