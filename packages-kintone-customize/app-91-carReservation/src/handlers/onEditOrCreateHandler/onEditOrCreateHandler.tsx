import { createRoot } from 'react-dom/client';
import { AvailableCarsV2 } from './AvailableCarsV2';
import { getSpaceElement } from 'api-kintone';
import { fetchCars } from '../../api/fetchCars';

console.log('ENVVARIABLES', process.env.reportEmail);

const renderAvailableCarsContainer = async (record: kintone.types.SavedCarAppFields) => {
  const allCars = await fetchCars();
  const container = getSpaceElement('available-cars');
  if (!container) return;

  const root = createRoot(container);

  root.render( 
    <AvailableCarsV2
      initialRecord={record}
      allCars={allCars.records}
    />,
  );


};

export const onEditOrCreateHandler = (event: {
  record: kintone.types.SavedCarAppFields;
}) => {
  const { record } = event;
  console.log('record:', record);

  renderAvailableCarsContainer(record);

  return event;
};