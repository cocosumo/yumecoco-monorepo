import { describe, it } from '@jest/globals';
import { getWeekDates } from './getWeekDates';

describe('getWeeks', () => {

  it('should return weeks', () => {
    const result = getWeekDates(2023, 7);
    console.log(result);
  });

});