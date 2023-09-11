import { createTableContainer } from './createTableContainer';
import './index.css';

export default function (
  $el: JQuery<HTMLElement>, 
  records: DB.SavedRecord[],
) {
  createTableContainer($el);
}


