import { Button, Chip, TableBody } from '@mui/material';
import { Big } from 'big.js';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { pages } from 'kokoas-client/src/pages/Router';
import { docusignLocale } from 'kokoas-server/src/api/docusign/locale/docusign';
import { Link, useNavigate } from 'react-router-dom';
import { ContractRow } from '../../hooks/useFilteredContracts';
import { TRowLayout } from './TRowLayout';
import { ButtonWithToolTip } from 'kokoas-client/src/components/ui/buttons/ButtonWithSimpleToolTip';

export const ResultsTBody = ({
  items,
}: {
  items: ContractRow[]
}) => {

  const navigate = useNavigate();


  return (
    <TableBody>
      {items?.map(({
        currentContractName,
        currentContractRole,
        contractStatus,
        contractId,
        custGroupId,
        projId,
        projDataId,
        projName,
        contractAmount,
        grossProfit,
        profitRate,
        store,
        yumeAG,
        cocoAG,
        custName,
        contractDate,
        latestInvoiceAmount,
        latestInvoiceDate,
        plannedPaymentDate,
        invoiceId,
      })=>{

        const parsedLatestInvoiceAmount = `${latestInvoiceAmount.toLocaleString()} 円`;
        const isCompleted = contractStatus === 'completed';

        // Get the label based on the contract status
        let label = docusignLocale[contractStatus];

        // If the contract is not completed, add the current contract role and name to the label
        if (!isCompleted) {
          label = currentContractRole
            ? `${currentContractRole}確認中：${currentContractName} `
            : label;
        }


        return (
          <TRowLayout
            key={contractId}
            contractStatus={(
              <Chip
                label={label}
                size="small"
                color={isCompleted ? 'success' : 'default'}
                onClick={() => navigate(`${pages.projContractPreviewV2}?${generateParams({ custGroupId, contractId })}`)}
              />
              )}
            projDataId={(
              <ButtonWithToolTip
                title={'工事情報へ移動'}
                size="small"
                variant='outlined'
                fullWidth
                onClick={() => navigate(`${pages.projEdit}?${generateParams({ projId, contractId })}`)}
              >
                {projDataId}
              </ButtonWithToolTip>
              )}
            projName={projName}
            store={store}
            yumeAG={yumeAG}
            cocoAG={cocoAG}
            custName={custName}
            contractDate={contractDate}
            contractAmount={`${contractAmount.toLocaleString()} 円`}
            grossProfit={`${Big(grossProfit)
              .round()
              .toNumber()
              .toLocaleString()} 円`}
            profitRate={`${Big(profitRate).mul(100)
              .round(2)
              .toNumber()}%`}
            latestInvoiceAmount={invoiceId ? (
              <Link to={`${pages.projInvoice}?${generateParams({ invoiceId })}`}>
                {parsedLatestInvoiceAmount}
              </Link>
            ) : parsedLatestInvoiceAmount}
            latestInvoiceDate={latestInvoiceDate || '-'}
            plannedPaymentDate={plannedPaymentDate || '-'}
            menu={(
              <Button
                fullWidth
                onClick={() => navigate(`${pages.projInvoice}?${generateParams({ custGroupId, contractId })}`)}
              >
                請求入力
              </Button>)}
          />
        );
      })}

    </TableBody>
  );
};