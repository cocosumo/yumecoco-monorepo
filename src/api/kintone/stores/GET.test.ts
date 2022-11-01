import 'regenerator-runtime/runtime';
import { getStoresAsOptions } from './GET';

describe('Stores', ()=>{
  test('were retrieved succesfully and converted to options', async ()=>{
    await getStoresAsOptions().then(result => {
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ value: expect.any(String) }),
        ]),
      );
    });
  });
});