import { EstTableContainer } from './EstTableContainer';
import { EstTableBody, EstTableBodyProps } from './EstTableBody';
import { EstSummary } from './EstSummary';
import { CompleteEstimateSummary } from 'api-kintone';

export interface EstTableProps extends EstTableBodyProps {
  summary: CompleteEstimateSummary
}

export const EstimatesTable = (props: EstTableProps) => {
  const {
    summary,
    ...otherProps
  } = props;
  return (
    <EstTableContainer
      body={<EstTableBody {...otherProps} />}
      summary={<EstSummary summary={summary} />}
    />
  );
};