import { getFormFields } from './getFormFields';

describe.skip('getFormFields', () => {
  const testAppId = '210';
  let appDetails: Awaited<ReturnType<typeof getFormFields>>;

  beforeAll(async () => {
    appDetails = await getFormFields({
      app: +testAppId,
    });
    console.log(JSON.stringify(appDetails.properties?.projId, null, 2));
  });
  it('should return form fields', async () => {
    expect(appDetails).toHaveProperty('properties');
  });

});