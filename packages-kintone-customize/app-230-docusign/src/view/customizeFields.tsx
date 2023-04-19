

import { setFieldShown } from 'api-kintone';
import render from '../components/render';

const hideFields = () => {
  const hiddenFields: (keyof DB.SavedRecord)[] = [
    'projName',
  ];
  hiddenFields
    .forEach((field) => {
      setFieldShown(field, false);
    });
};

export default async function customizeFields({
  record,
}: {
  record: DB.SavedRecord
}) {



  hideFields();


  render(record);

 
  return { record };
}
