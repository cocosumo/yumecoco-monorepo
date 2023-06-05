import { getContractsByProjId } from './getContractsByProjId';

describe('getContractsByProjId', () => {
  it('projIdで契約を取得する', async () => {
    const testProjId = 'adebcd51-aaea-4150-8b21-7373710408e2';
    //https://rdmuhwtt6gx7.cybozu.com/k/176/#/project/edit?projId=adebcd51-aaea-4150-8b21-7373710408e2

    const result = await getContractsByProjId(testProjId);

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].$id).toBeDefined();
    
  });

});