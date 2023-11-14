import { Stack, Tooltip, Typography } from '@mui/material';
import { parseISOTimeToFormat } from 'kokoas-client/src/lib';
import { Fragment } from 'react';


export type Customers = Array<{
  custId: string,
  custName: string,
  custKana: string,
}>;

export const ResultItemTitle = ({
  customers,
  createDate,
}:{
  createDate: string, // ISO8601
  customers: Customers,
}) => {

  const custNames = customers.map((customer) => {
    return customer.custName;
  }).join('、'); 

  
  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      flexGrow={1}
    >
      <Tooltip 
        title={(<Stack>
          {customers.map((customer) => {
            return (
              <Fragment
                key={customer.custId}
              >
                <Typography
                  fontSize={'0.75rem'}
                >
                  {customer.custName}
                </Typography>
                <Typography
                  fontSize={'0.6rem'}
                  mb={1}
                >
                  {customer.custKana}
                </Typography>
              </Fragment>
            );
          })}
        </Stack>)}
      >
        <Typography
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: 300,
          }}
        >
          {custNames}
        </Typography>
      </Tooltip>
      <span>
        <Typography
          sx={{
            display: 'inline-block',
            mr: 1,
          }}
          color={'text.secondary'}
          fontSize={'0.6rem'}
        >
          作成日時
        </Typography>
        <Typography
          fontSize={'0.75rem'}
        >
          {parseISOTimeToFormat(createDate) }
        </Typography>
      </span>


    </Stack>
  );
};