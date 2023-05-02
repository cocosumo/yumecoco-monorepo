import { Box, Button, FormLabel, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../../../schema';
import format from 'date-fns/format';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import isPast from 'date-fns/isPast';
import addDays from 'date-fns/addDays';

const iconSize = {
  height: '100px',
  width: '100px',
};

export const StepConfirmation = ({
  handleCancel,
  handleYes,
} : {
  handleCancel: () => void
  handleYes: () => void
}) => {
  const contractDate = useWatch<TypeOfForm>({ name: 'contractDate' }) as Date;

  const isPastDate = isPast(addDays(contractDate, 1));

  return (
    <Stack spacing={4} direction={'row'} justifyContent={'space-between'}>
      <Box width={'20%'} 
        alignSelf={'center'} 
        textAlign={'center'}
      >
        {isPastDate && (
          <WarningIcon color='warning' sx={iconSize} />
        )}
        {!isPastDate && (
          <CheckCircleIcon color='success' sx={iconSize} />
        )}
        
      </Box>
      <Stack width={'80%'} spacing={2}>
        <FormLabel>
          契約日
        </FormLabel>
        <Typography variant="h4">
          {format(contractDate, 'yyyy年MM月dd日')}
        </Typography>
        <Typography variant={'body1'}>
          {`今日は${format(new Date(), 'yyyy年MM月dd日')}です。`}
        </Typography>
        
        <Typography >
          {isPastDate && ('過去の日付になっています。このまま続きますか？')}
          {!isPastDate && ('このまま続きますか？')}
        </Typography>

        <Stack 
          direction={'row'} 
          justifyContent={'right'}
          spacing={2}
        >
          <Button 
            variant='outlined'
            onClick={handleYes}
          >
            はい
          </Button>
          <Button 
            variant='outlined' 
            onClick={handleCancel}
            color='error'
          >
            いいえ
          </Button>
        </Stack>
      </Stack>



    </Stack>
  );
};