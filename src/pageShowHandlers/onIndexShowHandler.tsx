import ReactDOM from 'react-dom';

import App from '../components/App';

import { generateRoot } from '../helpers/utils';


export default function onIndexShowHandler() {
  ReactDOM.render(<App />, generateRoot());
}