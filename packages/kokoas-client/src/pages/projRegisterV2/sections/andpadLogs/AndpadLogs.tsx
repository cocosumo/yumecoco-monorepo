import { Button, Stack, Typography } from '@mui/material';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { TForm } from '../../schema';
import format from 'date-fns/format';
import { grey } from '@mui/material/colors';
import { useState } from 'react';

export const AndpadLog = () => {
  const [expanded, setExpanded] = useState(false);
  const logs = useTypedWatch({
    name: 'logs',
  }) as TForm['logs'];

  return (
    <Stack
      mt={20}
      justifyContent={'flex-start'}
      alignItems={'flex-start'}
    >
      {logs.slice(0, !expanded ? 3 : undefined)?.map(({
        id,
        log,
        dateTime,
      }) => (
        <Stack 
          direction={'row'} 
          spacing={2} 
          key={id}
        >
          <Typography
            variant='caption'
            color={grey[400]}
            minWidth={100}
          >
            {dateTime ? format(dateTime, 'yyyy/MM/dd HH:mm') : '-'}
          </Typography>
          <Typography
            variant='caption'
            color={grey[400]}
          >
            {log}
          </Typography>
        </Stack>
      ))}
      <Button
        size='small'
        onClick={() => setExpanded((prev) => !prev)}
      >
        {`${ expanded ? '非表示' :  `全部表示 ${logs.length})`} `}

      </Button>
    </Stack>
  );
};