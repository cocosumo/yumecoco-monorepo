import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  Stack, 
  Tooltip, 
  Typography, 
} from '@mui/material';
import { useState } from 'react';
import { IUnsavedMitsumori, localStorageFormRecoveryKey } from './UnsavedMitsumori';
import { format, parseISO } from 'date-fns';
import { useLocalStorage } from 'usehooks-ts';
import { useFormContext } from 'react-hook-form';
import { TForm } from '../schema';

const Info = ({
  label,
  info,
}:{
  label: string,
  info: string,
}) => {
  return (
    <Stack direction='row'>
      <Typography width={'20%'} fontSize={'0.7rem'} color={'grey.700'}>
        {label}
      </Typography>

      <Typography>
        {info}
      </Typography>
    </Stack>
  );
};

export const UnsavedMitsumoriModal = ({
  isInitialRender,
  setIsInitialRender,
}:{
  isInitialRender: boolean,
  setIsInitialRender: (value: boolean) => void,
}) => {
  const [formRecovery, setFormRecovery] = useLocalStorage<IUnsavedMitsumori | undefined>(localStorageFormRecoveryKey, undefined);
  const { reset } = useFormContext<TForm>();
  const [open, setOpen] = useState(Boolean(formRecovery));

  if (!formRecovery) return null;

  const handleClose = () => {
    setOpen(false);
    setIsInitialRender(false);
  };

  const clearFormRecovery = () => {
    setFormRecovery(undefined);
    handleClose();
  };

  const handleRecover = () => {
    if (!formRecovery.data) return;

    reset({ 
      ...formRecovery.data,
      createdDate: undefined, 
    }, { 
      keepDefaultValues: true, 
    });
    handleClose();
  };

  const priceAfterTax = formRecovery.data?.items.reduce((acc, item) => acc + item.rowUnitPriceAfterTax, 0);

  return (
    <Dialog
      open={isInitialRender && open}
      onClose={handleClose}
    >
      <DialogTitle>
        見積もり回復
      </DialogTitle>
      <DialogContent>

        <DialogContentText sx={{ fontSize: 12 }}>
          ココアスによって、以下の見積もりが回復されました。
          予期せず閉じると、次に見積もりを開いたときに、「見積もり回復」が自動的に開き、見積を元に戻すのに役に立ちます。
        </DialogContentText>
        
        <Stack 
          spacing={1} 
          mt={2}
          borderRadius={4}
          bgcolor={'#f5f5f5'}
          p={2}
        >
          <Info 
            label={'工事名'}
            info={formRecovery.data?.projName || '新規'}
          />
          <Info 
            label={'見積番号'}
            info={formRecovery.data?.estimateDataId || '新規'}
          />
          <Info 
            label={'行数'}
            info={`${formRecovery.data?.items.length}件`}
          />
          <Info 
            label={'税込金額'}
            info={`${priceAfterTax?.toLocaleString()}円`}
          />
          <Info 
            label={'日時'}
            info={format(parseISO(formRecovery.date), 'yyyy/MM/dd HH:mm:ss')}
          />
        </Stack>
   

      </DialogContent>

      <DialogActions>
        <Tooltip title='破棄します。不要な時に押してください'>
          <Button
            color='error'
            onClick={clearFormRecovery}
          >
            破棄
          </Button>
        </Tooltip>
        <Tooltip title='回復します。'>
          <Button
            color='success'
            variant='contained'
            onClick={handleRecover}
          >
            回復
          </Button>
        </Tooltip>


  
      </DialogActions>

    </Dialog>);
};
