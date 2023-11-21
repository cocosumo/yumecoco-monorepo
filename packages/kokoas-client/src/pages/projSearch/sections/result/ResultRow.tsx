import { RowLayout, RowLayoutProps } from './RowLayout';
import { ReactNode, useState } from 'react';
import { DetailsDialog } from './details/DetailsDialog';
import { Stack, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';


const TooltipDetail = ({ label, value }:{
  label: string,
  value: ReactNode,
}) => (<Stack
  direction={'row'}
  justifyContent={'space-between'}
       >
  <Typography fontSize={12}>
    {label}
  </Typography>
  <Typography fontSize={12}>
    {value}
  </Typography>

</Stack>);

export const ResultRow = (props: RowLayoutProps) => {

  const {
    uuid: projId,
    projName,
    procurementPaymentDateEnd,
    payFinDate,
  } = props;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  

  return (
    <>

      <RowLayout 
        {...props}
        procurementPaymentDateEnd={(   
          <Tooltip title={(
            <div>
              <TooltipDetail label={'アンドパッド：'} value={procurementPaymentDateEnd} />
              <TooltipDetail label={'ココアス：'} value={payFinDate} />
            </div>)}
          >
            <Typography
              sx={{
                color: procurementPaymentDateEnd !== payFinDate ? grey[500] : 'inherit',
              }}
              fontSize={'inherit'}
            >
              {payFinDate}
            </Typography>
          </Tooltip>)}
        onClick={handleOpen}
      />
  
      <DetailsDialog 
        open={open} 
        handleClose={handleClose}
        projId={typeof projId === 'string' ? projId : ''}
        projName={typeof projName === 'string' ? projName : ''}
      />
    </>

  );
};