import { getFormFields } from './getFormFields';

describe('getFormFields', () => {
  const testAppId = '208';
  let appDetails: Awaited<ReturnType<typeof getFormFields>>;

  beforeAll(async () => {
    appDetails = await getFormFields({
      app: +testAppId,
    });
    //console.log(JSON.stringify(appDetails.properties?.projects?.fields.projId, null, 2));
  });
  it('should return form fields', async () => {
    expect(appDetails).toHaveProperty('properties');
  });

});