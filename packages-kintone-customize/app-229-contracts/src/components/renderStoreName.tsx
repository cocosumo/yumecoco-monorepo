
import { createRoot } from 'react-dom/client';
import { AutoLookup } from './AutoComplete';
import { getAllStores } from 'api-kintone';


export default async function renderStoreName() {
  const root = createRoot(kintone.app.record.getSpaceElement('autocompleteStore') as Element);
  const storeOptions = await getAllStores(); 

  root.render(
    <AutoLookup 
      label='店舗名'
      options={storeOptions.map(({
        uuid,
        店舗名,
      }) => {
        return {
          label: uuid.value,
          id: 店舗名.value,
        };
      })}
    />,
  );
}