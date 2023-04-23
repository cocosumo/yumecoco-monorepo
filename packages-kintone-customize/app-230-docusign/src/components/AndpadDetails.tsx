import { Box } from '@mui/material';
import { useAtom } from 'jotai';
import { recordAtom } from './Main';
import { useEffect } from 'react';

export const AndpadDetails = ({
  record,
}: {
  record: DB.SavedRecord
}) => {
  const [recordState, setRecordState] = useAtom(recordAtom);
  useEffect(() => {
    if (!recordState.record) {
      console.log('FIRE!');
      /**
       * kintoneのイベント内のレコードで設定する
       * @see https://cybozudev.zendesk.com/hc/ja/articles/202086734#gist-4
       */
      setRecordState({ record });
    }
  }, [recordState, setRecordState, record]);

  // 開発中。コメント残しておきます。
  console.log(recordState);
  return (
    <Box>
      ここに案件詳細を表示する 。
      項目が多いので、どれを表示するかは要確認。
      {recordState?.record?.systemId?.value}
    </Box>
  );
};