import { Grid } from '@mui/material';
import { useFormikContext } from 'formik';
import { ContentWarning } from 'kokoas-client/src/components/ui/dialogs/ContentWarning';
import { SelectProjectInCustGroup } from 'kokoas-client/src/components/ui/dialogs/SelectProjectInCustGroup';
import { ModeInfo } from 'kokoas-client/src/components/ui/information/ModeInfo';
import { SearchCustGroup } from 'kokoas-client/src/components/ui/textfield/SearchCustGroup';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { useConfirmDialog } from 'kokoas-client/src/hooks';
import { useStableNavigate } from 'kokoas-client/src/hooks/useStableNavigate';
import { pages } from 'kokoas-client/src/pages/Router';
import { useCallback } from 'react';
import { getFieldName, TypeOfForm } from '../../form';

export const RecordSelect = () => {
  const {
    values,
    dirty,
  } = useFormikContext<TypeOfForm>();

  const {
    projId,
    custGroupId,
    custName,
    createdDate,
  } = values;

  const { setDialogState } = useConfirmDialog();
  const navigate = useStableNavigate();

  const navigateToCustGroup = (newCustGroupId?: string) => {

    if (newCustGroupId) {
      navigate(`${pages.projEdit}?${generateParams({
        custGroupId: newCustGroupId,
      })}`);
    } else {
      navigate(`${pages.projReg}`);
    }
  };

  return (
    <Grid
      container
      item
      xs={12}
      spacing={2}
      justifyContent={'space-between'}
    >
      <Grid item
        xs={12}
        md={4}
      >
        <SearchCustGroup
          fullWidth
          value={custGroupId ? {
            id: custGroupId,
            name: custName,
          } : undefined}
          onChange={(_, val) => {
            const { id: newCustGroupId } = val || {};
            if (dirty) {
              setDialogState({
                open: true,
                title: '確認',
                content: <ContentWarning content={'顧客を変更すると工事情報がリセットされます。'} />,
                withNo: true,
                withYes: true,
                yesText: 'OK',
                noText: 'キャンセル',
                handleYes: () => {
                  navigateToCustGroup(newCustGroupId);
                },
              });
            } else {
              navigateToCustGroup(newCustGroupId);
            }

          }}
          inputProps={{
            label: '顧客検索',
            name: getFieldName('custGroupId'),
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
      >
        <ModeInfo
          recordId={projId || ''}
          dateStr={createdDate}
        />
      </Grid>
      <Grid
        container
        item
        xs={12}
        md={4}
        justifyContent={'flex-end'}
      >
        <SelectProjectInCustGroup
          custGroupId={custGroupId}
          onChange={useCallback(({  uuid }) => {
            navigate(`${pages.projEdit}?${generateParams({
              projId: uuid.value,
            })}`);
          }, [navigate])}
        />
      </Grid>
    </Grid>
  );
};