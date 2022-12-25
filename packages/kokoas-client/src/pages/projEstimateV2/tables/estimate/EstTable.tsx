import { ReactNode } from 'react';
import { EstTableContainer } from './EstTableContainer';
//import { EstTBody } from './EstTBody';
import { EstTHead } from './EstTHead';

export const EstTable = ({
  tableBody,
}: {
  tableBody: ReactNode 
}) => {
  
  return (
    <>
      <EstTHead />
      <EstTableContainer>
        {tableBody}
      </EstTableContainer>
    </>

  );
};