
import { createRoot } from 'react-dom/client';
import { AutoCompleteOption, AutoLookup } from './AutoComplete';

export default async function renderProjName(initialValue: AutoCompleteOption) {
  const root = createRoot(kintone.app.record.getSpaceElement('spaceProjName') as Element);

  const handleFetchOptions = async () => {
    return [];
  };
  
  root.render(
    <AutoLookup 
      label='案件名'
      initialValue={initialValue}
      fetchOptions={handleFetchOptions}
      fieldId={'projName'}
    />,
  );
}