import { Box, Button, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useContractCheckersByStoreId, useCustGroupById } from 'kokoas-client/src/hooksQuery';
import { useWatch } from 'react-hook-form';
import ReactFlow, { 
  Controls, 
  Node, 
  Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import { TAgents } from 'types';
import { TypeOfForm } from '../../../schema';
import { CircleNode } from './customNodes/CircleNode';
import RoleNode from './customNodes/RoleNode';


const nodeTypes =  ({ 
  roleNode: RoleNode, 
  circleNode: CircleNode,
}) ;

export const StepCheckWetInkFlow = ({
  handleSendContract,
  handleCancel,
}: {
  handleSendContract: () => void
  handleCancel: () => void
}) => {
  
  const custGroupId = useWatch<TypeOfForm>({ name: 'custGroupId' }) as string;
  const { data: custGroupData } = useCustGroupById(custGroupId);

  const {
    agents,
    storeId,
  } = custGroupData || {};

  // first cocoAgent
  const firstAgent = agents?.value
    .find((agent) => agent.value.agentType.value as TAgents === 'cocoAG'); 
  
  const { data: contractCheckers } = useContractCheckersByStoreId(storeId?.value ?? '');

  const {
    storeMgr,
    accounting,
    mainAccounting,
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
      id: 'mainAccounting',
      position: { x: 0, y: 400 },
      type: 'roleNode',
      data: {
        role: '本社経理',
        name: mainAccounting?.文字列＿氏名?.value ?? '',
        email: mainAccounting?.email.value ?? '',
      },
    },

    {
      id: 'completed',
      position: { x: 75, y: 600 },
      type: 'output',
      data: { label: '完了' },
    },
    

  ];

  const edges: Edge[] = [
    
    { id: 'tantou-storeMgr', source: 'tantou', target: 'storeMgr', animated: true },
    { id: 'tantou-accounting', source: 'tantou', target: 'accounting', animated: true },

    { id: 'accounting-mainAccounting', source: 'accounting', target: 'mainAccounting', animated: true },
    { id: 'storeMgr-mainAccounting', source: 'storeMgr', target: 'mainAccounting', animated: true },

    { id: 'mainAccounting-completed', source: 'mainAccounting', target: 'completed', animated: true },

  ];



  return (
    <>
      <Box 
        height={600} 
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
      <Stack 
        direction={'row'}
        spacing={2} 
        justifyContent={'flex-end'}
        mt={2}
      >
        <Button
          onClick={handleCancel}
        >
          キャンセル
        </Button>

        <Button
          color={'primary'} 
          variant={'contained'}
          onClick={handleSendContract}
        >
          送信
        </Button> 
      </Stack>
    
    
    </>

   
  );
};