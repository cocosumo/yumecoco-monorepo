import { Stack } from '@mui/material';
import { IProjects } from 'types';
import { useMemo } from 'react';
import { addressBuilder, formatDataId, postalBuilder } from 'libs';
import { IDetail } from 'kokoas-client/src/pages/projSearch/types';
import { DetailSection } from '../common/DetailSection';
import { parseISOTimeToFormat } from 'kokoas-client/src/lib';
import { EditButton } from '../common/EditButton';
import { pages } from 'kokoas-client/src/pages/Router';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { AndpadDetails } from './AndpadDetails';
import { OfficerDetails } from './OfficerDetails';

const Address = ({
  postal,
  address,
}: {
  postal: string,
  address: string,
}) => {
  return (
    <>
      {postal && (
        <div>
          {postal}
        </div>)}
      {address || '-'}
    </>
  );
};

const Memo = (({
  value,
}: {
  value: string,
}) => {
  const splitVal = value.split('\n');
  return (
    <>
      {splitVal.map((line, index) => (
        <div key={`remarks-${line}`}>
          {line}
          {index < (splitVal.length - 1) && <br />}
        </div>
      ))}
    </>);
});


export const ProjectDetails = ({
  recProj,
}: {
  recProj: IProjects
}) => {


  const details = useMemo(() => {

    const {
      postal,
      address1,
      address2,

      finalPostal,
      finalAddress1,
      finalAddress2,

      buildingType,
      projTypeName,
      projName,
      cancelStatus,
      dataId,
      log,

      uuid: projId,

      作成日時: createDate,
      更新日時: updateDate,
      作成者: createdBy,
      更新者: updatedBy,
      memo,
      // status, 廃止　（追客中など） 

      deliveryDate,
      projFinDate,
      payFinDate,
    } = recProj;

    const projDates: IDetail[] = [
      {
        label: '引渡日',
        value: deliveryDate.value || '-',
      },
      {
        label: '物件完了日',
        value: projFinDate.value || '-',
      },
      {
        label: '支払完了日',
        value: payFinDate.value || '-',
      },
    ];

    const mainDetails: IDetail[] = [
      {
        label: '工事番号',
        value: formatDataId(dataId.value),
      },
      {
        label: '工事種別',
        value: projTypeName.value,
      },
      {
        label: '工事名',
        value: projName.value,
      },
      {
        label: '住所',
        value: (
          <Address
            postal={postalBuilder(postal.value)}
            address={addressBuilder({
              address1: address1.value,
              address2: address2.value,
            })}
          />
        ),
      },

      {
        label: '確定住所',
        value: (
          <Address
            postal={postalBuilder(finalPostal.value)}
            address={addressBuilder({
              address1: finalAddress1.value,
              address2: finalAddress2.value,
            })}
          />
        ),
      },
      {
        label: '建物種別',
        value: buildingType.value,
      },
      {
        label: '備考',
        value: (<Memo value={memo.value || '-'} />),
      },
    ];


    const otherDetails: IDetail[] = [
      {
        label: 'ステータス',
        value: cancelStatus.value
          .split(',')
          .filter(Boolean) // There are empty strings in the array
          .join(',') || '有効',
      },
      {
        label: '作成日時',
        value: parseISOTimeToFormat(createDate.value),
      },
      {
        label: '更新日時',
        value: parseISOTimeToFormat(updateDate.value),
      },
      {
        label: '作成者',
        value: createdBy.value.name,
      },
      {
        label: '更新者',
        value: updatedBy.value.name,
      },
      {
        label: '工事ID',
        value: projId.value,
      },
    ];

    const logDetails: IDetail[] = log.value.map(({
      id,
      value: {
        logDateTime,
        logNote,
      },
    }) => ({
      key: id,
      label: parseISOTimeToFormat(logDateTime.value),
      value: logNote.value,
    }));


    return {
      projDates,
      mainDetails,
      otherDetails,
      logDetails,
    };

  }, [
    recProj,
  ]);

  return (
    <Stack
      spacing={2}
      p={2}
      sx={{
        height: '100%',
        overflowY: 'auto',
      }}
    >

      <EditButton
        href={`${pages.projEditV2}?${generateParams({
          projId: recProj.uuid.value,
        })}`}
        title='工事情報を編集する'
      />

      <DetailSection
        title="工事日程"
        details={details.projDates}
      />

      <AndpadDetails recProj={recProj} />

      <DetailSection
        title="工事情報"
        details={details.mainDetails}
      />

      <OfficerDetails recProj={recProj} />


      <DetailSection
        title="ANDPAD登録ログ"
        details={details.logDetails}
      />

      <DetailSection
        title="管理用"
        details={details.otherDetails}
        isSubtle
      />




    </Stack>
  );
};