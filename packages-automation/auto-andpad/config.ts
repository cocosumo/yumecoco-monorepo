import path from 'path';
import fs from 'fs';


export const tempDir = path.join(__dirname, '__TEMP__');
export const cookiePath = path.join(tempDir, 'cookies.json');

// create temp dir if not exists
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

