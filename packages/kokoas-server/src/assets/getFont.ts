import path from 'path';

export const getFont = (font = 'MSMINCHO.ttf') => {
  return path.join(__dirname, 'fonts', font);
};