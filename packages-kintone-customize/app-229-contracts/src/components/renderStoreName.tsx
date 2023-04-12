
import { createRoot } from 'react-dom/client';
import { AutoCompleteOption, AutoLookup } from './AutoComplete';
import { getAllStores } from 'api-kintone';

export default async function renderStoreName(initialValue: AutoCompleteOption) {
  const root = createRoot(kintone.app.record.getSpaceElement('autocompleteStore') as Element);

  const handleFetchOptions = async () => {
    return (await getAllStores()).map(({
      uuid,
      店舗名,
    }) => {
      return {
        label: 店舗名.value,
        id: uuid.value,
      };
    }); 
  };
  

  root.render(
    <AutoLookup 
      label='店舗名'
      initialValue={initialValue}
      fetchOptions={handleFetchOptions}
      fieldId={'storeId'}
    />,
  );
}