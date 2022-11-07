import { useIsFetching } from '@tanstack/react-query';
import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { useEffect, useState } from 'react';
import { getConstRecord } from '../../../api/kintone/projects';
import { useSnackBar } from '../../../hooks';
import { initialValues, TypeOfForm } from '../form';
import { useProjById } from 'kokoas-client/src/hooksQuery';
import { useProjTypeById } from 'kokoas-client/src/hooksQuery/useProjTypeById';

export const useUpdateProjectId = () => {
  const { values, dirty, setValues, setTouched } = useFormikContext<TypeOfForm>();
  const { setSnackState } = useSnackBar();
  const { projId } = values;
  const [isInitial, setIsInitial] = useState(false);
  const isFetching = useIsFetching();

  const { 
    data: projRecord, 
  } = useProjById(projId);
  const { projTypeId } = projRecord || {};

  const {
    data: projTypeRecord,
  } = useProjTypeById(projTypeId?.value || '');


  useEffect(() => {

    if ( projRecord ) {
      setIsInitial(false);

      getConstRecord(projId)
        .then(async ({
          projName,
          projTypeName,
          custNames,
          custGroupId,
        }) => {


          setTouched({});
          setValues((prev) => {


            return produce(prev, draft => {
              draft.custGroupId = custGroupId.value;
              draft.projName = projName.value;
              draft.projTypeName = projTypeName.value;

              draft.customerName = custNames.value;
            });
          });


        })
        .catch((err) => {
          setSnackState({
            open: true,
            severity: 'error',
            message: `レコード取得が失敗しました。管理者にご連絡ください。useUpdateProjectId ${err.message}`,
          });

        });

    } else if (!projId && dirty) {

      setValues((prev) => produce(prev, draft => {
        draft.projId = initialValues.projId;
        draft.projName = initialValues.customerName;
        draft.projTypeName = initialValues.projTypeName;
        draft.projTypeProfit = initialValues.projTypeProfit;
        draft.customerName = initialValues.customerName;
        draft.createdDate = initialValues.createdDate;
        draft.estimateId = initialValues.estimateId;
      }));
    }
    

  }, [projRecord, projId, dirty, setValues,  setSnackState, setTouched]);

  useEffect(() => {
    if (projRecord && projTypeRecord) {
      const {
        profitRate,
        $id,
      } = projTypeRecord;
      setValues(prev => {
        const { estimateId } = prev;
        return {
          ...prev,
          projTypeProfit: !estimateId ? +profitRate.value : initialValues.projTypeProfit,
          projTypeProfitLatest : +profitRate.value,
          projTypeId: $id.value,
        };
      });
    }

  }, [projTypeRecord, projRecord, setValues]);

  return {
    isLoading: isInitial || !!isFetching,
    values,
  };
};