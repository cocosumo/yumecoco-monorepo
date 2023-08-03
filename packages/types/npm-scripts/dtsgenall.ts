import capitalize from 'lodash/capitalize';
import runAll from 'npm-run-all';
import { AppIds } from 'config';
import { generateDBTypes } from './generateDBTypes';
import * as fsExtra from 'fs-extra';
import path from 'path';
import { root } from 'types/settings';


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
const saveDir = 'src/dtsgen';
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

const dtsgenScripts = Object.entries(AppIds)
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
  .catch(({ results }: any) => {
    results
      .filter(({ code }: any) => code)
      .forEach(({ name }: any) => {
        console.log(`"npm run ${name}" failed`);
      });
  })
  .then(() => {
    generateDBTypes();
  });
