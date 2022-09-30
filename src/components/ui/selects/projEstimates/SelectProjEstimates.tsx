import {  Button } from '@mui/material';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormikSelectAdvanced } from '../FormikSelectAdvanced';
import { generateParams } from '../../../../helpers/url';
import { pages } from '../../../../pages/Router';
import { useEstimateRecords } from '../../../../hooks/';
import { ItemEstimate } from './ItemEstimate';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { debounce } from 'lodash';
import { calculateEstimateRecord } from '../../../../api/others/calculateEstimateRecord';

export const SelectProjEstimates = ({
  projId,
  projEstimateId,
  name = 'projEstimateId',
  handleChange,
  disabled = false,
}: {
  projId: string,
  projEstimateId: string,
  name?: string
  disabled?: boolean
  /** Can pass an optional handleChange
   * to capture selected 見積 and projEstimateId to process it.
   */
  handleChange?: (
    selected?: Estimates.main.SavedData,
    projEstimateId?: string,
    calculated?: Awaited<ReturnType<typeof calculateEstimateRecord>>
  ) => void
}) => {

  const {
    projEstimateRecords,
  } = useEstimateRecords(projId);


  const navigate = useNavigate();

  /**
   * 依存配列のために、リファレンスを安定させる。
   */
  const refEstimateRecords = useRef(projEstimateRecords);

  useDeepCompareEffect(() => {
    refEstimateRecords.current = projEstimateRecords;
  }, [refEstimateRecords || {}]);

  /**
   * リファレンス安定しないhandleChangeが渡されても、対応する。
   */
  const refHandleChange = useRef(handleChange);



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
  /**
   * navigateは依存配列として不安定
   * https://github.com/remix-run/react-router/issues/7634
   * */
  [projId]);

  /**
   * 本選択肢
   */
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

  /* 選択された見積レコードと番号をhandleChangeに渡す。 */
  const handleSelectedValue = useCallback(
    debounce(async (selectedValue: string) => {
      const selectedRec = refEstimateRecords
        .current
        .find(({ $id }) => $id.value === selectedValue);

      const calculated = selectedRec ? await calculateEstimateRecord(selectedRec) : Object.create(null);

      console.log(calculated);
      refHandleChange.current?.(
        selectedRec,
        selectedValue,
        calculated,
      );

    }, 500), []);

  useEffect(() =>  {
    if (projEstimateId && projId) {
      handleSelectedValue(projEstimateId);
    }

  }, [projEstimateId, projId, handleSelectedValue]);


  const options = projId ? [emptyOption, ...actualOptions, registerNewOption  ] : [registerNewOption];

  return (

    <FormikSelectAdvanced
      disabled={disabled || !projId || !projEstimateRecords.length}
      label='見積選択'
      name={name}
      onChange={(e)=> handleSelectedValue(e.target.value)}
      selectedValue={projId ? projEstimateId : ''}
      options={options}
      helperText={projId ? '' : '工事を選択してください'}
    />

  );
};