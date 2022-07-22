import { Form, useFormikContext } from 'formik';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, FormLabel, Collapse  } from '@mui/material';

import { useContext, useEffect } from 'react';
import { MemoContext } from './MemoContext';
import { getFieldName, MemoFormType } from './form';
import { FormikSelect } from '../../../../../../components/ui/selects';
import { FormikTextField } from '../../../../../../components/ui/textfield';
import { FormikCheckBoxes, FormikLabeledCheckBox } from '../../../../../../components/ui/checkboxes';
import { useParams } from 'react-router-dom';
import { ConfirmSave } from './parts/ConfirmSave';
import { format } from 'date-fns';

const memoTypes = ['顧客情報', '打ち合わせ', '契約内容', '工事場所情報', '問い合わせ', 'その他'] as const;


const memoOptions = memoTypes
  .map(item => ({ label: item, value: item }));

export type MemoType = typeof memoTypes[number];

const notifOptions: Array<{
  label: string,
  value: AgentType
}> = [
  { label: 'ここすも営業', value: 'cocoAG' },
  { label: 'ここすも工事', value: 'cocoConst' },
  { label: 'ゆめてつAG', value: 'yumeAG' },

];


export const MemoForm = () => {
  const recordId  = useParams().recordId;

  const {

    submitForm,
    values: memoFormValues,
  } = useFormikContext<MemoFormType>();

  const {
    custName,
    isNotify,
    createDate,
    commenter,
  } = memoFormValues;

  const {
    memoOpen,
    confirmSaveOpen,
    handleClose,
    handleUpdateMemoList,
  } = useContext(MemoContext)!;


  useEffect(()=>{
    if (recordId) {
      console.log('triggerd!!!');
      handleUpdateMemoList(recordId);
    }
  }, [recordId]);

  return (

    <Form noValidate >

      <Dialog
        open={memoOpen}
        onClose={(_, reason)=> handleClose(reason)}
        maxWidth={'md'}
      >
        <DialogTitle>
          メモを追加
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} pt={2} minWidth={360}>
            <Stack justifyContent={'flex-end'} direction={'row'}>
              顧客名：{custName}
            </Stack>
            <FormikSelect name={getFieldName('memoType')} label="登録内容" options={memoOptions}/>
            <FormikTextField name={getFieldName('contents')}  label={'メモ'} multiline rows={3}/>
            <Stack direction={'row'} justifyContent="space-between">
              <FormikLabeledCheckBox name={getFieldName('isNotify') } label={'担当者に通知する'} />
              <Stack>
                <FormLabel>作成日時: {createDate || format(new Date(), 'yyyy年MM年dd日')}</FormLabel>
                <FormLabel>作成者: {commenter || kintone.getLoginUser().name}</FormLabel>
              </Stack>

            </Stack>

            <Collapse in={isNotify}>
              <div style={{ paddingTop: '8px' }}>
                <FormikCheckBoxes name={getFieldName('notifyTo')} label={'担当者'} choices={notifOptions} helperText="通知する担当者を選択してください"/>
              </div>
            </Collapse>

          </Stack>
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={submitForm} variant="outlined">保存</Button>
        </DialogActions>
      </Dialog>
      {confirmSaveOpen && <ConfirmSave />}
    </Form>

  );
};