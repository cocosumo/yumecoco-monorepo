import * as fsExtra from 'fs-extra';
import path from 'path';
import capitalize from 'lodash/capitalize';
import { root } from '../settings';
import { reminderAppIds } from '../config';
import { generateDBTypes } from './generateDBTypes';
import runAll from 'npm-run-all';

import { loadEnv } from 'libs';
loadEnv();

/**
 * Kintone型定義を一括取得
 *
 * 参考
 * https://github.com/kintone/js-sdk/blob/master/packages/dts-gen/docs/how-to-use.md
 *
 */

/**
 * Remove node's limit as this is a heavy task.
 */
process.setMaxListeners(0);

/** define and clear dtsgen directory */
const saveDir = 'types';
fsExtra.emptyDirSync(path.join(root, saveDir));

/** Environment */
const [
  loginAuth,
  baseUrl,
] = [
  'KT_LOGIN_AUTH',
  'KT_BASE_URL',
].map((key) => {
  const val = process.env[key];
  console.log(val);
  if (!val)
    throw new Error(`Failed to retrieved ${key} from the environment.`);
  return val;
});


/** Parse environment */
const decodedAuth = Buffer.from(loginAuth, 'base64').toString('ascii');
const [user, pw] = decodedAuth.split(':');

const dtsgenScripts = Object.entries(reminderAppIds)
  .map(([dbName, appId]) => {
    return [
      'dtsgen --',
      ` --base-url ${baseUrl}`,
      `--app-id ${appId}`,
      '--type-name Data',
      `--namespace DB${capitalize(dbName)}`,
      `-o ${saveDir}/db.${dbName}.d.ts`,
      `-u ${user}`,
      `-p ${pw}`,
    ].join(' ');
  });


runAll(
  dtsgenScripts,
  {
    parallel: true,
    stdout: process.stdout,
    stdin: process.stdin,
    //stderr: process.stderr,
  },
)
  .catch(({ result }: any) => {
    /* results
      .filter(({ code }: any) => code)
      .forEach(({ name }: any) => { */
    if (result?.code) console.log(`"npm run ${result.name}" failed`);
    /* }); */
  })
  .then(() => {
    generateDBTypes();
  });
