

import { setFieldShown } from 'api-kintone';
import renderStoreName from '../components/renderStoreName';
import renderProjType from '../components/renderProjType';
import renderCocosumoAG from '../components/renderCocosumoAG';
import renderYumeAG from '../components/renderYumeAG';
import renderCocosumoKouji from '../components/renderCocosumoKouji';

const hideFields = () => {
  const hiddenFields: (keyof DB.SavedRecord)[] = [
    'storeId', 'storeName',
    'projTypeId', 'projTypeName',
    'yumeAGId', 'yumeAGName',
    'cocosumoAGId', 'cocosumoAGName',
    'cocosumoKoujiId', 'cocosumoKoujiName',
  ];
  hiddenFields
    .forEach((field) => {
      setFieldShown(field, false);
    });
};

export default async function customizeFields({
  record: {
    storeId,
    storeName,
    projTypeId,
    projTypeName,
    yumeAGId,
    yumeAGName,
    cocosumoAGId,
    cocosumoAGName,
    cocosumoKoujiId,
    cocosumoKoujiName,
  },
}: {
  record: DB.SavedRecord
}) {

  hideFields();

  
  renderStoreName({
    label: storeName.value,
    id: storeId.value,
  });
  renderProjType({
    label: projTypeName.value,
    id: projTypeId.value,
  });
  renderYumeAG({
    label: yumeAGName.value,
    id: yumeAGId.value,
  });
  renderCocosumoAG({
    label: cocosumoAGName.value,
    id: cocosumoAGId.value,
  });
  renderCocosumoKouji({
    label: cocosumoKoujiName.value,
    id: cocosumoKoujiId.value,
  });

}
