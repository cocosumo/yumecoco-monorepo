import { Page } from 'puppeteer';


/**
 * Download a text based file from a page.
 * This is a general file downloader. Enhance when needed ~ ras 20230705.
 * 
 * @param page 
 * @param requestUrl 
 * @return arrayBuffer
 */
export const downloadFile = async (
  page: Page, 
  requestUrl: string,
) => {
  const result = await page.evaluate(
    async (passedRequestUrl) => {
      console.log(`Downloading file from ${passedRequestUrl}`);
      
      const fetchedResult = await fetch(
        passedRequestUrl,
        {
          method: 'GET',
          credentials: 'include',
        },
      )
        .then((res) => res.blob())
        .then((blob) => {
          // DevTools protocol can't reliably transfer arrayBuffers or blobs, so transform them to string first.
          // See Issue: https://github.com/puppeteer/puppeteer/issues/3722
          const reader = new FileReader();
          reader.readAsBinaryString(blob);
          
          return new Promise((resolve, reject) => {
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = () => reject('Error while reading file.');
          });
        });

      return fetchedResult;
    }, 
    requestUrl,
  );

  return result as string;
};