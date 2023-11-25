/**
 * Client-side only.
 * Downloads an ArrayBuffer as a file.
 * 
 * @param arrayBuffer - The ArrayBuffer to download.
 * @param fileName - The name of the file to be downloaded.
 * @param contentType - The content type of the file.
 */
export function downloadArrayBuffer(arrayBuffer: ArrayBuffer, fileName: string, contentType: string) {
  // Create a blob from the array buffer
  const blob = new Blob([arrayBuffer], { type: contentType });

  // Create an object URL from the blob
  const url = URL.createObjectURL(blob);

  // Create a hidden anchor element
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = fileName;

  // Append the anchor to the body
  document.body.appendChild(a);

  // Start the download
  a.click();

  // Clean up
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}