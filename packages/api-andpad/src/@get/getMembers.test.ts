import { getMembers } from './getMembers';

describe('getMyOrders', () => {
  it('should get my orders', async () => {

    const result = await getMembers({
      systemId: '10776817',
    });

    console.log(JSON.stringify(result, null, 2));

    expect(result).toBeDefined();
  });

});