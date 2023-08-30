import { describe, expect, it } from '@jest/globals';
import { createMonths } from './createMonths';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';


describe('createMonths', () => {
  it('should generate 6 months if min and max dates are empty', () => {

    const result = createMonths({
      minPaymentISODate: '',
      maxPaymentISODate: '',
    });
    

    // Expect that the first element of the array is the current year and month
    expect(result[0]).toEqual(format(new Date(), 'yyyyMM'));
    
    // Expect that the length of the array is 6
    expect(result.length).toEqual(6);
  });
      
      

  it('should generate 6 months if min and max dates are equal', () => {
    const rawMinDate = '2023-06-01';
    const rawMaxDate = '2023-06-01';

    const result = createMonths({
      minPaymentISODate: parseISO(rawMinDate).toISOString(), 
      maxPaymentISODate: parseISO(rawMaxDate).toISOString(),
    });
    
    expect(result).toEqual([
      '202306',
      '202305',
      '202304',
      '202303',
      '202302',
      '202301',
    ]);
  });

  it('should generate 6 months even if the difference between min and max dates are less than 6', () => {
    const rawMinDate = '2023-05-01';
    const rawMaxDate = '2023-08-01';


    const result = createMonths({
      minPaymentISODate: parseISO(rawMinDate).toISOString(), 
      maxPaymentISODate: parseISO(rawMaxDate).toISOString(),
    });
    
    expect(result).toEqual([
      '202308',
      '202307',
      '202306',
      '202305',
      '202304',
      '202303',
    ]);
  });

  it('should generate appropiate number of months according to min and max dates', () => {
    const rawMinDate = '2023-01-01';
    const rawMaxDate = '2023-12-01';

    const result = createMonths({
      minPaymentISODate: parseISO(rawMinDate).toISOString(),
      maxPaymentISODate: parseISO(rawMaxDate).toISOString(),
    });

    expect(result).toEqual([
      '202312',
      '202311',
      '202310',
      '202309',
      '202308',
      '202307',
      '202306',
      '202305',
      '202304',
      '202303',
      '202302',
      '202301',
    ]);
  });
});