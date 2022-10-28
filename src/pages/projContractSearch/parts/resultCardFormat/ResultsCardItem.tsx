import { Estimates } from './estimates/Estimates';
import { ProjInfo } from './projInfo/ProjInfo';
import { ResultsCardItemContainer } from './ResultsCardItemContainer';

/**
 * 工事ごと
 */
export const ResultsCardItem = () => {
  return (
    <ResultsCardItemContainer>
      <ProjInfo />
      <Estimates />
    </ResultsCardItemContainer>
  );
};