

import renderStoreName from '../components/renderStoreName';

const hideFields = () => {
  const hiddenFields: (keyof DB.SavedRecord)[] = [
    'shop_uuid', 'storeName',
  ];
  hiddenFields
    .forEach((field) => {
      kintone.app.record.setFieldShown(field, false);
    });
};

export default async function customizeFields({
  record: {
    shop_uuid: storeId,
    storeName,
  },
}: {
  record: DB.SavedRecord
}) {
  
  hideFields();

  renderStoreName({
    label: storeName.value,
    id: storeId.value,
  });

}
