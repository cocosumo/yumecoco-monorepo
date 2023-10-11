/* eslint-disable no-nested-ternary */
import { z } from 'zod';

const types : Record<string, string> = {
  number: '数値',
  string: '文字列',
  nan: '数字ではないもの',
};

export const zodErrorMapJA =
  (): z.ZodErrorMap =>
    (issue, ctx) => {
     
      /**
     * enの場合はDefaultエラー内容を返す
     */

      switch (issue.code) {
        case z.ZodIssueCode.invalid_type:
          if (issue.received === 'undefined') {
            return {
              message: '必須',
            };
          } else {
            return {
              message: `期待値は ${types[issue.expected] ?? issue.expected} でしたが、実際には ${types[issue.received] ?? issue.received} が返ってきました。`,
            };
          }
        case z.ZodIssueCode.unrecognized_keys:
          return {
            message: `Unrecognized key(s) in object: ${issue.keys
              .map((k) => `'${k}'`)
              .join(', ')}`,
          };
        case z.ZodIssueCode.invalid_union:
          return {
            message: 'Invalid input',
          };
        case z.ZodIssueCode.invalid_union_discriminator:
          return {
            message: `Invalid discriminator value. Expected ${issue.options
              .map((val) => (typeof val === 'string' ? `'${val}'` : val))
              .join(' | ')}`,
          };
        case z.ZodIssueCode.invalid_enum_value:
          return {
            message: `「${issue.options
              .map((val) => (typeof val === 'string' ? `'${val}'` : val))
              .join(' | ')}」から選択肢ください`,
          };
        case z.ZodIssueCode.invalid_arguments:
          return {
            message: 'Invalid function arguments',
          };
        case z.ZodIssueCode.invalid_return_type:
          return {
            message: 'Invalid function return type',
          };
        case z.ZodIssueCode.invalid_date:
          return {
            message: '日付が無効です。',
          };
        case z.ZodIssueCode.invalid_string:
          if (issue.validation !== 'regex') {
            return {
              message:  `${issue.validation}は無効な形式です`,
              
            };
          } else {
            return {
              message: 'Invalid',
            };
          }
        case z.ZodIssueCode.too_small:
          if (issue.type === 'array') {
            return {
              message: `Array must contain ${
                issue.inclusive ? 'at least' : 'more than'
              } ${issue.minimum} element(s)`,
            };
          } else if (issue.type === 'string') {
            return {
              message:  issue.inclusive
                ? `文字列には少なくとも${issue.minimum}文字が含まれている必要があります`
                : `文字列には${issue.minimum}文字以上が含まれている必要があります`,
                
            };
          } else if (issue.type === 'number') {
            return {
              message: `${Number(issue.minimum) + 1} 以上の数字を入れてください ${
                issue.inclusive ? 'or equal to ' : ''
              }`,
            };
          } else {
            return { message: 'Invalid input' };
          }
        case z.ZodIssueCode.too_big:
          if (issue.type === 'array') {
            return {
              message: `Array must contain ${
                issue.inclusive ? 'at most' : 'less than'
              } ${issue.maximum} element(s)`,
            };
          } else if (issue.type === 'string') {
            return {
              message: `String must contain ${
                issue.inclusive ? 'at most' : 'under'
              } ${issue.maximum} character(s)`,
            };
          } else if (issue.type === 'number') {
            return {
              message: `${issue.maximum}${issue.inclusive ? '以下でなければなりません' : ''}`,
            };
          } else {
            return {
              message: 'Invalid input',
            };
          }
        case z.ZodIssueCode.custom:
          return {
            message: 'Invalid input',
          };
        case z.ZodIssueCode.invalid_intersection_types:
          return {
            message: 'Intersection results could not be merged',
          };
        case z.ZodIssueCode.not_multiple_of:
          return {
            message: `Number must be a multiple of ${issue.multipleOf}`,
          };
        default:
          return { message: ctx.defaultError };
      }
    };