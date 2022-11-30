import { ComponentProps } from 'react';
import JapanMap from 'kokoas-client/src/assets/img_area_map.gif';
import { Box, GridProps } from '@mui/material';
import { PrefectureChoices } from '../common/PrefectureChoices';


const areas: {
  [k: string] : GridProps & {
    prefectures: string[],
  }
} = {
  '中国' : {
    prefectures: ['広島県', '岡山県', '島根県', '鳥取県', '山口県'],
    left: 44,
    top: 172, 
  },
  '九州' : {
    prefectures: ['広島県', '岡山県', '島根県', '鳥取県', '山口県'],
    left: 44,
    top: 300,
  },
  '近畿' : {
    prefectures: ['大阪府', '兵庫県', '京都府', '滋賀県', '奈良県', '和歌山県'],
    left: 216,
    top: 119,
  },
  '北陸' : {
    prefectures: ['石川県', '新潟県', '福山県', '長野県', '福井県', '山梨県'],
    left: 368,
    top: 77,
  },
  '北海道' : {
    prefectures: ['北海道'],
    left: 678,
    top: 38,
    width: '80px',
  },
  '沖縄' : {
    prefectures: ['沖縄'],
    left: 16,
    top: 73,
    width: '80px',
  },
  '中部' : {
    prefectures: ['愛知県', '静岡県', '岐阜県', '三重県'],
    left: 452,
    top: 361,
  },
  '東北' : {
    prefectures: ['青森県', '岩手県', '秋田県', '宮城県'],
    left: 616,
    top: 159,
  },
  '関東' : {
    prefectures: ['東京都', '神奈川県', '千葉県', '群馬県', '栃木県', '茨城県'],
    left: 616,
    top: 300,
  },
  '四国' : {
    prefectures: ['愛媛県', '香川県', '高知県', '徳島県'],
    left: 252,
    top: 361,
  },
};



export const Prefectures = (
  props: Omit<ComponentProps<typeof PrefectureChoices>, 'choices' | 'prefectures'>,
) => {

  

  return (
    <Box sx={{
      background: `url(${JapanMap}) center no-repeat #fff`,
      height: '445px',
      width: '800px', // Have to fix width for consistent positions of elements
      position: 'relative',
      margin: 'auto',
    }}
    >

      {
        Object.entries(areas)
          .map(([
            area, 
            {
              prefectures,
              ...gridProps
            }]) => {
            return (
              <PrefectureChoices 
                key={area}
                prefectures={prefectures}
                {...props}
                {...gridProps}
              />
            );
          })
      }
    
    </Box>
   
  );
};