import { JSDOM } from 'jsdom';

export const andpadJSDOM = async () => {
  const dom = new JSDOM('<!DOCTYPE html><body><p id="main">My First JSDOM!</p></body>', {
    url: 'https://andpad.jp/login',
    referrer: 'https://andpad.jp',
    pretendToBeVisual: true,
    runScripts: 'dangerously',
  });
  // This prints "My First JSDOM!"
  console.log(dom.window.document.getElementById('main')?.textContent || 'No text content');


};