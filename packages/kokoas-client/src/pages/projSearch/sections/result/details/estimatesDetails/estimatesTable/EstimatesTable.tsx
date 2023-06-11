import { EstTableContainer } from './EstTableContainer';
import { EstTableBody, EstTableBodyProps } from './EstTableBody';

export const EstimatesTable = (props: EstTableBodyProps) => {
  return (
    <EstTableContainer>
      <EstTableBody {...props} />
    </EstTableContainer>
  );
};