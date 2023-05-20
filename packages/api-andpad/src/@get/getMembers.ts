import axios, { AxiosError } from 'axios';
import { ZodError } from 'zod';
import { getToken } from '../@auth/andpadClient';
import { endpoints } from '../endpoints';
import { GetMembersResult, getMembersResult } from 'types';
import { notifyAdmin } from 'libs/src/notifyAdmin';

export const getMembers = async ({
  systemId,
}:{
  systemId: string
}) => {

  try {


    const url = endpoints.getMembers(systemId);
    
    const { data } = await axios({
      url,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });

    const result = getMembersResult.safeParse(data);

    if (!result.success) {
      await notifyAdmin('Andpad側でgetMembersのレスポンスの仕様が変更されています。' + JSON.stringify(result.error));
    }

    return data as GetMembersResult;

  } catch (err) {

    const {
      response,
      errors,
    } = (err || {}) as AxiosError & ZodError;
    const errorMsg = `saveProject が失敗しました. COCOAS_ERROR: ${JSON.stringify(errors)}, ANDPAD_ERROR: ${response?.data ?? ''}`;
    console.error(err);
    throw new Error(`${errorMsg}`);
  }
};