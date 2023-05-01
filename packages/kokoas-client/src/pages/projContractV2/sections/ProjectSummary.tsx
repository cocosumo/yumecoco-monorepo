
import { StaticContents } from '../parts/StaticContents';

export const ProjectSummary = () => {
  return (
    <StaticContents 
      buttonLabel='工事情報を編集する'
      data={[
        { 'label': '工事名', 'value': '早川　洋子 a様邸　新築工事' },
        { 'label': '工事担当者', 'value': '大井　道晴' },
        { 'label': '工事住所', 'value': '〒4420874 愛知県豊川市松久町12345' },
      ]}
    />
  );
};