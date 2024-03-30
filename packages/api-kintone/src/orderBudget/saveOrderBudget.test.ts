import { describe, expect, it } from '@jest/globals';
import { saveOrderBudget } from './saveOrderBudget';
import { getOrderBudgetById } from './getOrderBudgetById';
/** 
 * I added test and findings, about kintone's subtable behavior.
 * Will move this to a different file.
 * 
 * Reference: https://cybozu.dev/ja/kintone/tips/development/customize/table/table-operations-techniques-on-record-update/
 */
describe('saveOrderBudget', () => {

  it('should save order budget with empty items', async () => {
    const result = await saveOrderBudget({
      recordId: 'test',
      record:{
        uuid: { value: 'test' },
        items: { type: 'SUBTABLE', value: [] },
      },
    });
    console.log(result);

    // must have revision key
    expect(result).toHaveProperty('revision');
  });

  it('should save order budget with 1 item', async () => {
    const testRecordId = 'a5f9324e-b8f2-4b78-9d48-8dc2b151584b';

    // Prepare data with 10 items
    const createValues: any = Array.from({ length: 10 }, (_, i) => ({
      id: '',
      value: {
        majorItem: { value: `test ${i}` },
      },
    }));

    const prepareTestRecord = await saveOrderBudget({
      recordId: testRecordId,
      record:{        
        items: { 
          type: 'SUBTABLE', 
          value: createValues,
        },
      },
    });

    console.log('PreparedTestRecord', prepareTestRecord);

    // Save one item
    const saveResult = await saveOrderBudget({
      recordId: testRecordId,
      record:{        
        items: { 
          type: 'SUBTABLE', 
          value: [{
            id: '',
            value: {
              majorItem: { value: `test ${new Date()}` },
            } as any,
          }] },
      },
    });
    
    console.log('SavedRecord', saveResult);


    const result = await getOrderBudgetById(testRecordId);

    // items should have 1 item
    expect(result.items.value.length).toBe(1);
  });

  it('should update first last item of order budget with 10 items', async () => {
    const testRecordId = 'a5f9324e-b8f2-4b78-9d48-8dc2b151584b';

    // Prepare data with 10 items
    const createValues: any = Array.from({ length: 10 }, (_, i) => ({
      id: '',
      value: {
        majorItem: { value: `test ${i}` },
      },
    }));

    const prepareTestRecord = await saveOrderBudget({
      recordId: testRecordId,
      record:{        
        items: { 
          type: 'SUBTABLE', 
          value: createValues,
        },
      },
    });

    const latestRecord = await getOrderBudgetById(prepareTestRecord.id);

    // Update last item
    // must copy existing items with their 'id' to avoid data loss 
    const updatedValues = [...latestRecord.items.value];

    updatedValues[updatedValues.length - 1] = {
      id: updatedValues[updatedValues.length - 1].id,
      value: {
        majorItem: { value: `updated ${new Date()}` },
      } as any,
    };

    const updateResult = await saveOrderBudget({
      recordId: testRecordId,
      record:{        
        items: { 
          type: 'SUBTABLE', 
          value: updatedValues,
        },
      },
    });

    console.log('UpdatedRecord', updateResult);

    const result = await getOrderBudgetById(testRecordId);

    // last item should be updated
    expect(result.items.value[updatedValues.length - 1].value.majorItem.value).toContain('updated');

  });



});