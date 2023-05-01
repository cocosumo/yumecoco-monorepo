
import { StaticContents } from '../parts/StaticContents';

export const CustomerSummary = () => {
  return (
    <StaticContents 
      buttonLabel='顧客情報を編集する'
      data={[
        { 'label': '店舗', 'value': '豊川中央店' },
        { 'label': '顧客名', 'value': '早川　洋子 a, テスト用' },
        { 'label': '現住所', 'value': '〒4420873 愛知県豊川市山道町' },
        { 'label': 'ここすも営業担当者', 'value': '安富　直人、 大井　道晴' },
        { 'label': 'ゆめてつAG', 'value': '高野 雅弘、 金指 悠太' },
      ]}
    />
  );
};