import fs from 'fs';
import path from 'path';
import { root } from 'types/settings';
import dotenv from 'dotenv';
import { AppIds } from 'config';
import { getDbName } from './helpers/getDbName';

dotenv.config();

const content = Object.keys(AppIds)
  .map((dbName) => {
    const pascalDbName = getDbName(dbName);
    return [
      `export type ${pascalDbName} = ${pascalDbName}.SavedData;`,
      `export type K${pascalDbName} = keyof ${pascalDbName};`,
    ].join('\n');

  })
  .join('\n\n');

fs.writeFileSync(
  path.join(root, 'src/dbKintone.ts'),
  content,
);

console.log('success');