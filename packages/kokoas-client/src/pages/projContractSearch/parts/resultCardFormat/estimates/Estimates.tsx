
import { EstimatesBody } from './EstimatesBody';
import { EstimatesContainer } from './EstimatesContainer';
import { EstimatesHead } from './EstimatesHead';

export const Estimates = () => {
  return (
    <EstimatesContainer>
      <EstimatesHead />
      <EstimatesBody />
    </EstimatesContainer>
  );
};