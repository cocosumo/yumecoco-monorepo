import { ReactNode } from 'react';
import './Message.css';

export const Message = ({
  children,
  isSuccess,
}: {
  children: ReactNode;
  isSuccess?: boolean;
}) => {

  return (
    <div className={`react-message ${isSuccess ? 'success' : 'error'}`}>
      {children}
    </div>
  );
};