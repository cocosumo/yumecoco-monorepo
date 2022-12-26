import { Divider, Grid } from '@mui/material';
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { TypeOfForm, initialValues } from './form';
import { validationSchema } from './validationSchema';
import { FormContainer, PageTitle } from 'kokoas-client/src/components';
import { SearchProjects } from 'kokoas-client/src/components/reactHookForm/SearchProjects';
import { useResolveParam } from './hooks/useResolveParam';
import { useEffect } from 'react';
import { ButtonMenu } from './fields/ButtonMenu';
import { FormContents } from './FormContents';
//import { DevTool } from '@hookform/devtools';
import { EstimatesInfo } from './staticComponents/EstimatesInfo';
import { useSaveEstimate } from 'kokoas-client/src/hooksQuery';
import { convertToKintone } from './api/convertToKintone';
import { useSnackBar } from 'kokoas-client/src/hooks';
import { FormActions } from './formActions';

export const FormProjEstimate = () => {
  const { initialForm } = useResolveParam();
  const { setSnackState } = useSnackBar();
  const { mutateAsync: saveMutation } = useSaveEstimate();

  const formReturn = useForm<TypeOfForm>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const {
    handleSubmit,
    control,
    reset,
  }  = formReturn;


  const onSubmitValid: SubmitHandler<TypeOfForm> = async (data) => {

    const {
      estimateId,
    } = data;
    const record = convertToKintone(data);

    const { id } = await saveMutation({
      recordId: estimateId,
      record,
      relatedData: {
        projDataId: data.projDataId,
      },
    });

    setSnackState({
      open: true,
      severity: 'success',
      message: `保存しました。 番号：${id}`,
    });

  };

  const onSubmitInvalid: SubmitErrorHandler<TypeOfForm> = async (e) => {
    console.log('ERROR', e);
  };

  useEffect(() => {

    reset({ ...initialForm });
  }, [initialForm, reset]);



  return (
    <FormProvider {...formReturn}>
      <FormContainer
        onSubmit={
        handleSubmit(
          onSubmitValid,
          onSubmitInvalid,
        )
      }
        noValidate
      >

        <PageTitle label={'見積もり'} />

        <Grid item xs={10} md={5}>

          {/* 工事情報の検索 */}
          <SearchProjects
            controllerProps={{
              name: 'projId',
              control,
            }}
          />

        </Grid>

        <Grid item xs={12} md>

          {/* 編集中の見積もり情報 */}
          <EstimatesInfo control={control} />
        </Grid>
        <Grid
          container
          item
          justifyContent="flex-end"
          xs
        >
          {/* 見積もりの検索 */}
          {/* コピー */}
          <ButtonMenu
            controllerProps={{
              name: 'projId',
              control,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <FormContents
          {...formReturn}
        />
        <FormActions />
        {/* <DevTool control={control} />  */}
      </FormContainer>
    </FormProvider>
  );
};