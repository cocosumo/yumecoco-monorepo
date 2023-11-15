import { Typography } from '@mui/material';


export type Customers = Array<{
  custId: string,
  custName: string,
  custKana: string,
}>;

export const ResultItemTitle = ({
  customers,
}:{
  customers: Customers,
}) => {

  const custNames = customers.map((customer) => {
    return customer.custName;
  }).join('、'); 

  
  return (

    <Typography
      sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        maxWidth: 400,
        fontWeight: 600,
        letterSpacing: 0.5,
        color: 'text.primary',
      }}
    >
      {custNames}
    </Typography>


  );
};