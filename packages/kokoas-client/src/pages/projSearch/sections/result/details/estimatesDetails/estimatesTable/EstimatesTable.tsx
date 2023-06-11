import { EstTableContainer } from './EstTableContainer';
import { EstTableBody, EstTableBodyProps } from './EstTableBody';
import { EstSummary } from './EstSummary';

export const EstimatesTable = (props: EstTableBodyProps) => {
  return (
    <EstTableContainer
      body={<EstTableBody {...props} />}
      summary={<EstSummary />}
    />
  );
};