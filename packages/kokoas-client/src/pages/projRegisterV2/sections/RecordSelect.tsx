import Grid from '@mui/material/Unstable_Grid2';
import { ModeInfo, SearchCustGroup, SearchOption, SelectProjectInCustGroup } from 'kokoas-client/src/components';
import { useConfirmDialog } from 'kokoas-client/src/hooks';
import { useFormState, useWatch } from 'react-hook-form';
import { pages } from '../../Router';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { useStableNavigate } from 'kokoas-client/src/hooks/useStableNavigate';
import { useCallback } from 'react';
import { SaveToAndpadButton } from '../parts/saveToAndpad/SaveToAndpadButton';


export const RecordSelect = () => {
  const { setDialogState } = useConfirmDialog();

  const { isDirty } = useFormState();

  const [
    custGroupId,
    custName,
    projId,
    projDataId,
    createdDate,
    andpadDetails,
  ] = useWatch({
    name: [
      'custGroupId',
      'custName',
      'projId',
      'projDataId',
      'createdDate',
      'andpadDetails',
    ],
  });
  const navigate = useStableNavigate();

  
  const navigateToCustGroup = (newCustGroupId?: string) => {

    if (newCustGroupId) {
      navigate(`${pages.projRegV2}?${generateParams({
        custGroupId: newCustGroupId,
      })}`);
    } else {
      navigate(`${pages.projRegV2}`);
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
    <>
      <Grid xs={12} md={4}>
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
      </Grid>
      <Grid xs={6} md={'auto'}>
        <SelectProjectInCustGroup
          custGroupId={custGroupId}
          buttonProps={{
            fullWidth: true,
          }}
          onChange={useCallback(({  uuid }) => {
            navigate(`${pages.projRegV2}?${generateParams({
              projId: uuid.value,
            })}`);
          }, [navigate])}
        />
      </Grid>

      <Grid xs={12} md={'auto'}>
        {!!projId && <SaveToAndpadButton isExist={!!andpadDetails} />}
      </Grid>


      <Grid
        xs={6}
        md={'auto'}
      >
        <ModeInfo
          recordId={projDataId || ''}
          dateStr={createdDate}
        />
      </Grid>

    </>
  );
};