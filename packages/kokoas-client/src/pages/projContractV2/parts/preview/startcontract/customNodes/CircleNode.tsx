import CircleIcon from '@mui/icons-material/Circle';
import  { 
  Handle, 
  Position, 
} from 'reactflow';

export const CircleNode = () => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <CircleIcon sx={{ verticalAlign: 'text-bottom', color: 'grey' }} />
      <Handle type="source" position={Position.Bottom} />
    </>

  );
};