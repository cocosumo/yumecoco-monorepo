import { APPIDS, KintoneRecord } from '../../../../api/kintone';
import { CustomerForm } from '../form';

/**
 * Copy customer group information to project details
 *
 * @param form
 */
export const updateProjDetails = async (form: CustomerForm) => {
  const { projects, customers, cocoAG1, cocoAG2, yumeAG1, yumeAG2 } = form;
  if (!projects.length) return;


  const newRecord: Partial<TypeOfProjectDetails> = {
    custGroup: {
      type: 'SUBTABLE',
      value: customers.map(c => {
        const  { id } = c;
        return {
          id: '',
          value: {
            custId: { value: id },
            custName: { value: 'auto' },
            custNameReading: { value: 'auto' },
          },
        };
      }),
    },
    custGroupAgents: {
      type: 'SUBTABLE',
      value: ([
        [cocoAG1, 'cocoAG'],
        [cocoAG2, 'cocoAG'],
        [yumeAG1, 'yumeAG'],
        [yumeAG2, 'yumeAG'],
      ] as [string, AgentType][])
        .filter(([agId]) => !!agId)
        .map(([agId, agType]) => {
          return {
            id: '',
            value: {
              custAgentId: { value: agId },
              custAgentName: { value: 'auto' },
              custAgentType: { value: agType },
            },
          };
        }),
    },
  };

  const result = await KintoneRecord.updateRecords({
    app: APPIDS.constructionDetails,
    records: projects.map(p => {
      const { projId } = p;
      return {
        id: projId,
        record: newRecord,
      };
    }),

  });

  console.log('Saving to customer group');
  return result;
};