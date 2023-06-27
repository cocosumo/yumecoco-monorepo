import { Button, Collapse, Stack, Typography } from '@mui/material';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { TForm } from '../../schema';
import format from 'date-fns/format';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import { TransitionGroup } from 'react-transition-group';

const maxRows = 3;

export const AndpadLog = () => {
  const [expanded, setExpanded] = useState(false);
  const logs = useTypedWatch({
    name: 'logs',
  }) as TForm['logs'];

  const rowsLength = logs.length;

  return (
    <Stack
      mt={20}
      justifyContent={'flex-start'}
      alignItems={'flex-start'}
      sx={{
        transition: 'all 1s ease-in-out',
      }}
    >
      <TransitionGroup>
        {logs.slice(0, !expanded ? maxRows : undefined)?.map(({
          id,
          log,
          dateTime,
        }) => (
          <Collapse key={id}>
          
            <Stack 
              direction={'row'} 
              spacing={2} 
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
          </Collapse>
        ))}
      </TransitionGroup>
      {rowsLength > maxRows && (
      <Button
        size='small'
        onClick={() => setExpanded((prev) => !prev)}
      >
        {`${ expanded ? '非表示' :  `全部表示 (${rowsLength})`} `}

      </Button>

      )}

    </Stack>
  );
};