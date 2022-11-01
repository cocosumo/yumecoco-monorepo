import fs from 'fs';
import path from 'path';
import { root } from 'types/settings';
import dotenv from 'dotenv';
import { AppIds } from 'config';

dotenv.config();

const kintoneTypes = Object.keys(AppIds)
  .map((dbName) => {
    return [
      `DB${dbName}`,
    ];

  });

fs.writeFileSync(
  path.join(root, 'kintone.ts'),
  'hello',
);

console.log('success');