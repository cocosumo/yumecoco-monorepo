import { RowLayout } from './RowLayout';
import { MouseEventHandler, ReactNode, useState } from 'react';
import { DetailsDialog } from './details/DetailsDialog';
import { Stack, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ReceivableCompleteDate } from './editables/ReceivableCompleteDate';
import { SearchResult } from '../../types';


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

export const ResultRow = (props:  SearchResult) => {

  const {
    uuid: projId,
    projName,
    procurementPaymentDateEnd,
    payFinDate,
    receivableCompleteDate,
  } = props;

  const [open, setOpen] = useState(false);

  const handleOpen: MouseEventHandler<HTMLElement> = (e) => {
    const clickedEl = e.target as HTMLElement;
    const tagName = (clickedEl).tagName;
    if (tagName === 'INPUT') return; // if clicked element is input, do nothing
    
    if (tagName === 'TD') {
      // If clicked cell has input, focus on it
      const input = clickedEl.querySelector('input');
      if (input) {
        input.focus();
        return;
      }
    } 

    // Otherwise, open details dialog
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
        receivableCompleteDate={(
          <ReceivableCompleteDate 
            projId={projId as string} 
            receivableCompleteDate={receivableCompleteDate as string}
          />)}
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