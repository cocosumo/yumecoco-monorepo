import { Form, useFormikContext } from 'formik';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack  } from '@mui/material';

import { useContext } from 'react';
import { MemoContext } from './MemoContext';
import { getFieldName, MemoFormType } from './form';
import { FormikSelect } from '../../../../../../components/ui/selects';
import { FormikTextField } from '../../../../../../components/ui/textfield';

const options: Options = ['打ち合わせ']
  .map(item => ({ label: item, value: item }));

export const MemoForm = () => {
  const { submitForm } = useFormikContext<MemoFormType>();
  const { memoOpen, handleClose } = useContext(MemoContext);

  return (

    <Form noValidate >

      <Dialog 
        open={memoOpen} 
        onClose={(_, reason)=> handleClose(reason)}
        maxWidth={'md'}
      >
        <DialogTitle>メモを追加</DialogTitle>
        <DialogContent>
          <Stack spacing={2} py={2} minWidth={300}>
            <FormikSelect name={getFieldName('memoType')} label="登録内容" options={options}/>
            <FormikTextField name={getFieldName('contents')}  label={'メモ'} multiline rows={3}/>

          </Stack>
        </DialogContent>
        <DialogActions>

          <Button type="submit" onClick={submitForm} variant="outlined">保存</Button>
        </DialogActions>
      </Dialog>
    </Form>

  );
};