import { ReactNode } from 'react';
import { ResultsTableContainer } from './ResultsTableContainer';
import { ResultsTHead } from './ResultsTHead';

export const ResultsTable = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <ResultsTableContainer>
      <ResultsTHead />
      {children}
    </ResultsTableContainer>
  );
};