import { Alert, AlertTitle, Button, DialogActions, DialogContent, LinearProgress, Stack, Typography } from '@mui/material';
import { useTypedWatch } from '../../../hooks/useTypedRHF';
import { useContractById, useContractFilesById } from 'kokoas-client/src/hooksQuery';
import { grey } from '@mui/material/colors';



const Info = ({
  label,
  value,
}:{
  label: string
  value: string
}) => {
  return (
    <Stack direction='row' spacing={2}>
      <Typography 
        width={'20%'} 
        fontSize={12} 
        color={grey[700]}
      >
        {label}
      </Typography>
      <Typography>
        {value}
      </Typography>
    </Stack>
  );
};

const Contents = ({
  projName,
  customers,
  totalContractAmtAfterTax,
  storeName,
}:{
  projName: string,
  customers: string,
  totalContractAmtAfterTax: string,
  storeName: string
}) => {



  return (
    <Stack
      spacing={2}

    >
      <Alert severity='warning'>
        <AlertTitle>
          以下の内容は合ってますか？
        </AlertTitle>
        契約が完了したら、契約書の内容は変更することはできません。
      </Alert>
      <Stack 
        spacing={2}
        p={2}
        bgcolor={grey[50]}
      >
        <Info
          label='店舗名'
          value={storeName}
        />
        <Info
          label='顧客名'
          value={customers}
        />
        <Info
          label='案件名'
          value={projName}
        />
        <Info
          label='契約金額（税込）'
          value={totalContractAmtAfterTax}
        />


      </Stack>
    </Stack>
  );
};

export const StepConfirmContents = ({
  handleCancel,
  handleYes,
} : {
  handleCancel: () => void
  handleYes: () => void
}) => {

  const [
    contractId,
  ] = useTypedWatch({
    name:[
      'contractId',
    ],
  }) as [
    string,
  ];

  const { data: contractData } = useContractById(contractId);


  const { data: fileData, isLoading } = useContractFilesById({ 
    id: contractId, 
    revision: contractData?.$revision?.value || '',
  });

  const {
    customers = [],
    projName = '-',
    totalContractAmtAfterTax = 0,
    storeName = '-',
  } = fileData?.contractData || {};



  return (
    <>

      <DialogContent>
        {isLoading && <LinearProgress />}
        {!isLoading && (
        <Contents 
          customers={customers?.map(customer => customer.custName).join('、') ?? ''}
          projName={projName}
          totalContractAmtAfterTax={`${totalContractAmtAfterTax.toLocaleString()} 円`}
          storeName={storeName}
        />)}
      </DialogContent>
      <DialogActions>
        <Button 
          sx={{
            width: 100,
          }}
          variant='outlined'
          disabled={isLoading}
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
      </DialogActions>
    </>
  );
};