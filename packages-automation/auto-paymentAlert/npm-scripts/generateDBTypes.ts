import capitalize from 'lodash/capitalize';
import fs from 'fs';
import path from 'path';
import { reminderAppIds } from '../config';
import { root } from '../settings';



export const generateDBTypes = () => {
  const content = Object.keys(reminderAppIds)
    .map((dbName) => {
      const pascalDbName = capitalize(dbName);
      return [
        `export type I${pascalDbName} = DB${pascalDbName}.SavedData;`,
        `export type K${pascalDbName} = keyof I${pascalDbName};`,
      ].join('\n');

    })
    .join('\n\n');

  fs.writeFileSync(
    path.join(root, 'src/dbKintone.ts'),
    content,
  );
};

