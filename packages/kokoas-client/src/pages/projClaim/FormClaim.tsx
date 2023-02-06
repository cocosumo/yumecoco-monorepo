import { MainContainer, PageTitle } from 'kokoas-client/src/components';
import { FormContainer } from './FormContainer';
import { FormContents } from './FormContents';

export const FormClaim = () => {
  return (

    <MainContainer >
      <PageTitle label='クレームボックス' />
      <FormContainer>
        <FormContents />
      </FormContainer>
    </MainContainer>
  );
};