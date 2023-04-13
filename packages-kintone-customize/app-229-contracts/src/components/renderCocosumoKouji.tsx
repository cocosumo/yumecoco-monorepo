
import { createRoot } from 'react-dom/client';
import { AutoCompleteOption, AutoLookup } from './AutoComplete';
import { fetchEmployees } from '../cachedApi/fetchEmployees';
import { rolesMap } from 'api-kintone';

export default async function renderCocosumoKouji(initialValue: AutoCompleteOption) {
  const root = createRoot(kintone.app.record.getSpaceElement('autocompleteCocosumoKoujiId') as Element);

  const handleFetchOptions = async () => {
    return (await fetchEmployees())
      .filter(({
        affiliation,
        role,
      }) => rolesMap.cocoConst.includes(role) && affiliation === 'ここすも'); 
  };
  
  root.render(
    <AutoLookup 
      label='ここすも工事'
      initialValue={initialValue}
      fetchOptions={handleFetchOptions}
      fieldId={'cocosumoKoujiId'}
    />,
  );
}