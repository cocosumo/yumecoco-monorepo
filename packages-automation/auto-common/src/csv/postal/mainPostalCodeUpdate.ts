import { parseCSVPostal } from './parseCSVPostal';
import { uploadPostalCode } from './uploadPostalCode';

(async () => {
  const records = await parseCSVPostal();
  await uploadPostalCode(records);
})();