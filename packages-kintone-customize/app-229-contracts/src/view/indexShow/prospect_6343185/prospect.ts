import { getProjectGroupByStores } from "./getProjectGroupByStores"

export const prospect = async () => {
    // 工事内容の取得
    const projectGroupByStore = await getProjectGroupByStores();
    // 契約一覧の取得
    // グループさせる
    // 1.店舗
    // 2.工事種別
    // 3.契約の有無（無いものだけ一覧に表示させる）
    // 一覧に表示させる（工事内容に契約予定金額が入っていればそれを表示させる）

}