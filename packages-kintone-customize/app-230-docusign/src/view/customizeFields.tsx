

import { setFieldShown } from 'api-kintone';
import renderProjName from '../components/renderProjName';

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

  const {
    projName,
  } = record;

  hideFields();

  console.log(projName);

  renderProjName({
    id: projName.value,
    label: projName.value,
  });

 
  return { record };
}
