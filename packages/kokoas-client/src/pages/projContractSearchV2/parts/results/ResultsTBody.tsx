import { Chip, ChipProps, TableBody, Tooltip } from '@mui/material';
import { Big } from 'big.js';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { pages } from 'kokoas-client/src/pages/Router';
import { docusignLocale } from 'kokoas-server/src/api/docusign/locale/docusign';
import { useNavigate } from 'react-router-dom';
import { ContractRow } from '../../hooks/useFilteredContracts';
import { TRowLayout } from './TRowLayout';
import CommentIcon from '@mui/icons-material/Comment';
import AttachmentIcon from '@mui/icons-material/Attachment';

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
        category,
        refundAmt,
        reductionAmt,
        subsidyAmt,
        //projId,
        projDataId,
        projName,
        contractAmount,
        grossProfit,
        profitRate,
        store,
        yumeAG,
        cocoAG,
        cocoConst,
        custName,
        contractDate,

        signMethod,

        memo,

        createdAt,
        updatedAt,
        hasOtherAttachments,
      })=>{

        const isCompleted = contractStatus === 'completed';

        // Get the label based on the contract status
        let label = docusignLocale[contractStatus];

        // If the contract is not completed, add the current contract role and name to the label
        if (!isCompleted) {
          label = currentContractRole
            ? `${currentContractRole}確認中：${currentContractName} `
            : label;
        }

        let statusColor: ChipProps['color'] = 'default';

        if (isCompleted) {
          statusColor = 'success';
        } else if (contractStatus === 'sent') {
          statusColor = 'warning';
        }




        return (
          <TRowLayout
            key={contractId}
            contractStatus={(
              <Chip
                label={label || '未処理'}
                size="small"
                color={statusColor}
                icon={(
                  <>
                    {memo && (
                      <Tooltip
                        title={<span style={{ whiteSpace: 'pre' }}>
                          {memo}
                        </span>}
                      >
                        <CommentIcon />
                      </Tooltip>
                    )}

                    {hasOtherAttachments && (
                    <Tooltip title="添付ファイルがあります">
                      <AttachmentIcon />
                    </Tooltip>
                    )}
                  </>
                )}
              />
              )}
            category={category || '契約'}
            refundAmt={refundAmt ? refundAmt.toLocaleString() : '-'}
            reductionAmt={reductionAmt ? reductionAmt.toLocaleString() : '-'}
            subsidyAmt={subsidyAmt ? subsidyAmt.toLocaleString() : '-'}
            signMethod={signMethod === 'wetInk' ? '手書' : '電子'}
            projDataId={projDataId}
            projName={projName}
            store={store}
            yumeAG={yumeAG}
            cocoAG={cocoAG}
            cocoConst={cocoConst}
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
            createdAt={createdAt}
            updatedAt={updatedAt}
            onClick={() => navigate(`${pages.projContractPreviewV2}?${generateParams({ custGroupId, contractId })}`)}
          />
        );
      })}

    </TableBody>
  );
};