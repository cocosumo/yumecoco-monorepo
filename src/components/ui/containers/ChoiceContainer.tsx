import { Box } from '@mui/material';

const ChoiceContainer: React.FC = (props) => {
  return (
    <Box width={'100%'} pl={2} borderRadius={2} border="1px solid #d4d7d7">
      {props.children}
    </Box>
  );
};

export default ChoiceContainer;