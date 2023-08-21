import { CustomTimeLineItemProps } from '../CustomLineItem';


/** Main for print only */
export const addVirtualProcess = (processes: CustomTimeLineItemProps[] ) => {

  // insert a new process at index 1

  const officerProcess = processes.find(({ roleName }) => (roleName === '担当者'));

  // customers

  const printProcess: CustomTimeLineItemProps = {
    type: 'print',
    roleName: '印刷',
    name: officerProcess?.name || '',
    email: '',
    recipientId: 'print',
  };

  const uploadProcess: CustomTimeLineItemProps = {
    type: 'upload',
    roleName: 'アップロード',
    name: officerProcess?.name || '',
    email: '',
    recipientId: 'upload',
  };

  let lastCustIndex = 0;

  const newProcesses = [...processes]
    .map((process, index) => {
      if (process.roleName === '顧客') {
        return {
          ...process,
          email: '署名',
        };
      } 

      lastCustIndex = index;
      return process;
    });

  newProcesses.splice(1, 0, printProcess);
  newProcesses.splice(lastCustIndex - 1, 0, uploadProcess);

  return newProcesses;
    
};