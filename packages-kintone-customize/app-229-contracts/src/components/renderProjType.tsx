
import { createRoot } from 'react-dom/client';
import { AutoLookup } from './AutoComplete';
import { getProjTypes } from 'api-kintone';

export default async function renderProjType(
  initialValue:
  { label: string, id: string }) {
  const root = createRoot(kintone.app.record.getSpaceElement('autocompleteProjType') as Element);

  const handleFetchOptions = async () => {
    return (await getProjTypes()).map(({
      uuid,
      label,
    }) => {
      return {
        label: label.value,
        id: uuid.value,
      };
    }); 
  };
  
  root.render(
    <AutoLookup 
      label='工事種別'
      initialValue={initialValue}
      fetchOptions={handleFetchOptions}
      fieldId={'projTypeId'}
    />,
  );
}