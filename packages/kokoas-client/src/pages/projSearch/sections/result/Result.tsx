import { useSearchResult } from '../../hooks/useSearchResult';
import { ResultCount } from './ResultCount';
import { ResultTable } from './ResultTable';

export const Result = () => {

  const { data } = useSearchResult();
  return (
    <>
      <ResultCount count={data?.length ?? 0} />
      <ResultTable data={data} />
    
    </>
  );
};