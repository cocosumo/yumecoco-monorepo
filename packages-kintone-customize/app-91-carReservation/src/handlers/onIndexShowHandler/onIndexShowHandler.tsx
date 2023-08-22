import ReactDOM from 'react-dom';

import { constIndexViewId } from '../../config';
import ReservationStatus from './ReservationStatus';
import CustomTheme from '../../components/CustomTheme';
import  type { IndexEvent } from '../../types/event';

interface AppProps {
  viewId: number
}

const Content = ({
  viewId,
}:{
  viewId: number
}) => {
  switch (viewId) {
    case constIndexViewId:
      return <ReservationStatus />;
    default:
      return (<>
        Nothing
      </>);
  }
};

const App = ({ viewId }: AppProps) => {

  



  return (
    <CustomTheme>
      <Content viewId={viewId} />
    </CustomTheme>
  );
};

const renderBody = (viewId: number) => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    ReactDOM.render(<App {...{ viewId }} />, rootElement);
  }
};


const onIndexShowHandler = (event: IndexEvent) => {
  renderBody(event.viewId);
};

export default onIndexShowHandler;
