export const jaEnvelopeStatus  = (
  status: TEnvelopeStatus,
) : {
  ja: string,
  desc: string,
} => {
  switch (status) {
    case 'sent':
      return {
        ja: '送済み',
        desc: '封筒へのリンクが記載された電子メール通知が少なくとも1人の受信者に送信されました。 エンベロープは、すべての受信者が少なくともそれを表示するまで、この状態のままになります。',
      };
    case 'delivered':
      return {
        ja: '全員開封済み',
        desc: 'すべての受信者は、DocuSign署名Webサイトを介して封筒に入れられたドキュメントを表示しました。 これは、封筒に入れられたドキュメントの電子メール配信ではありません。',
      };
    case 'completed':
      return {
        ja: '完了',
        desc: '封筒はすべての受信者によって完成されました。',
      };
    case '': {
      return {
        ja: '下書き',
        desc: '封筒はドラフト状態であり、署名のために発送されていません。',
      };
    }
  }
};