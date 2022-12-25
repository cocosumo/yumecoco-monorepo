import { Divider, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
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

export const FormProjEstimate = () => {
  const { initialForm } = useResolveParam();

  const formReturn = useForm<TypeOfForm>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const { 
    handleSubmit,
    control,
    reset,
  }  = formReturn;


  const onSubmitHandler = (data: TypeOfForm) => {
    console.log('SUBMIT', data);
    
  };

  useEffect(() => {

    reset({ ...initialForm });
  }, [initialForm, reset]);



  return (
    <FormContainer
      onSubmit={
        handleSubmit(
          onSubmitHandler, 
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
      {/* <DevTool control={control} />  */}
    </FormContainer>
  );
};