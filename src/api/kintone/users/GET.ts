import { CONFIG, URL } from './config';
import axios from 'axios';

export const getKintoneUsers = async () => {
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
    .find((user: { employeeNumber: string }) => user.employeeNumber === empId);
};