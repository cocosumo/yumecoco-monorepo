import { ModeInfo, SearchCustGroup, SearchOption, SelectProjectInCustGroup } from 'kokoas-client/src/components';
import { useConfirmDialog } from 'kokoas-client/src/hooks';
import { useFormState, useWatch } from 'react-hook-form';
import { pages } from '../../Router';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { useStableNavigate } from 'kokoas-client/src/hooks/useStableNavigate';
import { useCallback } from 'react';
import { Stack } from '@mui/material';
import { formatDataId } from 'libs';


export const RecordSelect = () => {
  const { setDialogState } = useConfirmDialog();

  const { isDirty } = useFormState();

  const [
    custGroupId,
    custName,
    projDataId,
    createdDate,
  ] = useWatch({
    name: [
      'custGroupId',
      'custName',
      'projDataId',
      'createdDate',
    ],
  });
  const navigate = useStableNavigate();

  
  const navigateToCustGroup = (newCustGroupId?: string) => {

    if (newCustGroupId) {
      navigate(`${pages.projEditV2}?${generateParams({
        custGroupId: newCustGroupId,
      })}`);
    } else {
      navigate(`${pages.projEditV2}`);
    }
  };

  const handleChange = (_: unknown, val: SearchOption | null) => {
    const { id: newCustGroupId } = val || {};
    if (isDirty) {
      setDialogState({
        open: true,
        title: '顧客を変更しますか。',
        content: '顧客を変更すると工事情報がリセットされます。',
        withNo: true,
        withYes: true,
        yesText: 'OK',
        noText: 'キャンセル',
        severity: 'warning',
        handleYes: () => {
          navigateToCustGroup(newCustGroupId);
        },
      });
    } else {
      navigateToCustGroup(newCustGroupId);
    }
  };

  return (
    <Stack direction={'row'} spacing={2}>
      <SearchCustGroup 
        fullWidth
        value={custGroupId ? {
          id: custGroupId,
          name: custName,
        } : undefined}
        onChange={handleChange}
        inputProps={{
          label: '顧客検索',
          name: 'custGroupId',
        }}
      />

      <SelectProjectInCustGroup
        custGroupId={custGroupId}
        buttonProps={{
          fullWidth: true,
        }}
        onChange={useCallback(({  uuid }) => {
          navigate(`${pages.projEditV2}?${generateParams({
            projId: uuid.value,
          })}`);
        }, [navigate])}
      />

      <ModeInfo
        recordId={formatDataId(projDataId) || ''}
        dateStr={createdDate}
      />


    </Stack>
  );
};