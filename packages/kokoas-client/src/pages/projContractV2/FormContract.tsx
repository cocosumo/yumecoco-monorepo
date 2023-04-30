import { EmptyBox, FormContainer, PageTitle } from 'kokoas-client/src/components';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import schema, { TypeOfForm } from './schema';
import { Box, Chip, Grid } from '@mui/material';
import { SearchProjects } from 'kokoas-client/src/components/reactHookForm';
import { pages } from '../Router';
import { useResolveParams } from './hooks/useResolveParams';
import { useEffect } from 'react';
import { SelectContracts } from 'kokoas-client/src/components/ui/selects/contracts/SelectContracts';

export const FormContract = () => {

  const {
    newFormVal,
  } = useResolveParams();

  const formReturn = useForm<TypeOfForm>({
    defaultValues: newFormVal,
    resolver: zodResolver(schema),
  });

  const { contractId, projId } = newFormVal;

  const { 
    control, 
    reset,
  } = formReturn;

  useEffect(() => {
    reset({ ...newFormVal });
  }, [reset, newFormVal]);



  return (
    <FormProvider {...formReturn}>
      <FormContainer
        noValidate
      >
        <PageTitle 
          label={`契約${contractId ? '編集' : '作成'}`}
        />
        <Grid item xs={12} md={4} >
          <SearchProjects
            navigateTo={pages.projContractPreviewV2}
            controllerProps={{
              name: 'projId',
              control,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SelectContracts projId={projId} />

        </Grid>
       

      </FormContainer>
    </FormProvider>
  );
};