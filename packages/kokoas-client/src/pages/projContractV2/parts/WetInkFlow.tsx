import { Box } from '@mui/material';
import { useContractCheckersByStoreId, useCustGroupById } from 'kokoas-client/src/hooksQuery';
import { useWatch } from 'react-hook-form';
import { Controls, Edge, Node, ReactFlow } from 'reactflow';
import { TypeOfForm } from '../schema';
import { grey } from '@mui/material/colors';
import { nodeTypes } from './customNodes/nodeTypes';
import { TAgents } from 'types';

export const WetInkFlow = () => {

   
  const custGroupId = useWatch<TypeOfForm>({ name: 'custGroupId' }) as string;
  const { data: custGroupData } = useCustGroupById(custGroupId);

  const {
    agents,
    storeId,
    territory,
  } = custGroupData || {};

  // first cocoAgent
  const firstAgent = agents?.value
    .find((agent) => agent.value.agentType.value as TAgents === 'cocoAG'); 
  
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



  const nodes:Node[]  = [
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

    { 
      id: 'storeMgr',
      position: { x: -200, y: 200 },
      type: 'roleNode',
      data: {
        role: '店長',
        name: storeMgr?.文字列＿氏名?.value ?? '',
        email: storeMgr?.email.value ?? '',
      },
    },

    {
      id: 'accounting',
      position: { x: 200, y: 200 },
      type: 'roleNode',
      data: {
        role: '経理',
        name: accounting?.文字列＿氏名?.value ?? '',
        email: accounting?.email.value ?? '',
      },
    },

    {
      id: 'ccNode',
      position: { x: 140, y: 400 },
      type: 'circleNode',
      data: { labe: null },
    },


    {
      id: 'mainAccounting',
      position: { x: -200, y: 600 },
      type: 'roleNode',
      data: {
        role: '本社経理',
        name: mainAccounting?.文字列＿氏名?.value ?? '',
        email: mainAccounting?.email.value ?? '',
      },
    },

    {
      id: 'subAccounting',
      position: { x: 200, y: 600 },
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
    
    { id: 'tantou-storeMgr', source: 'tantou', target: 'storeMgr', animated: true },
    { id: 'tantou-accounting', source: 'tantou', target: 'accounting', animated: true },

    { id: 'accounting-ccNode', source: 'accounting', target: 'ccNode', animated: true },
    { id: 'storeMgr-ccNode', source: 'storeMgr', target: 'ccNode', animated: true },

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