import capitalize from 'lodash/capitalize';
import fs from 'fs';
import path from 'path';
import { root } from 'types/settings';
import { AppIds } from 'config';



export const generateDBTypes = () => {
  const content = Object.keys(AppIds)
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

