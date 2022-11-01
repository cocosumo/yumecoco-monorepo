import { CONFIG, URL } from './config';
import axios from 'axios';
import { isBrowser } from '../../../helpers/utils';

interface User {
  code: string,
  name: string,
  employeeNumber: string,
}

interface UserAPI {
  size?: number,
  offset: number
}

export const getAllUsers = async (body : UserAPI = {
  offset : 0,
}  ): Promise<User[]> => {
  

  const users: User[] = (await kintone.api(kintone.api.url('/v1/users', true), 'GET', body))?.users;

  if (users.length === 0){
    return [];
  } else {
    return users.concat(await getAllUsers({ size: 100, offset : body.offset + 100 }));
  }


};


export const getKintoneUsers = async () : Promise<User[]> => {
  
  if (isBrowser()){
    return getAllUsers();
  }

  return axios.get(
    URL,
    CONFIG,
  )
    .then(res => {
      return res?.data?.users.filter((user : { valid: boolean }) => user.valid === true);
    })
    .catch(err => {throw new Error(err);});
};

export const getKintoneUserByEmpId = async (empId: string) => {
  return (await getKintoneUsers())
    .find((user) => user.employeeNumber === empId);
};

export const getUserCodeById = async (empId : string) => (await getKintoneUserByEmpId(empId))?.code;

export const getUserCodesByIds = async (empIds: string[]) => {
  return (await getKintoneUsers())
    .filter((user) => empIds.includes(user.employeeNumber))
    .map((item) => ({ name: '', code: item.code }));
};