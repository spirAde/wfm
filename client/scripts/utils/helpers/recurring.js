import moment from 'moment';

import findIndex from 'lodash/findIndex';
import find from 'lodash/find';
import flatten from 'lodash/flatten';
import map from 'lodash/map';

import { matchStrict } from '../match';

import { dayOptions } from '../options';

const MOMENT_FORMAT = 'MM/DD/YYYY';

export function getClosestRecurringDate(periodicity, day) {
  if (!periodicity || !day) return '';

  const currentMoment = moment();

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  let date = '';

  if (daysOfWeek.includes(day)) {
    const currentDayIndex = currentMoment.day() - 1;
    const selectedDayIndex = daysOfWeek.indexOf(day);

    if (currentDayIndex === selectedDayIndex) {
      date = currentMoment;
    } else if (currentDayIndex < selectedDayIndex) {
      date = currentMoment.add(selectedDayIndex - currentDayIndex, 'days');
    } else {
      date = currentMoment.add(1, 'weeks').subtract(currentDayIndex - selectedDayIndex, 'days');
    }
  } else {
    const currentDate = currentMoment.date();
    const periodIndex = findIndex(dayOptions.monthly, option => option.value === day);

    const needFirstDay = periodIndex === 0;
    const needMiddleDay = periodIndex === 1;
    const needLastDay = periodIndex === 2;

    if (needFirstDay) {
      if (currentDate === 1) {
        date = currentMoment;
      } else {
        date = currentMoment.add(1, 'months').startOf('month');
      }
    } else if (needMiddleDay) {
      if (currentDate === 15) {
        date = currentMoment;
      } else if (currentDate < 15) {
        date = currentMoment.add(15 - currentDate, 'days');
      } else {
        date = currentMoment.add(1, 'months').date(15);
      }
    } else if (needLastDay) {
      if (currentDate === currentMoment.endOf('month').day()) {
        date = currentMoment;
      } else {
        date = currentMoment.endOf('month');
      }

      // if last day is weekend, then shift date on Friday
      if (date.day() === 0) {
        date.subtract(2, 'days');
      } else if (date.day() === 6) {
        date.subtract(1, 'days');
      }
    }
  }

  return date.format(MOMENT_FORMAT);
}

export function getPeriodicityText(periodicity, day) {
  if (!periodicity || !day) return '';

  const periodicityText = matchStrict(periodicity, {
    weekly: 'every week',
    biweekly: 'every other week',
    monthly: 'every month',
  }, '');

  const dayText = find(dayOptions[periodicity], row => row.value === day) || {};

  return `${dayText.label} of ${periodicityText}`;
}

export function getClosestRecurringTransactions(groups, count = 3, accountId = null) {
  const recurringGroups = accountId
    ? groups.filter(group => parseInt(group.account_id, 10) === parseInt(accountId, 10))
    : groups;

  const allRecurringTransactions = flatten(map(recurringGroups, 'upcoming_transactions'));
  const activeTransactions = allRecurringTransactions.filter(
    transaction => transaction.status === 'active',
    transaction => transaction.status === 'active',
  );
  const sortedByDate = activeTransactions.sort(
    (prev, next) => new Date(next.date) - new Date(prev.date),
  );

  const chunkTransactions = sortedByDate.slice(sortedByDate.length - count);

  return chunkTransactions.map((closestTransaction) => {
    const group = find(groups, groupItem => find(
      groupItem.upcoming_transactions,
      transaction => transaction.id === closestTransaction.id,
    ));

    return Object.assign(closestTransaction, {
      recurring_transaction_group_id: group.id,
    });
  });
}
