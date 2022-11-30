import { ComponentProps } from 'react';
import { LocationChoices } from '../common/LocationChoices';
import JapanMap from 'kokoas-client/src/assets/img_area_map.gif';
import { Box } from '@mui/material';
import { PrefectureChoices } from '../common/PrefectureChoices';


const areas: {
  [k: string] : {
    prefectures: string[],
    left: number,
    top: number,
  }
} = {
  '中国' : {
    prefectures: ['広島県', '岡山県', '島根県', '鳥取県', '山口県'],
    left: 44,
    top: 172, 
  },
};

console.log(areas);


export const Areas = (
  props: Omit<ComponentProps<typeof LocationChoices>, 'choices'>,
) => {


  return (
    <Box sx={{
      background: `url(${JapanMap}) center no-repeat #fff`,
      height: '445px',
      width: '800px',
      position: 'relative',
    }}
    >
      {/* 中国 */}
      <PrefectureChoices 
        prefectures={['広島県', '岡山県', '島根県', '鳥取県', '山口県']}
        sx={{
          left: 44,
          top: 172,
        }}
      />

      {/* 九州 */}
      <PrefectureChoices 
        prefectures={['福岡県', '佐賀県', '長崎県', '大分県', '熊本県', '宮崎県', '鹿児島県']}
        sx={{
          left: 44,
          top: 300,
        }}
      />

      {/* 近畿 */}
      <PrefectureChoices 
        prefectures={['大阪府', '兵庫県', '京都府', '滋賀県', '奈良県', '和歌山県']}
        sx={{
          left: 216,
          top: 119,
        }}
      />

      {/* 北陸 */}
      <PrefectureChoices 
        prefectures={['石川県', '新潟県', '福山県', '長野県', '福井県', '山梨県']}
        sx={{
          left: 368,
          top: 77,
        }}
      />

      {/* 北海道 */}
      <PrefectureChoices 
        prefectures={['北海道']}
        sx={{
          left: 678,
          top: 38,
          width: '80px',
        }}
      />

      {/* 東北 */}
      <PrefectureChoices 
        prefectures={['青森県', '岩手県', '秋田県', '宮城県']}
        sx={{
          left: 616,
          top: 159,
        }}
      />

      {/* 中部 */}
      <PrefectureChoices 
        prefectures={['愛知県', '静岡県', '岐阜県', '三重県']}
        sx={{
          left: 452,
          top: 361,
        }}
      />

      {/* 関東 */}
      <PrefectureChoices 
        prefectures={['東京都', '神奈川県', '千葉県', '群馬県', '栃木県', '茨城県']}
        sx={{
          left: 616,
          top: 300,
        }}
      />

      {/* 四国 */}
      <PrefectureChoices 
        prefectures={['愛媛県', '香川県', '高知県', '徳島県']}
        sx={{
          left: 252,
          top: 361,
        }}
      />
    
    </Box>
   
  );
};