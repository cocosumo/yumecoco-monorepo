import axios from 'axios';
import { getToken } from '../@auth/andpadClient';
import { endpoints } from '../endpoints';
import { SaveProjectData, saveProjectResponse } from '../types';

export const saveProject = async (body: SaveProjectData) => {
  try {

    const { data } = await axios({
      url: endpoints.ordersSync,
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getToken()}`,
      },
      data: body,
    });

    const resp = saveProjectResponse.parse(data);

    return resp;

  } catch (err) {
    console.error(err.response.data.errors);
    throw new Error(`saveProject が失敗しました. ${err.message}`);
  }
};