import { Divider, Grid } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TypeOfForm } from './form';
import { validationSchema } from './validationSchema';
import { FormContainer, PageTitle } from 'kokoas-client/src/components';
import { SearchProjects } from 'kokoas-client/src/components/reactHookForm/SearchProjects';
import { useResolveParam } from './hooks/useResolveParam';
import { useEffect } from 'react';
import { ButtonMenu } from './fields/ButtonMenu';
import { FormContents } from './FormContents';
//import { DevTool } from '@hookform/devtools';
import { EstimatesInfo } from './staticComponents/EstimatesInfo';
import { useSaveForm } from './hooks/useSaveForm';
import { useSaveHotkey } from './hooks/useSaveHotkey';
import { FormErrors } from './FormErrors';
import { Processing } from './formActions/Processing';
import { ActionButtons } from './formActions/ActionButtons';

export const FormProjEstimate = () => {
  const { initialForm } = useResolveParam();

  const formReturn = useForm<TypeOfForm>({
    defaultValues: initialForm,
    resolver: yupResolver(validationSchema),
  });

  const {
    control,
    reset,
    setFocus,
  }  = formReturn;



  const {
    handleSubmit,
    handleSubmitFinal,
  } = useSaveForm(formReturn);

  /* 保存ショートカット　CTRL+S */
  useSaveHotkey(
    handleSubmit, 
  );

  useEffect(() => {
    
    reset({ ...initialForm });
  }, [initialForm, reset]);

  useEffect(() => {
    console.log('FIRED!', document.activeElement);

  }, [setFocus, isDirty]);


  return (
    <FormProvider {...formReturn}>
      <FormContainer
        noValidate
      >
        <FormErrors />
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

        <FormContents />

        <Processing />
        <ActionButtons 
          handleSubmit={handleSubmit}
          handleSubmitFinal={handleSubmitFinal}
        />
        {/* <DevTool control={control} /> */}

      </FormContainer>

    </FormProvider>
  );
};