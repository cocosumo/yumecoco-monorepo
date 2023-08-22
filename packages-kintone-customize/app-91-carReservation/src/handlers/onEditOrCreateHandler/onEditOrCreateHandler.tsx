import ReactDOM from 'react-dom';
import { AvailableCarsV2 } from './AvailableCarsV2';
import { getSpaceElement } from 'api-kintone';
import { fetchCars } from '../../api/fetchCars';

const renderAvailableCarsContainer = async (record: kintone.types.SavedCarAppFields) => {
  const allCars = await fetchCars();
  ReactDOM.render(
    <AvailableCarsV2
      initialRecord={record}
      allCars={allCars.records}
    />, getSpaceElement('available-cars'),
  );
};

const onEditOrCreateHandler = (event: {
  record: kintone.types.SavedCarAppFields;
}) => {
  const { record } = event;
  renderAvailableCarsContainer(record);

  return event;
};

export default onEditOrCreateHandler;
