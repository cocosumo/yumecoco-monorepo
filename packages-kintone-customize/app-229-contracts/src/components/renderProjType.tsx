
import { createRoot } from 'react-dom/client';
import { AutoCompleteOption, AutoLookup } from './AutoComplete';
import { getProjTypes } from 'api-kintone';

export default async function renderProjType(initialValue: AutoCompleteOption) {
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
      label='工事種別名'
      initialValue={initialValue}
      fetchOptions={handleFetchOptions}
      fieldId={'projTypeId'}
    />,
  );
}