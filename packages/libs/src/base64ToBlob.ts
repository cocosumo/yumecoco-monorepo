export function base64ToBlob({
  fileData,
  fileType = 'application/octet-stream',
  fileName,
}: {
  fileData: string;
  fileType?: string;
  fileName: string;
}) {
  const binStr = window.atob( fileData );
  const len = binStr.length;
  const arr = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    arr[ i ] = binStr.charCodeAt( i );
  }
  const blob = new Blob( [ arr ], { type: fileType } );
  return new File([blob], fileName, { type: fileType });

}