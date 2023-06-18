import { Divider, Stack } from '@mui/material';
import {
  TextField,
  PercentField,
} from 'kokoas-client/src/components/reactHookForm';

import { useFormContext, useWatch } from 'react-hook-form';
import { MismatchedProfit } from './fields/MismatchedProfit';
import { StatusSelect } from './fields/StatusSelect';
import { TypeOfForm } from './form';
import { useConfirmBeforeClose, UseSaveForm, useSaveHotkey } from './hooks';
import { GoToContractButton } from './navigationComponents/GoToContractButton';
import { EstimateTableLabel } from './staticComponents/EstimateTableLabel';
//import { EstBody } from './tables/estimatesVirtual/EstBody';
//import { EstBodyReadOnly } from './tables/estimatesVirtual/readonly/EstBodyReadOnly';
import { SubTotalTable } from './tables/SubTotalTable/SubTotalTable';
import { Remarks } from './fields/Remarks';
import { PageSubTitle3 } from 'kokoas-client/src/components/ui/labels/PageSubTitle3';
import { EstimatesDataGrid } from './estimateDataGrid/EstimateDataGrid';


export const FormContents = ({
  handleSubmit,
}: {
  handleSubmit: UseSaveForm['handleSubmit']
}) => {

  const {
    control,
  } = useFormContext<TypeOfForm>();

  /* 閉じるまえに、確認アラートを表示する */
  useConfirmBeforeClose();

  const [
    projId,
    projTypeProfit,
    projTypeProfitLatest,
    envStatus,
  ] = useWatch({
    control,
    name: [
      'projId',
      'projTypeProfit',
      'projTypeProfitLatest',
      'envStatus',
    ],
  });

  const disabled = !!envStatus;
  
  /* 保存ショートカット　CTRL+S */
  useSaveHotkey(
    handleSubmit,
    {
      disabled,
    },
  );

  

  if (projId) {
    return (
      <Stack 
        spacing={2}
        justifyContent={'flex-start'}
      >

        
        {!!projTypeProfitLatest
          && projTypeProfitLatest !== 0
          && +(projTypeProfit ?? 0) !== +projTypeProfitLatest
          && !disabled && <MismatchedProfit />}
   

        <Stack 
          direction={'row'}
          spacing={2}
        >
          <TextField
            controllerProps={{
              name: 'projTypeName',
              control,
            }}
            textFieldProps={{
              label: '工事種別名',
              disabled: true,
              size: 'small',
            }}
          />

          <PercentField
            controllerProps={{
              name: 'projTypeProfit',
              control: control,
            }}
            textFieldProps={{
              label: '利益率',
              disabled: projTypeProfitLatest !== 0 || disabled,
              size: 'small',
            }}
          />

          <PercentField
            controllerProps={{
              name: 'taxRate',
              control: control,
            }}
            textFieldProps={{
              label: '税率',
              disabled,
              size: 'small',
            }}
          />

          <StatusSelect 
            control={control} 
            disabled={disabled}
          />


        </Stack>

        <PageSubTitle3 label={<EstimateTableLabel />} />
  
        {/*  <Grid item xs={12}>
          {!disabled &&  <EstBody isDisabled={disabled} />}
          {disabled && <EstBodyReadOnly />}
        </Grid> */}
   
        <EstimatesDataGrid />
      
        <PageSubTitle3 label={'大項目小計欄'} />
      
        <SubTotalTable />

        <PageSubTitle3 label={'その他'} />
     
        <Remarks />
  
        <Divider />

        <GoToContractButton />
  

      </Stack>

    );
  } else {
    return (<div />);
  }


};