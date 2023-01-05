import { FormHTMLAttributes, KeyboardEvent } from 'react';
import { MainContainer } from './MainContainer';


const checkKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
  if (e.key === 'Enter') e.preventDefault();
};

export const FormContainer = ({
  children,
  ...formProps
}: FormHTMLAttributes<HTMLFormElement>) => {

  return (
    <form {...formProps} onKeyDown={(e) => checkKeyDown(e)}>
      <MainContainer>
        {children}
      </MainContainer>
    </form>
  );
};