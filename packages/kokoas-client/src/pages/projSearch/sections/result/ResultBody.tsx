import { TableBody } from '@mui/material';
import { useSearch } from '../../hooks/useSearch';
import { ResultRow } from './ResultRow';

export const ResultBody = () => {
  const { data } = useSearch();

  console.log('data', data);

  return (
    <TableBody>
      {data
        ?.map((d) => (
          <ResultRow key={d.uuid} {...d} />
        ))}
    </TableBody>
  );
};