import { Box, Stack, Typography } from '@mui/material';
import { useContractCheckersByStoreId, useCustGroupById, useCustomersByCustGroupId } from 'kokoas-client/src/hooksQuery';
import { useWatch } from 'react-hook-form';
import ReactFlow, { 
  Controls, 
  Background, 
  Node, 
  Handle, 
  Position, 
  Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import { TAgents } from 'types';
import { TypeOfForm } from '../../../schema';

// const xOffset = 150;

/* const edges = [
  { id: '1-2', source: '1', target: '2' },
  { id: '1-3', source: '1', target: '3' },
  { id: '1-4', source: '1', target: '4' },
  { id: '1-5', source: '1', target: '5' },
];


const nodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Hello' },
    type: 'input',
  },
  {
    id: '2',
    position: { x: -300, y: 100 },
    data: { label: 'AAA' },
  },
  {
    id: '3',
    position: { x: -100, y: 100 },
    data: { label: 'BBB' },
  },
  {
    id: '4',
    position: { x: 100, y: 100 },
    data: { label: 'CCC' },
  },
  {
    id: '5',
    position: { x: 300, y: 100 },
    data: { label: 'DDD' },
  },
]; */

const RoleNode = ({
  data: {
    role,
    name,
    email,
  },
}: {
  data: {
    role: string,
    name?: string,
    email?: string, 
  }
}) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />

      <Stack sx={{
        border: '1px solid',
        borderRadius: '5px',
        justifyContent: 'center',
        width: '300px',
        p: 1,
        '& > *': {
          textAlign: 'center',
        },
      }}
      >
        <Typography component={'span'}>
          {role}
        </Typography>
        <Typography component={'span'} fontWeight={'bold'}>
          {name}
        </Typography>
        <Typography component={'span'} variant='caption'>
          {email}
        </Typography>
      </Stack>
      <Handle
        type="source" 
        position={Position.Bottom} 
      />
    </>

  );
};

const nodeTypes =  ({ roleNode: RoleNode }) ;
const childSpacing = 400;


export const StepCheckFlow = () => {
  const custGroupId = useWatch<TypeOfForm>({ name: 'custGroupId' }) as string;
  const { data: custGroupData } = useCustGroupById(custGroupId);

  const {
    agents,
    members,
    storeId,
  } = custGroupData || {};

  // first cocoAgent
  const firstAgent = agents?.value
    .find((agent) => agent.value.agentType.value as TAgents === 'cocoAG'); 

  const memberCount = members?.value.length ?? 0;
  
  const { data: customersData } = useCustomersByCustGroupId(custGroupId);
  const { data: contractCheckers } = useContractCheckersByStoreId(storeId?.value ?? '');

  const {
    storeMgr,
    accounting,
    mainAccounting,
  } = contractCheckers ?? {};

  const custGroupWidth = memberCount * 300 + 20;

  const nodes:Node[]  = [
    {
      id: 'custGroup',
      type: 'group',
      data: { label: null },
      position: { x: -10 + ((memberCount - 1) * 300), y: 200 },
      style: {
        width: custGroupWidth,
        height: 100,
      },
    },
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
        position: { x: 10, y: 10 },
        type: 'roleNode',
        parentNode: 'custGroup',
        data: {
          role: '顧客',
          name: member.value.customerName.value,
          email: custEmail?.value.contactValue.value ?? '',
        },
      });
    }) ?? [],

    { 
      id: 'storeMgr',
      position: { x: -200, y: 400 },
      type: 'roleNode',
      data: {
        role: '店長',
        name: storeMgr?.文字列＿氏名?.value ?? '',
        email: storeMgr?.email.value ?? '',
      },
    },

    {
      id: 'accounting',
      position: { x: 200, y: 400 },
      type: 'roleNode',
      data: {
        role: '経理',
        name: accounting?.文字列＿氏名?.value ?? '',
        email: accounting?.email.value ?? '',
      },
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

  ];

  const edges: Edge[] = [
    ...nodes
      .filter(({ id }) => id.includes('member'))
      .map(({ id }) => ({ id: `tantou-${id}`, source: 'tantou', target: id })),
  ];



  return (
    <Box height={600} >
      <ReactFlow 
        nodeTypes={nodeTypes}
        nodes={nodes} 
        edges={edges}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </Box>
  );
};