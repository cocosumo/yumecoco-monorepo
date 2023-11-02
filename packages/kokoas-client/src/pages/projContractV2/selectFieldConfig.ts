import { KeyOfForm } from './form';

interface FieldConfig {
  label: string;
  default: string;
  options: string[];
  required: boolean;
}

export const selectFieldConfig : Partial<Record<KeyOfForm, FieldConfig >> = {
  'purpose': {
    label: '用途',
    default: '専用住宅',
    required: true,
    options: [
      '専用住宅',
      '店舗併用住宅',
      '事務所併用住宅',
      '店舗',
      '事務所',
    ],
  },
  'structure': {
    label: '構造',
    default: '木造（軸組み）',
    required: true,
    options: [
      '木造（軸組み）',
      '軽量鉄骨造（S造）',
      '鉄筋コンクリート造（RC造）',
      '鉄骨鉄筋コンクリート造（SRC造）',
    ],
  },
  'scale': {
    label: '階数',
    default: '2階建て',
    required: false,
    options: [
      '平屋',
      '2階建て',
      '3階建て',
    ],
  },
};
