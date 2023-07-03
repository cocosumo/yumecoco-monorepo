import { generateParams } from './url';
import { describe, it, expect } from '@jest/globals';

describe('url', ()=>{
  it('should return urlparam', ()=>{
    const result = generateParams({
      projId: 'hello',
      projEstimateId: undefined,
    });
    console.log(result);

    expect(result).toMatchSnapshot();
  });
});