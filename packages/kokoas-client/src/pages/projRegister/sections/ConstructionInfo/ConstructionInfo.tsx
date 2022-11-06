
import { Grid, FormHelperText, Button } from '@mui/material';
import { PageSubTitle } from '../../../../components/ui/labels/';
import { ConstructionAgent } from './ConstructionAgent';
import { FormikLabeledCheckBox } from '../../../../components/ui/checkboxes';
import { useEffect, useState } from 'react';
import { KintoneRecord } from '../../../../api/kintone';
import { FormikSelect } from '../../../../components/ui/selects';
import { FormikTextField } from '../../../../components/ui/textfield';
import { TypeOfForm, getFieldName } from '../../form';
import { useFormikContext } from 'formik';
import { IProjtypes } from 'types';
import { AppIds } from 'config';
import { useProjHasContract } from 'kokoas-client/src/hooksQuery/useProjHasContract';
import { useBackdrop } from 'kokoas-client/src/hooks';
import { ContractDetails } from './ContractDetails';


export const ConstructionInfo = (
  props: {
    storeId: string,
    projTypeId?: string,
    territory?: string,

  },
) => {
  const { storeId, territory, projTypeId } = props;
  const [constructionTypeOptions, setConstructionTypeOptions] = useState<Options>();
  const {
    status,
    setFieldValue,
    values: {
      cocoConst1,
      recordId,
    } } = useFormikContext<TypeOfForm>();

  const isReadOnly = (status as TFormStatus) === 'disabled';

  const { setBackdropState } = useBackdrop();
  const { data, isFetching } = useProjHasContract(recordId);
  
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    setBackdropState({ open: isFetching });
  }, [isFetching, setBackdropState]);


  /*Todo: Refactor this as custom hook */
  useEffect(() => {
    KintoneRecord.getRecords({
      app: AppIds.projTypes,
      query: 'order by レコード番号 asc',
    }).then((res) => {
      const rawConstOpts = res.records as unknown as IProjtypes[];
      setConstructionTypeOptions(
        rawConstOpts
          .map(({ label, $id, projectName }) => ({ label: label.value, value: $id.value, hiddenValue: projectName.value })),
      );
    });
  }, []);


  useEffect(() => {
    const selectedPojType = constructionTypeOptions?.find(item => item.value === projTypeId);
    const projTypeName = selectedPojType?.hiddenValue || selectedPojType?.label;
    setFieldValue(getFieldName('projTypeName'), projTypeName);
  }, [projTypeId]);


  return (
    <>
      <PageSubTitle label='工事情報' />
      <Grid container item spacing={2}
        xs={12}
        md={6}
      >
        <Grid item xs={12} md={8}>
          <FormikSelect name={getFieldName('projTypeId')} label={'工事種別'}
            disabled={isReadOnly || data}
            options={constructionTypeOptions} required
          />
        </Grid>

        <Grid item xs={12} md={4}>
          {data &&
            <>
              <FormHelperText>
                契約済みのため編集できません
              </FormHelperText>
              <Button variant="text" size='small' onClick={handleClickOpen}>
                詳しく見る
              </Button>

              <ContractDetails
                open={open}
                onClose={handleClose}
                projId={recordId ?? ''}
              />
            </>}
        </Grid>
        <Grid item xs={12}>
          <FormikTextField name={getFieldName('projName')} label="工事名称" placeholder="氏名/会社名様邸　工事種別"
            disabled={isReadOnly} required
          />
        </Grid>
      </Grid>

      <Grid container item xs={12}
        spacing={2}
      >
        {
          [1, 2].map((num) => (
            <Grid key={num} item xs={12}
              md={4}
            >
              <ConstructionAgent
                number={num}
                disabled={(!cocoConst1 && num === 2) || isReadOnly}
                storeId={storeId}
                territory={territory}
              />
            </Grid>
          ))
        }

        <Grid item xs={12} md={4}>
          <FormikLabeledCheckBox name={getFieldName('isAgentConfirmed')} label="工事担当者を確定する" helperText='※工事担当者が未定の場合はチェックしないでください。'
            disabled={isReadOnly}
          />

        </Grid>

      </Grid>


    </>
  );

};