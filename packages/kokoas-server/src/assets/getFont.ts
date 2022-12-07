import path from 'path';

export const getFont = (font = 'MSMINCHO.TTF') => {
  return path.join(__dirname, 'fonts', font);
};