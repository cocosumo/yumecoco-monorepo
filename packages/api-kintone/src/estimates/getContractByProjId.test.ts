import { getContractByProjId } from './getContractByProjId';

describe('getContractByProjId', () => {
  it('should get the main contract', async () => {
    const result = await getContractByProjId('8aa54bb3-10e7-45fa-adde-df7776082c77');

    console.log(result);
  });
});