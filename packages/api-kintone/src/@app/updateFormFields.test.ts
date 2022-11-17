import { updateFormFields } from './updateFormFields';

describe('updateFormFields', () => {
  it('should update form field', async () => {
    const testAppId = '208';
    const resp = await updateFormFields({
      app: testAppId,
      properties: {
        projId : {
          'type': 'NUMBER',
          'code': 'projId',
          'label': '工事番号',
          'noLabel': false,
          'required': false,
          'lookup': {
            'relatedApp': {
              'app': '209',
              'code': '',
            },
            'relatedKeyField': 'レコード番号',
            'fieldMappings': [
              {
                'field': 'projName',
                'relatedField': 'projName',
              },
              {
                'field': 'projectPostal',
                'relatedField': 'postal',
              },
              {
                'field': 'projectAddress1',
                'relatedField': 'address1',
              },
              {
                'field': 'projectAddress2',
                'relatedField': 'address2',
              },
              {
                'field': 'kariAddress',
                'relatedField': 'addressKari',
              },
              {
                'field': 'status',
                'relatedField': 'status',
              },
              {
                'field': 'cancelStatus',
                'relatedField': 'cancelStatus',
              },
            ],
            'lookupPickerFields': [
              'projTypeName',
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