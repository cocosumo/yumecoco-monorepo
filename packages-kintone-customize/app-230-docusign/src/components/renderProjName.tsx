
import { createRoot } from 'react-dom/client';
import { AutoCompleteOption, AutoLookup } from './AutoComplete';
import { searchAndpadOrders } from '../cachedApi/searchAndpadOrders';

export default async function renderProjName(initialValue: AutoCompleteOption) {
  const root = createRoot(kintone.app.record.getSpaceElement('spaceProjName') as Element);

  const handleFetchOptions = async () => {
    const result = await searchAndpadOrders();
    return result.data.objects.map(({
      システムID: systemId,
      案件名: projName,
    }) => {
      return {
        label: String(projName),
        id: String(systemId),
      };
    });
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