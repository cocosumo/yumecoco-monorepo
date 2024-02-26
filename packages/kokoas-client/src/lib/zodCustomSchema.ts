import { z } from 'zod';

export const postalSchema = z.string()
  .regex(/^(?:\d{3}-?\d{4})?$/, '郵便番号は7桁で入力してください。');
