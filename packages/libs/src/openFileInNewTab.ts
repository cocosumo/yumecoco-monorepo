import { base64ToBlob } from './base64ToBlob';

export const openFileInNewTab = ({
  fileData,
  fileType = 'application/octet-stream',
  fileName,
}: {
  fileData: string | ArrayBuffer;
  fileType?: string;
  fileName: string;
}) => {
  let url: string;

  if (typeof fileData === 'string') {
    const binaryFile = base64ToBlob({
      fileData,
      fileType,
      fileName,
    });
    url = URL.createObjectURL(binaryFile);
    
  } else {

    const blob = new Blob( [ fileData ], { type: fileType } );
    url = URL.createObjectURL(blob);
  } 

  window.open(url, '_blank');

};