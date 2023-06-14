import { EstTableContainer } from './EstTableContainer';
import { EstTableBody, EstTableBodyProps } from './EstTableBody';
import { CompleteEstimateSummary } from 'api-kintone';
import { EstSummary } from './EstSummary';

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
      footer={<EstSummary summary={summary} />}
    />
  );
};