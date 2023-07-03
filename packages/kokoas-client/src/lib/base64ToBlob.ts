/**
 * 
 * @param base64 
 * @param type 
 * @deprecated use `base64ToBlob` from `libs` instead 
 */
export function base64ToBlob( base64 : string, type = 'application/octet-stream' ) {
  const binStr = window.atob( base64 );
  const len = binStr.length;
  const arr = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    arr[ i ] = binStr.charCodeAt( i );
  }
  return new Blob( [ arr ], { type: type } );
}