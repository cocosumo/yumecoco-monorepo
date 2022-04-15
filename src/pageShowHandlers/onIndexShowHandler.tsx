import { createRoot } from 'react-dom/client';

import App from '../components/App';

import { generateRoot } from '../helpers/utils';


export default function onIndexShowHandler() {

  generateRoot();
  const container = document.getElementById('app');
  const root = createRoot( container!);
  root.render(<App />);
}