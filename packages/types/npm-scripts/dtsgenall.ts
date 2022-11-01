/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */

import runAll from 'npm-run-all';
import { AppIds } from 'config';
import { getDbName } from 'types/helpers/getDbName';
require('dotenv').config();



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

/** Environment */
const [
  loginAuth,
  baseUrl,
] = [
  'LOGIN_AUTH',
  'BASE_URL',
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

const dtsgenScripts = Object.entries(AppIds)
  .map(([dbName, appId]) => {
    return [
      'dtsgen --',
      ` --base-url ${baseUrl}`,
      `--app-id ${appId}`,
      '--type-name Data',
      `--namespace ${getDbName(dbName)}`,
      `-o db.${dbName}.d.ts`,
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
  }).catch(({ results }) => {
  results
    .filter(({ code }) => code)
    .forEach(({ name }) => {
      console.log(`"npm run ${name}" failed`);
    });
});
