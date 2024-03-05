import { describe, it, expect } from '@jest/globals';
import { getAlertTarget } from './getAlertTarget';
import { getEmployees, getUnissuedInvoiceAlertsByProjId } from 'api-kintone';
import path from 'path';
import fs from 'fs';
import { IUnissuedinvoicealert } from 'types';
import { produce } from 'immer';
import { chatworkRooms } from '../../../../config';



describe('getAlertTarget', () => {
  // set output file of createInvoiceAlert.test.ts
  const remindersPath = path.join(__dirname, '../../__TEST__/reminders.json');
  const remindersDat = JSON.parse(fs.readFileSync(remindersPath, 'utf8')) as IUnissuedinvoicealert[];

  it('担当者とアラート対象未設定時にグループチャットを通知先に設定する', async () => {
    const recEmployees = await getEmployees();

    const reminderDat = produce(remindersDat[0], draft => {
      draft.notificationSettings.value = [{
        'id': '',
        'value': {
          'chatworkRoomId': {
            'type': 'SINGLE_LINE_TEXT',
            'value': '',
          },
          'alertTargetId': {
            'type': 'SINGLE_LINE_TEXT',
            'value': '',
          },
          'alertTargetName': {
            'type': 'SINGLE_LINE_TEXT',
            'value': '',
          },
        },
      }];
      draft.cocoAGs.value = '';
    });

    const result = getAlertTarget({
      recEmployees,
      recReminder: reminderDat,
    });

    expect(result[0].agName).toBe('');
    expect(result[0].cwRoomId).toBe(chatworkRooms.cocoasGroup);
    expect(result.length).toBe(1);

  }, 10000);

  
  it('アラート対象未設定時に担当者から通知先を設定する', async () => {
    const recEmployees = await getEmployees();

    const reminderDat = produce(remindersDat[0], draft => {
      draft.notificationSettings.value = [{
        'id': '',
        'value': {
          'chatworkRoomId': {
            'type': 'SINGLE_LINE_TEXT',
            'value': '',
          },
          'alertTargetId': {
            'type': 'SINGLE_LINE_TEXT',
            'value': '',
          },
          'alertTargetName': {
            'type': 'SINGLE_LINE_TEXT',
            'value': '',
          },
        },
      }];
      draft.cocoAGs.value = 'ここすもシステム';
    });

    const result = getAlertTarget({
      recEmployees,
      recReminder: reminderDat,
    });

    expect(result[0].agName).toBe('ここすもシステム');
    expect(result[0].cwRoomId).toBe(chatworkRooms.testRoom);
    expect(result.length).toBe(1);

  }, 10000);

  it('アラート対象未設定時に担当者から通知先を設定する', async () => {
    const recEmployees = await getEmployees();

    const reminderDat = await getUnissuedInvoiceAlertsByProjId('e777ec83-ea81-470e-ac31-d26e159362ae');

    const result = getAlertTarget({
      recEmployees,
      recReminder: reminderDat[0],
    });

    expect(result.length).toBe(1);

  }, 10000);
});
