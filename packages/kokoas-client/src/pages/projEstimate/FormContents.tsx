import { Alert, Button, Divider, Stack } from '@mui/material';
import {
  TextField,
  PercentField,
} from 'kokoas-client/src/components/reactHookForm';

import { useFormContext, useFormState, useWatch } from 'react-hook-form';
import { MismatchedProfit } from './fields/MismatchedProfit';
import { StatusSelect } from './fields/StatusSelect';
import { UseSaveForm, useSaveHotkey } from './hooks';
import { SubTotalTable } from './tables/SubTotalTable/SubTotalTable';
import { Remarks } from './fields/Remarks';
import { PageSubTitle3 } from 'kokoas-client/src/components/ui/labels/PageSubTitle3';
import { EstimatesDataGrid } from './estimateDataGrid/EstimateDataGrid';
import { TForm } from './schema';
import { Summary } from './sections/Summary';
import { DevTool } from '@hookform/devtools';
import { ActionButtons } from './sections/ActionButton';
import { pages } from '../Router';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { OrderTableLabel } from 'kokoas-client/src/components/inputGridLabel/OrderTableLabel';
import { useConfirmBeforeClose } from 'kokoas-client/src/hooks/useConfirmBeforeClose';
import { GridActions } from './sections/gridActions/GridActions';


export const FormContents = ({
  handleSubmit,
  isFetching,
}: {
  handleSubmit: UseSaveForm['handleSubmit'],
  isFetching: boolean,
}) => {

  const {
    control,
  } = useFormContext<TForm>();

  const { isDirty } = useFormState({ control });

  /* 閉じるまえに、確認アラートを表示する */
  useConfirmBeforeClose({
    open: isDirty,
  });

  const [
    projId,
    projTypeProfit,
    projTypeProfitLatest,
    hasOnProcessContract,
    contractId,
  ] = useWatch({
    control,
    name: [
      'projId',
      'projTypeProfit',
      'projTypeProfitLatest',
      'hasOnProcessContract',
      'contractId',
    ],
  });

  const disabled = hasOnProcessContract || isFetching;
  
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
        pb={10}
      >
        <DevTool control={control} placement={'top-right'} />
       
        {!!projTypeProfitLatest
          && projTypeProfitLatest !== 0
          && +(projTypeProfit ?? 0) !== +projTypeProfitLatest
          && !disabled && <MismatchedProfit />}
        {!!contractId && (
          <Alert
            action={(
              <Button
                variant={'outlined'}
                size={'small'}
                href={`#${pages.projContractPreviewV2}?${generateParams({ contractId: contractId as string })}`}
              >
                契約
              </Button>
            )}
          >
            当見積の契約が進捗中です。右のボタンで契約を確認頂けます。
          </Alert>
        )}

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
              InputProps: {
                sx: {
                  maxWidth: 100,
                },  
              },
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
              InputProps: {
                sx: {
                  maxWidth: 100,
                },  
              },
            }}
          />

          <StatusSelect 
            control={control} 
            disabled={disabled}
          />


        </Stack>

        <PageSubTitle3 label={<OrderTableLabel />} />
   
        <Stack 
          spacing={2}
        >
          <GridActions />
          <EstimatesDataGrid />
          <Summary />
        </Stack>

      
        <PageSubTitle3 label={'大項目小計欄'} />
      
        <SubTotalTable />

        <PageSubTitle3 label={'その他'} />
     
        <Remarks />

        <Divider />  

        <ActionButtons handleSubmit={handleSubmit} />
  
      </Stack>

    );
  } else {
    return (<div />);
  }


};