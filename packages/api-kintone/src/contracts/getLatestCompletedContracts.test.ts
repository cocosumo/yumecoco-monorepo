import { describe,  it } from '@jest/globals';
import { getLatestCompletedContracts } from './getLatestCompleteContracts';

describe('getLatestCompletedContracts', () => {
  it('should return latest completed contracts', async () => {
    const result = await getLatestCompletedContracts();

    console.log(result);
  });
});