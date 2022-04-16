import { Form, useFormikContext } from 'formik';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, FormLabel, Collapse  } from '@mui/material';

import { useContext } from 'react';
import { MemoContext } from './MemoContext';
import { getFieldName, MemoFormType } from './form';
import { FormikSelect } from '../../../../../../components/ui/selects';
import { FormikTextField } from '../../../../../../components/ui/textfield';
import { FormikCheckBoxes, FormikLabeledCheckBox } from '../../../../../../components/ui/checkboxes';
import { AgentTypes } from '../../../../../../types/forms';

const options: Options = ['打ち合わせ']
  .map(item => ({ label: item, value: item }));

const notifOptions: Array<{
  label: string,
  value: AgentTypes
}> = [
  { label: 'ここすも営業', value: 'cocoAG' },
  { label: 'ここすも工事', value: 'cocoConst' },
  { label: 'ゆめてつAG', value: 'yumeAG' },
];

export const MemoForm = () => {
  const { 
    submitForm, 
    values: { 
      isNotify,
    }, 
  } = useFormikContext<MemoFormType>();
  const { memoOpen, handleClose } = useContext(MemoContext);

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
              顧客名：レンズ
            </Stack>
            <FormikSelect name={getFieldName('memoType')} label="登録内容" options={options}/>
            <FormikTextField name={getFieldName('contents')}  label={'メモ'} multiline rows={3}/>
            <Stack direction={'row'} justifyContent="space-between">
              <FormikLabeledCheckBox name={getFieldName('isNotify') } label={'担当者に通知する'} />
              <Stack>
                <FormLabel>作成日時: {'2022年4月16日'}</FormLabel>
                <FormLabel>作成者: {'ラス'}</FormLabel>
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
    </Form>

  );
};