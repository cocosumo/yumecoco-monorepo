import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useWatch } from 'react-hook-form';
import { Controls, Edge, Node, ReactFlow } from 'reactflow';

import { 
  useContractCheckersByStoreId, 
  useCustGroupById, 
  useCustomersByCustGroupId, 
} from 'kokoas-client/src/hooksQuery';
import { TypeOfForm } from '../schema';
import { TAgents } from 'types';
import { nodeTypes } from './customNodes/nodeTypes';


const childSpacing = 350;

export const ElectronicFlow = () => {

  
  const custGroupId = useWatch<TypeOfForm>({ name: 'custGroupId' }) as string;
  const { data: custGroupData } = useCustGroupById(custGroupId);

  const {
    agents,
    members,
    storeId,
    territory,
  } = custGroupData || {};

  // first cocoAgent
  const firstAgent = agents?.value
    .find((agent) => agent.value.agentType.value as TAgents === 'cocoAG'); 
  
  const { data: customersData } = useCustomersByCustGroupId(custGroupId);
  const { data: contractCheckers } = useContractCheckersByStoreId({
    storeId: storeId?.value || '',
    territory: territory?.value || '',
  });

  const {
    storeMgr,
    accounting,
    mainAccounting,
    subAccounting,
  } = contractCheckers ?? {};

  const nodes: Node[]  = [
    {
      id: 'tantou',
      position: { x: 0, y: 0 },
      type: 'roleNode',
      data: { 
        role: '担当者', 
        name: firstAgent?.value.employeeName.value ?? '',
        email: firstAgent?.value.email.value ?? '',
      },
    },

    ...members?.value.map((member, index) => {
      const custEmail = customersData
        ?.[index]
        .contacts
        .value
        ?.find(({ value: { contactType } }) => contactType.value === 'email' );


      return ({
        id: `member-${index}`,
        position: { x: (index  * childSpacing), y: 200 },
        type: 'roleNode',
        data: {
          role: '顧客',
          name: member.value.customerName.value,
          email: custEmail?.value.contactValue.value ?? '',
        },
      });
    }) ?? [],

    {
      id: 'checkersNode',
      position: { x: 140, y: 325 },
      type: 'circleNode',
      data: { labe: null },
    },

    { 
      id: 'storeMgr',
      position: { x: 0, y: 400 },
      type: 'roleNode',
      data: {
        role: '店長',
        name: storeMgr?.文字列＿氏名?.value ?? '',
        email: storeMgr?.email.value ?? '',
      },
    },

    {
      id: 'accounting',
      position: { x: childSpacing, y: 400 },
      type: 'roleNode',
      data: {
        role: '経理',
        name: accounting?.文字列＿氏名?.value ?? '',
        email: accounting?.email.value ?? '',
      },
    },

    {
      id: 'ccNode',
      position: { x: 140, y: 525 },
      type: 'circleNode',
      data: { labe: null },
    },


    {
      id: 'mainAccounting',
      position: { x: 0, y: 600 },
      type: 'roleNode',
      data: {
        role: '本社経理',
        name: mainAccounting?.文字列＿氏名?.value ?? '',
        email: mainAccounting?.email.value ?? '',
      },
    },

    {
      id: 'subAccounting',
      position: { x: childSpacing, y: 600 },
      type: 'roleNode',
      data: {
        role: '経理',
        name: subAccounting?.文字列＿氏名?.value ?? '',
        email: subAccounting?.email.value ?? '',
      },
    },


    {
      id: 'completed',
      position: { x: 75, y: 800 },
      type: 'output',
      data: { label: '完了' },
    },
    

  ];

  const edges: Edge[] = [
    ...nodes.filter(({ id }) => id.includes('member'))
      .map(({ id }) => ({ id: `tantou-${id}`, source: 'tantou', target: id, animated: true })),
    ...nodes.filter(({ id }) => id.includes('member'))
      .map(({ id }) => ({ id: `${id}-checkersNode`, source: id, target: 'checkersNode', animated: true })),
    { id: 'checkersNode-storeMgr', source: 'checkersNode', target: 'storeMgr', animated: true },
    { id: 'checkersNode-accounting', source: 'checkersNode', target: 'accounting', animated: true },

    { id: 'accounting-mainAccounting', source: 'accounting', target: 'ccNode', animated: true },
    { id: 'storeMgr-mainAccounting', source: 'storeMgr', target: 'ccNode', animated: true },

    { id: 'ccNode-mainAccounting', source: 'ccNode', target: 'mainAccounting', animated: true },
    { id: 'ccNode-subAccounting', source: 'ccNode', target: 'subAccounting', animated: true },


    { id: 'mainAccounting-completed', source: 'mainAccounting', target: 'completed', animated: true },
    { id: 'subAccounting-completed', source: 'subAccounting', target: 'completed', animated: true },


  ];

  return (
    <Box 
      height={'100%'} 
      border={1}
      borderColor={grey[100]}
      borderRadius={2}
    >
      <ReactFlow 
        nodeTypes={nodeTypes}
        nodes={nodes} 
        edges={edges}
        fitView
      >
        <Controls />
      </ReactFlow>
    </Box>
  );
};