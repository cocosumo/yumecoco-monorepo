import { getAppId } from 'api-kintone';

export const prodAppId = 91;
export const currAppId = getAppId();

export const constIndexViewId = currAppId === prodAppId ? 5533779 : 5533776;