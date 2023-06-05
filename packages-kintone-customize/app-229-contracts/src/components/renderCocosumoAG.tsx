
import { createRoot } from 'react-dom/client';
import { AutoCompleteOption, AutoLookup } from './AutoComplete';
import { fetchEmployees } from '../cachedApi/fetchEmployees';
import { rolesMap } from 'api-kintone';

export default async function renderCocosumoAG(initialValue: AutoCompleteOption) {
  const root = createRoot(kintone.app.record.getSpaceElement('autocompleteCocosumoAGId') as Element);

  const handleFetchOptions = async () => {
    return (await fetchEmployees())
      .filter(({
        affiliation,
        role,
      }) => rolesMap.cocoAG.includes(role) && affiliation === 'ここすも'); 
  };
  
  root.render(
    <AutoLookup 
      label='ここすも営業'
      initialValue={initialValue}
      fetchOptions={handleFetchOptions}
      fieldId={'cocosumoAGId'}
    />,
  );
}