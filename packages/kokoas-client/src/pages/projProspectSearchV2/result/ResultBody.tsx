import { TableBody } from '@mui/material';
import { ISearchResult } from '../types';
import { ResultRow } from './ResultRow';

export const ResultBody = ({
  data,
}: {
  data?: ISearchResult[]
}) => {

  return (
    <TableBody>
      {data
        ?.map((d) => (
          <ResultRow key={d.projId} {...d} />
        ))}
    </TableBody>
  );
};
