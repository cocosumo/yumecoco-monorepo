import { TEnvelopeStatus } from 'types';

export const jaEnvelopeStatus  = (
  status: string,
) : {
  ja: string,
  desc: string,
} => {
  switch (status as TEnvelopeStatus) {
    case 'created':
      return {
        ja: '下書き',
        desc: '受信者は下書き状態です。 これは、下書きエンベロープ（作成済みステータスのエンベロープ）にのみ関連付けられます。',
      };
    case 'sent':
      return {
        ja: '送信済み',
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
    case 'voided':
      return {
        ja: '無効化',
        desc: '無効化',
      };
    case 'voiding':
      return {
        ja: '無効化中',
        desc: '無効化中です。',
      };
    case 'correct' : {
      return {
        ja: '修正',
        desc: '送信者が訂正のために封筒を開封しました。このステータスの封筒には署名プロセスが停止されます',
      };
    }
    case '': {
      return {
        ja: '未処理',
        desc: '契約はDocusign上でまだ作成していません。',
      };
    }
    default: {
      return {
        ja: status,
        desc: '未定義のステータスです。管理者へお問い合わせください。',
      };
    }
  }
};