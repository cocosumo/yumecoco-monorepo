import { createTableContainer } from './createTableContainer';
import './index.css';
import { createTableContents } from './createTableContents';
import { addTriggers } from './addTriggers';

export default function (
  $el: JQuery<HTMLElement>, 
  records: DB.SavedRecord[],
) {
  // Prepare the table
  const $table = createTableContainer($el);

  // Add the table contents
  createTableContents($table, records);
  addTriggers();
}