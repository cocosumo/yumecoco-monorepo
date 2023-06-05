import { notifyAdmin } from 'libs/src/notifyAdmin';
import { getMembers } from '../@get/getMembers';
import { addMembers, deleteMembers } from '../@post';
import { getEmployeesByIds } from 'api-kintone';
import { AndpadErrors } from 'types';

/**
 * addMembersとdeleteMembersをまとめたもの。
 * 
 * 管理者メンバーのみ対象。
 * 
 * @param param
 * @param param.systemId
 * @param param.members
 * @param param.idType
 */
export const addDelMembers = async ({
  systemId,
  members,
}: {
  systemId: string,
  members: string[],
}) => {
  const currMembers = await getMembers({ systemId });

  const currMembersIds = currMembers?.data
    .filter((member) => member.role === 'admin' && member?.common_id)
    .map((member) => member.common_id as string);

  console.log('currMembersIds', currMembersIds);

  const membersToDel = currMembersIds
    .filter(
      (currMember) => !members.includes(currMember),
    );

  const membersToAdd = members
    .filter(
      (member) => !currMembersIds.includes(member),
    );

  console.log('membersToDel', membersToDel);
  console.log('membersToAdd', membersToAdd);

  if (membersToDel.length) {
    // Delete members
    const delResult = await deleteMembers({ systemId, members: membersToDel });
    console.log('Deleted members', delResult);
  }

  if (membersToAdd.length) {
    // Add members
    const addResult = await addMembers({ systemId, members: membersToAdd });

    if (addResult && ('errors' in addResult)) {
      const employeeId = (addResult.errors as AndpadErrors)?.[0]?.item?.key as string;
      if (employeeId) {
        const { records } = await getEmployeesByIds([employeeId]);
        const {
          文字列＿氏名: empName,
        } = records?.[0] || {};
        await notifyAdmin(`Andpadに登録していない社員番号が含まれています。 ${empName.value} : ${JSON.stringify(addResult.errors)}`);
      } else {
        await notifyAdmin(`${addDelMembers} エラーが発生しました。${JSON.stringify(addResult.errors)}` );
      }

    }
    console.log('Added members', addResult);
  }

  return {
    success: true,
  };

};