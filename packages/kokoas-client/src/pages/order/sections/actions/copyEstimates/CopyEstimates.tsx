import { Menu, MenuItem, Tooltip } from '@mui/material';
import { useEstimatesByProjId } from 'kokoas-client/src/hooksQuery';
import { MouseEvent, useState } from 'react';
import { useTypedWatch } from '../../../hooks/useTypedRHF';
import { TForm } from '../../../schema';
import { LoadingButton } from '@mui/lab';
import { ItemContent } from './ItemContents';



export const CopyEstimates = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const projId = useTypedWatch({
    name: 'projId',
  }) as TForm['projId'];
  
  const { data, isFetching } = useEstimatesByProjId(projId);


  return (
    <> 
      <Tooltip title={'見積から引用'}>
        <span> 
          {/* MUIではdisabledだと、Tooltip */}
          <LoadingButton
            variant={'outlined'}
            color='secondary'
            onClick={handleClick}
            disabled={!data?.records.length}
            loading={isFetching}
          >
            {'見積から引用'}
          </LoadingButton>
        </span>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          maxHeight: 300,
        }}
      >
        {data?.records.map(({ 
          dataId, 
          uuid,
          作成日時,
          estimateStatus,
        }, index) => {
          return (
            <MenuItem 
              key={uuid.value}
              divider
            >
        
            
              <ItemContent 
                sequenceId={dataId.value}
                amountAfterTax={data.calculated[index].summary.totalAmountAfterTax}
                amountBeforeTax={data.calculated[index].summary.totalAmountBeforeTax}
                costAmount={data.calculated[index].summary.totalCostPrice}
                createDate={作成日時.value}
                type={estimateStatus.value}
              />
             
            </MenuItem>

          );
        })}
      </Menu>
    </>
  );
};


