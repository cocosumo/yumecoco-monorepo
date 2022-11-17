import { updateFormFields } from './updateFormFields';

describe.skip('updateFormFields', () => {
  it('should update form field', async () => {
    const testAppId = '210';
    const resp = await updateFormFields({
      app: testAppId,
      properties: {
        projId : {
          'type': 'NUMBER',
          'code': 'projId',
          'lookup': {
            'fieldMappings': [
              {
                'field': '工事名称',
                'relatedField': 'projName',
              },
              {
                'field': '工事種別名',
                'relatedField': 'projTypeName',
              },
              {
                'field': 'storeName',
                'relatedField': 'store',
              },
              {
                'field': 'projTypeId',
                'relatedField': 'projTypeId',
              },
              {
                'field': 'custGroupId',
                'relatedField': 'custGroupId',
              },
              {
                'field': 'storeId',
                'relatedField': 'storeId',
              },
              {
                'field': 'custNames',
                'relatedField': 'custNames',
              },
              {
                'field': 'cocoAGNames',
                'relatedField': 'cocoAGNames',
              },
              {
                'field': 'yumeAGNames',
                'relatedField': 'yumeAGNames',
              },
              {
                'field': 'cocoConstNames',
                'relatedField': 'cocoConstNames',
              },
            ],
            'filterCond': '',
            'sort': 'レコード番号 desc',
          },
        },
      },
    });

    expect(resp).toHaveProperty('revision');
  });
});