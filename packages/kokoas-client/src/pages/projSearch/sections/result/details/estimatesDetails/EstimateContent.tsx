import { Box, Stack } from '@mui/material';
import { EstTableProps, EstimatesTable } from './estimatesTable/EstimatesTable';
import { OtherInfo } from './OtherInfo';
import { EditButton } from '../common/EditButton';
import { pages } from 'kokoas-client/src/pages/Router';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { NewButton } from '../common/NewButton';
import { ContractButton } from '../common/ContractButton';
import { ReactNode } from 'react';
import { ExportButton } from './ExportButton';

export const EstimateContent = (props: Partial<EstTableProps> & {
  projId: string,
  emptyNode?: ReactNode,
}) => {
  const {
    record,
    results,
    summary,
    emptyNode,
  } = props;



  return (
    <>
    

      {record && results && summary && (
        <EstimatesTable 
          record={record}
          results={results}
          summary={summary}
        />
      )}

      {emptyNode}

 
      {record && (
        <OtherInfo record={record}  />
      )}


    </>
  );
};