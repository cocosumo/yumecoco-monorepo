
import { createRoot } from 'react-dom/client';
import { AutoCompleteOption, AutoLookup } from './AutoComplete';
import { fetchEmployees } from '../cachedApi/fetchEmployees';
import { rolesMap } from 'api-kintone';

export default async function renderYumeAG(initialValue: AutoCompleteOption) {
  const root = createRoot(kintone.app.record.getSpaceElement('autocompleteYumeAGId') as Element);

  const handleFetchOptions = async () => {
    return (await fetchEmployees())
      .filter(({
        affiliation,
        role,
      }) => rolesMap.yumeAG.includes(role) && affiliation === 'ゆめてつ'); 
  };
  
  root.render(
    <AutoLookup 
      label='エージェント'
      initialValue={initialValue}
      fetchOptions={handleFetchOptions}
      fieldId={'yumeAGId'}
    />,
  );
}