import { TableBody } from '@mui/material';
import { useSearch } from '../../hooks/useSearch';
import { ResultRow } from './ResultRow';

export const ResultBody = () => {
  const { data } = useSearch();

  // 仮実装で、残します。Routeが公開になったら、外す必要あり。
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
