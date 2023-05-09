import { Stack, Typography } from '@mui/material';
import  { 
  Handle, 
  Position, 
} from 'reactflow';
import 'reactflow/dist/style.css';


export default function RoleNode({
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
}) {
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
}