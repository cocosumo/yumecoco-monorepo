import { getMembers } from '../@get/getMembers';
import { addMembers, deleteMembers } from '../@post';

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
  const membersToDel = currMembers?.data
    .filter((member) => member.role === 'admin' 
    && member?.common_id 
    && !members.includes(member?.common_id || ''))
    .map((member) => member.common_id as string);

  const membersToAdd = members
    .filter(
      (member) => !currMembers
        ?.data
        ?.some((currMember) => currMember.common_id === member),
    );


  if (membersToDel.length) {
    // Delete members
    const delResult = await deleteMembers({ systemId, members: membersToDel });
    console.log('Deleted members', delResult);
  }

  if (membersToAdd.length) {
    // Add members
    const addResult = await addMembers({ systemId, members: membersToAdd });
    console.log('Added members', addResult);
  }

  return {
    success: true,
  };

};