import { ResultInfoDisplay } from './results/ResultInfoDisplay';

export const ResultsCount = ({
  resultCount,
}: {
  resultCount: number
}) => {

  
  return (
    <ResultInfoDisplay 
      label='件数'
      value={resultCount}
      unit='件'
    />

  );
};