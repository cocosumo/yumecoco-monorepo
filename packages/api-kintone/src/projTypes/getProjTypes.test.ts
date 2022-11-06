import { getProjTypes } from './getProjTypes';

describe('Get Project Types', () => {
  it('should retrieve all project types', async () => {
    const result = await getProjTypes();
    console.log(result);

    expect(result)
      .toEqual(expect.arrayContaining([
        expect.objectContaining({
          $id: expect.objectContaining({ value: expect.any(String) }),
        }),
      ]));
  });
});