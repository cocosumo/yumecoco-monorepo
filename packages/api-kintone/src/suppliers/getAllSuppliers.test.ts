import { describe, expect } from '@jest/globals';
import { getAllSuppliers } from './getAllSuppliers';

describe('get all suppliers', () => { 

  test('should get all suppliers', async () => { 
    
    const result = await getAllSuppliers();

    console.log(result);

    expect(result).toEqual(
      expect.arrayContaining(
        [
          expect.objectContaining({
            $id: {
              type: expect.any(String),
              value: expect.any(String),
            },
          }),
        ],
      ),
    );
  });
});