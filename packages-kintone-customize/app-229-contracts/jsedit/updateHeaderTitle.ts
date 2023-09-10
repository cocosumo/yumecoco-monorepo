import $ from 'jquery';

export function updateHeaderTitle() {
  const selectedStoreName = $('#selectStore option:selected').text(); // 選択された店舗名を取得
  const selectedMonth = $('#selectMonth option:selected').text()
    .replace('月', ''); // 選択された月を取得
  const headerTitle = `ここすも ${selectedStoreName} ${selectedMonth}月契約一覧表`;
          
  $('#headerTitle').text(headerTitle); // 新しいタイトルを「headerTitle」に設定
}
