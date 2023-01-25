import { RecordKey } from './config';
import { getEstimates } from './getEstimates';

export const getContracts = (
  params?: Parameters<typeof getEstimates>[0],
) => {

  const envelopeStatusField: RecordKey =  'envStatus';

  const {
    query,
    ...others
  } = params || {};

  const newQuery = [
    `${envelopeStatusField} != ""`,
    query,
  ]
    .filter(Boolean)
    .map(q => `(${q})`)
    .join(' and ');

  return getEstimates({
    query: newQuery,
    ...others,
  });
};