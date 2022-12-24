import { FormHTMLAttributes } from 'react';
import { MainContainer } from './MainContainer';

export const FormContainer = ({
  children,
  ...formProps
}: FormHTMLAttributes<HTMLFormElement>) => {
  
  return (
    <form {...formProps}>
      <MainContainer>
        {children}
      </MainContainer>
    </form>
  );
};