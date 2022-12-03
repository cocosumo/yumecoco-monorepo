/**
 * なぜ：
 * 
 * 例： 2.555 --> 2.56 // ほしい値
 * 
 * 22.555.toFixed(2) // 22.55 ×
 * 22.555.toPrecision(2) // 23 ×
 * Math.round(22.555) // 23 ×
 * 
 * 長くなりますが、小数点に正確さが必要で、追加しました。
 * それ以外、出来るだけ通常の関数かライブラリーを利用します。
 * 
 * ざっくりなので、もし、よりいいやり方ありましたら、以下の編集し、roundTo.test.tsでテストください。
 *  
 */
export const roundTo = (value: number, precision = 0) =>  Number(Math.round(Number(`${value}e${precision}`)) + 'e-' + precision);