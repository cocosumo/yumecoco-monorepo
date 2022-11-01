import { createRoot } from 'react-dom/client';

import App from '../components/App';

import { generateRoot } from '../helpers/utils';

let container: HTMLElement  | null = null;

export default function onIndexShowHandler() {

  // Client side navigation triggers this callback so
  // If container already exist, prevent createRoot from triggering.

  if (!container) {
    generateRoot();

    container = document.getElementById('app');
    const root = createRoot( container!);
    root.render(<App />);
  }
}