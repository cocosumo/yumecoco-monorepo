export function base64ToBlob( 
  base64 : string, 
  type = 'application/octet-stream', 
  fileName = '書類.pdf', 
) {
  const binStr = window.atob( base64 );
  const len = binStr.length;
  const arr = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    arr[ i ] = binStr.charCodeAt( i );
  }
  const blob = new Blob( [ arr ], { type: type } );
  return new File([blob], fileName, { type: type });

}