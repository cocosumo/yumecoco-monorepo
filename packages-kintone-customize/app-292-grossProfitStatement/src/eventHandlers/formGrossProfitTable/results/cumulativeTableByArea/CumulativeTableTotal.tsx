import { Stack, Table, TableBody, TableHead, Typography } from '@mui/material';
import { TableRowLayout } from './TableRowLayout';
import { SummaryContracts } from '../../../helpers/getSummaryContracts';
import { useTypedWatch } from '../../../hooks/useTypedRHF';
import { useAreaNameById } from '../hooks/useAreaNameById';
import { useCumulativeTableTotal } from '../hooks/useCumulativeTableTotal';
import { getMonthsNum } from '../helper/getMonthsNum';
import { GrossProfitTableRow, KGrossProfitTableRows, KTableLabelList, ProjTypeList, projTypeList, tableLabelList } from '../../config';

const getViewData = ({
  datas,
  projTypeForTotalization,
  tgtParam,
}: {
  datas: GrossProfitTableRow[]
  projTypeForTotalization: ProjTypeList
  tgtParam: KGrossProfitTableRows
}) => {
  const tgtObj = datas.find(({ projType }) => projType === projTypeForTotalization);

  return tgtObj ? tgtObj[tgtParam] : 0;
};


/** 対象期間の累計表を表示する */
export const CumulativeTableTotal = ({
  contractData,
}: {
  contractData: SummaryContracts[]
}) => {
  const [
    year,
    periods,
    area,
  ] = useTypedWatch({
    name: [
      'year',
      'months',
      'storeIds',
    ],
  }) as [
    string,
    string[],
    string[],
  ];

  const storeNames = useAreaNameById(area);

  const monthsNum = getMonthsNum(periods);

  const cumulativeTableLabel = `${year}年度 ${storeNames ? storeNames : ''}	契約累積表`;

  const viewDate = useCumulativeTableTotal({
    contractData,
    area,
    monthsNum,
  });
  console.log('viewDate', viewDate);

  return (
    <Stack spacing={1}>
      <Typography variant='h5'>
        {cumulativeTableLabel}
      </Typography>

      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRowLayout
            key={'CumulativeTableTotal.header'}
            label={'税抜'}
            shinchiku={projTypeList[0]}
            reform={projTypeList[1]}
            shinchikuhutai={projTypeList[2]}
            taiyouko={projTypeList[3]}
            others={projTypeList[4]}
            total={'合計'}
          />
        </TableHead>
        <TableBody>
          {Object.keys(tableLabelList).map((tableLabel: KTableLabelList) => (
            <TableRowLayout
              key={`CumulativeTableTotal.${tableLabel}`}
              label={tableLabelList[tableLabel]}
              shinchiku={getViewData({
                datas: viewDate,
                projTypeForTotalization: projTypeList[0],
                tgtParam: tableLabel,
              })}
              reform={getViewData({
                datas: viewDate,
                projTypeForTotalization: projTypeList[1],
                tgtParam: tableLabel,
              })}
              shinchikuhutai={getViewData({
                datas: viewDate,
                projTypeForTotalization: projTypeList[2],
                tgtParam: tableLabel,
              })}
              taiyouko={getViewData({
                datas: viewDate,
                projTypeForTotalization: projTypeList[3],
                tgtParam: tableLabel,
              })}
              others={getViewData({
                datas: viewDate,
                projTypeForTotalization: projTypeList[4],
                tgtParam: tableLabel,
              })}
              total
            />
          ))}
        </TableBody>
      </Table>
    </Stack>
  );
};
