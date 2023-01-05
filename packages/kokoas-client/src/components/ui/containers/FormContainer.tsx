import { 
  FormHTMLAttributes, 
} from 'react';
import { MainContainer } from './MainContainer';


export const FormContainer = ({
  children,
  ...formProps
}: FormHTMLAttributes<HTMLFormElement>) => {

  return (
    <form {...formProps} onSubmit={(e) => e.preventDefault()}>
      <MainContainer>
        {children}
      </MainContainer>
    </form>
  );
};