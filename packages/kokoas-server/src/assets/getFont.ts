import path from 'path';
import fs from 'fs';
export const getFont = (font = 'MSMINCHO.ttf') => {

  const fontPath = path.join(__dirname, 'fonts', font);

  if (!fs.existsSync(fontPath)) {
    throw new Error(`Font file not found: ${fontPath}`);
  }
  
  return path.join(fontPath);
};