

import renderStoreName from '../components/renderStoreName';

export default function customizeFields(event: {
  record: DB.SavedRecord
}) {
  const hiddenFields: (keyof DB.SavedRecord)[] = [
    'shop_uuid', 'storeName',
  ];

  hiddenFields.forEach((field) => {
    kintone.app.record.setFieldShown(field, false);
  });

  console.log(event);
  renderStoreName();
}
