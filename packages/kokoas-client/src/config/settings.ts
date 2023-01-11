import {
  kintoneBaseUrl,
} from 'api-kintone';
import { isProd } from 'config';

export const kokoasEnvAppIds = {
  prod: '149',
  dev: '177',
  test: '176',
};


/**
 * ココアスのベースURLを取得する。
 *
 * 引く数渡されなかったら、環境設定を利用する。
 *
 */
export const getKokoasBaseURLByEnv = (
  env = process.env.NODE_ENV as keyof typeof kokoasEnvAppIds,
) => {
  return `${kintoneBaseUrl}k/${kokoasEnvAppIds[env]}/#`;
};


export const yumecocoDocusign = {
  baseUrl: isProd ? process.env.DOCUSIGN_BASE_URL : process.env.DOCUSIGN_LOCAL_URL,
};

export const baseUrl = isProd ? process.env.BASE_URL : process.env.LOCAL_URL;
