import { softDelCustGroupById } from './softDelCustGroupById';

describe('softDelCustGroupById', () => {
  // https://rdmuhwtt6gx7.cybozu.com/k/176/#/custgroup/edit?custGroupId=4f4d494d-dc04-4336-867a-3e03910dc97b
  const custGroupId = '4f4d494d-dc04-4336-867a-3e03910dc97b';

  it('should soft delete custGroupId', async () => {
    const result = await softDelCustGroupById(custGroupId);

    console.log(result);

  });
});