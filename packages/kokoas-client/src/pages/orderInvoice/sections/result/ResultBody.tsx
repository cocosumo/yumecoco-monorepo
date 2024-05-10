import { TableBody } from '@mui/material';
import { ResultRow } from './ResultRow';
import { SearchResult } from '../../types';

export const ResultBody = ({
  data,
}: {
  data?: SearchResult[]
}) => {

  return (
    <TableBody>
      {data
        ?.map((d) => (
          <ResultRow key={d.invoiceId} {...d} />
        ))}
    </TableBody>
  );
};
