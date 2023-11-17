//import { render } from 'react-dom';
import { Root, createRoot } from 'react-dom/client';

import { getEmployeeRole } from '../backend/user';

import YasumiRegistry from '../components/forms/YasumiRegistry';
import GlobalTheme from '../components/themes/GlobalTheme';

const registrationViewId = 5523653;
const registrationViewIdDev = 5523653;

let root : Root | null = null;

const renderRegistration = async () => {
  const container = document.getElementById('root');
  localStorage.setItem('employeeRole', await getEmployeeRole());

  if (!root && container) {
    root = createRoot(container);
    
    root?.render(
      <GlobalTheme>
        <YasumiRegistry />
      </GlobalTheme>,
    );
  }

};

const onIndexShowHandler = (event: {
  viewId: number;
}) => {
  const { viewId } = event;
  switch (viewId) {
    case registrationViewId:
    case registrationViewIdDev:
      return renderRegistration();

  }

};

export default onIndexShowHandler;
