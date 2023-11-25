import { KtFileParam } from 'types';

export const uploadFilesToKintoneByAppId = async <T>({
  appId,
  fieldCode,
  documents,
}:{
  appId: string | number,
  fieldCode: keyof T,
  documents : KtFileParam<'uploadFile'>['file'][],
}) => {

  console.log(appId, fieldCode, typeof documents);

  return true as  any;
};