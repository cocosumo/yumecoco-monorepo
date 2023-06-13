import { Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { ContentWarning } from 'kokoas-client/src/components/ui/dialogs/ContentWarning';
import { SelectProjectInCustGroup } from 'kokoas-client/src/components/ui/dialogs/SelectProjectInCustGroup';
import { ModeInfo } from 'kokoas-client/src/components/ui/information/ModeInfo';
import { SearchCustGroup, SearchOption } from 'kokoas-client/src/components/ui/textfield/SearchCustGroup';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { useConfirmDialog } from 'kokoas-client/src/hooks';
import { useStableNavigate } from 'kokoas-client/src/hooks/useStableNavigate';
import { pages } from 'kokoas-client/src/pages/Router';
import { SyntheticEvent, useCallback } from 'react';
import { getFieldName, TypeOfForm } from '../../form';
import { SaveToAndpadButton } from './SaveToAndpadButton';
import { ForcedAndpadLink } from './ForcedAndpadLink';

/**  */
export const RecordSelect = () => {
  const {
    values,
    dirty,
  } = useFormikContext<TypeOfForm>();

  const {
    custGroupId,
    custName,
    createdDate,
    projDataId,
    projId,
    andpadDetails,
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

  const handleChange = (_: SyntheticEvent<Element, Event>, val: SearchOption | null) => {
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
  };

  return (
    <Stack width={'100%'} direction={'row'} spacing={2}
      py={2}
    >
      <SearchCustGroup
        fullWidth
        value={custGroupId ? {
          id: custGroupId,
          name: custName,
        } : undefined}
        onChange={handleChange}
        inputProps={{
          label: '顧客検索',
          name: getFieldName('custGroupId'),
        }}
        sx={{
          minWidth: 300,
        }}
      />
   


      <SelectProjectInCustGroup
        custGroupId={custGroupId}
        buttonProps={{
          sx:{
            whiteSpace: 'nowrap',
          },
        }}
        onChange={useCallback(({  uuid }) => {
          navigate(`${pages.projEdit}?${generateParams({
            projId: uuid.value,
          })}`);
        }, [navigate])}
      />
   

      {!!projId && <SaveToAndpadButton isExist={!!andpadDetails} />}
      {!!projId && <ForcedAndpadLink projId={projId} />}         

      <ModeInfo
        recordId={projDataId || ''}
        dateStr={createdDate}
      />
 
    </Stack>
  );
};