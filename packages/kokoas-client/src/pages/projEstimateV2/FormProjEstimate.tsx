import { Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { TypeOfForm, initialValues } from './form';
import { validationSchema } from './validationSchema';
import { FormContainer, PageTitle } from 'kokoas-client/src/components';
import { ControlledSearchProjects } from 'kokoas-client/src/components/reactHookForm/SearchProjects';
import { useResolveParam } from './hooks/useResolveParam';
import { useEffect } from 'react';

export const FormProjEstimate = () => {
  const { initialForm } = useResolveParam();

  const { 
    handleSubmit,
    control,
    reset,
    //formState: { errors },
  } = useForm<TypeOfForm>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });


  const onSubmitHandler = (data: TypeOfForm) => {
    console.log('SUBMIT', data);
    
  };

  useEffect(() => {

    reset({ ...initialForm });
  }, [initialForm, reset]);

  //console.log(errors);

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
        <ControlledSearchProjects 
          name='projId' 
          control={control}
        />

      </Grid>
      <Grid
        container
        item
        justifyContent="flex-end"
        xs
      >
        {/* 見積もりの検索 */}
        {/* コピー */}
        {/*  <ButtonMenu /> */}
      </Grid>
    
      <Button type='submit'>
        保存
      </Button>
    </FormContainer>
  );
};