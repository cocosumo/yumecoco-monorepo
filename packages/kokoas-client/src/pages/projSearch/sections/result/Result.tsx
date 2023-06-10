import { useSearch } from '../../hooks/useSearch';
import { ResultCount } from './ResultCount';
import { ResultTable } from './ResultTable';

export const Result = () => {

  const { data } = useSearch();
  return (
    <>
      <ResultCount count={data?.length ?? 0} />
      <ResultTable data={data} />
    
    </>
  );
};