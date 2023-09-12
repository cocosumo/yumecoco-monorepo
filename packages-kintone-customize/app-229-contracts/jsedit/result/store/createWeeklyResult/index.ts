import { createTableContainer } from './createTableContainer';
import { createTableContents } from './createTableContents';
import './index.css';

export default function (
  $el: JQuery<HTMLElement>, 
  records: DB.SavedRecord[],
) {

  const $table =  createTableContainer($el);
  
  createTableContents($table, records);
}


