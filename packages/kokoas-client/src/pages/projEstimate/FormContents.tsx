import { Divider, Grid } from '@mui/material';
import { PageSubTitle } from 'kokoas-client/src/components';
import {
  TextField,
  PercentField,
} from 'kokoas-client/src/components/reactHookForm';

import { useFormContext, useWatch } from 'react-hook-form';
import { MismatchedProfit } from './fields/MismatchedProfit';
import { StatusSelect } from './fields/StatusSelect';
import { TypeOfForm } from './form';
import { GoToContractButton } from './navigationComponents/GoToContractButton';
import { EstimateTableLabel } from './staticComponents/EstimateTableLabel';
//import { EstTable } from './tables/estimate/EstTable';
import { EstBody } from './tables/estimatesVirtual/EstBody';
import { SubTotalTable } from './tables/SubTotalTable/SubTotalTable';
import SummaryTable from './tables/SummaryTable/SummaryTable';



export const FormContents = () => {

  const {
    control,
  } = useFormContext<TypeOfForm>();



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

  if (projId) {
    return (
      <>
        <Grid item xs={12} md={3}>
          <TextField
            controllerProps={{
              name: 'projTypeName',
              control,
            }}
            textFieldProps={{
              label: '工事種別名',
              disabled: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>

          <PercentField
            controllerProps={{
              name: 'projTypeProfit',
              control: control,
            }}
            textFieldProps={{
              label: '利益率',
              disabled: projTypeProfitLatest !== 0 || disabled,
            }}
          />

          {!!projTypeProfitLatest
          && projTypeProfitLatest !== 0
          && +(projTypeProfit ?? 0) !== +projTypeProfitLatest
          && !disabled && <MismatchedProfit />}

        </Grid>
        <Grid item xs={12} md={3}>
          <PercentField
            controllerProps={{
              name: 'taxRate',
              control: control,
            }}
            textFieldProps={{
              label: '税率',
              disabled,
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatusSelect control={control} disabled={disabled} />
        </Grid>

        <Grid item xs={12} mt={4}>
          <PageSubTitle label={<EstimateTableLabel />} />
        </Grid>

        <Grid item xs={12}>
          {/* 見積もり内訳のテーブル */}
          {/* <EstTable isDisabled={disabled} /> */}
          <EstBody isDisabled={disabled} />
        </Grid>

        <Grid item xs={12} mt={4}>
          <PageSubTitle label={'大項目小計欄'} />
        </Grid>

        <Grid item xs={12} md={6}>
          <SubTotalTable />
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <GoToContractButton />
        </Grid>

        {/* 合計欄 */}
        <SummaryTable />

      </>

    );
  } else {
    return (<div />);
  }


};