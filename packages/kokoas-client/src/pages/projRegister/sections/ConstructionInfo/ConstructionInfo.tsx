
import { Grid, FormHelperText, Button } from '@mui/material';
import { PageSubTitle } from '../../../../components/ui/labels/';
import { ConstructionAgent } from './ConstructionAgent';
import { FormikLabeledCheckBox } from '../../../../components/ui/checkboxes';
import { useState } from 'react';
import { FormikSelect } from '../../../../components/ui/selects';
import { FormikTextFieldV2 as  FormikTextField } from '../../../../components/ui/textfield';
import { TypeOfForm, getFieldName } from '../../form';
import { useFormikContext } from 'formik';
import { useProjTypes } from 'kokoas-client/src/hooksQuery/';
import { ContractDetails } from './ContractDetails';
import { Territory } from 'types';



export const ConstructionInfo = (
  props: {
    storeId: string,
    projTypeId?: string,
    territory?: Territory,
  },
) => {
  const { storeId, territory } = props;

  const {
    values: {
      cocoConst1,
      projId,
      hasContract,
    },
    setValues,
  } = useFormikContext<TypeOfForm>();

  const { data: projTypeOptions } = useProjTypes<Options>({
    select: (d) => d
      ?.map(({
        label, uuid, projectName,
      }) => ({
        label: label?.value,
        value: uuid?.value,
        hiddenValue: projectName?.value,
      })),
  });


  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <PageSubTitle label='工事情報' />
      <Grid container item spacing={2}
        xs={12}
        md={6}
      >
        <Grid item xs={12} md={8}>
          {projTypeOptions &&
          <FormikSelect name={getFieldName('projTypeId')} label={'工事種別'}
            disabled={hasContract}
            options={projTypeOptions}
            required
            onChange={(_, newTextVal) => {
              setValues((prev) => ({
                ...prev,
                projName: `${prev.custName}様邸　${newTextVal}`,
              }));
            }}
          />}

        </Grid>

        <Grid item xs={12} md={4}>
          {hasContract &&
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
                projId={projId ?? ''}
              />
            </>}
        </Grid>
        <Grid item xs={12}>
          <FormikTextField name={getFieldName('projName')} label="工事名称" placeholder="氏名/会社名様邸　工事種別"
            disabled={hasContract} required
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
                disabled={(!cocoConst1 && num === 2) || hasContract}
                storeId={storeId}
                territory={territory}
              />
            </Grid>
          ))
        }

        <Grid item xs={12} md={4}>
          <FormikLabeledCheckBox name={getFieldName('isAgentConfirmed')} label="工事担当者を確定する" helperText='※工事担当者が未定の場合はチェックしないでください。'
            disabled={hasContract}
          />

        </Grid>

      </Grid>


    </>
  );

};