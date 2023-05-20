import { FormProvider, useForm } from 'react-hook-form';
import { useResolveParams } from './hooks/useResolveParams';
import { zodResolver } from '@hookform/resolvers/zod';
import { TypeOfForm, schema } from './schema';
import { useEffect } from 'react';
import { EmptyBox, MainContainer2, PageTitle2 } from 'kokoas-client/src/components';
import { RecordSelect } from './sections/RecordSelect';
import { FormInput } from './FormInput';

export const FormProject = () => {
  
  const {
    newFormVal,
  } = useResolveParams();

  const formReturn = useForm<TypeOfForm>({
    defaultValues: newFormVal,
    resolver: zodResolver(schema),
  });

  const { 
    reset,
  } = formReturn;

  useEffect(() => {
    reset({ ...newFormVal });
  }, [reset, newFormVal]);
  
  const {
    projId,
    projDataId,
  } = newFormVal;

  return (
    <FormProvider {...formReturn}>
      <form noValidate>
        <MainContainer2 spacing={4} alignItems={'center'}>
          <PageTitle2
            label={`工事情報${projId ? '編集' : '登録'}`}
            secondaryLabel={projDataId}
            backgroundColor='#60498C'
            color='#FFF'
          />

          <RecordSelect />

          {!projId && (
            <EmptyBox>
              顧客を選択してください
            </EmptyBox>
          )}
 

          {!!projId && (<FormInput />)}

        </MainContainer2>
      </form>
    </FormProvider>
  );
};