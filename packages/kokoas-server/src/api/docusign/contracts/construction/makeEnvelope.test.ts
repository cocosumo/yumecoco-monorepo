import { getContractData } from '../../../kintone/getContractData';
import { makeEnvelope } from './makeEnvelope';

/* TODO: Unit test, this test routine is not done */
it('should make envelop', async () => {
  const data = await getContractData({
    projEstimateId: 'dummy01',
    userCode: 'RPA03',
  });

  const result = await makeEnvelope({
    data,
    signMethod: 'electronic',
    status: 'created',
  });

  expect(result).toMatchSnapshot();
}, 30000);
