import { ResultsTableContainer } from './ResultsTableContainer';
import { ResultsTBody } from './ResultsTBody';
import { ResultsTHead } from './ResultsTHead';

export const ResultsTableFormat = () => {
  return (
    <ResultsTableContainer>
      <ResultsTHead />
      <ResultsTBody />
    </ResultsTableContainer>
  );
};