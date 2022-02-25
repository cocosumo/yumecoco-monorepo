import { CONFIG, URL } from './config';
import axios from 'axios';

interface User {
  code: string,
  name: string,
  employeeNumber: string,
}

export const getKintoneUsers = async () : Promise<User[]> => {
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