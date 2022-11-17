import { getAllProjects } from './getAllProjects';

describe('get all projects', () => { 

  test('should get all projects', async () => { 
    
    const result = await getAllProjects();

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