import userStore from '$lib/stores/user.store';
import { DateTime, Interval } from 'luxon';
import { get } from 'svelte/store';

function formatBasicDateTime(timestamp: string, timezone = ''): string {
  if (timezone == '') {
    timezone = get(userStore).user?.timezone ?? 'America/New_York';
  }
  return DateTime.fromISO(timestamp).setZone(timezone).toFormat('LLL dd, yyyy @ hh:mm');
}

function formatBasicDate(timestamp: string): string {
  return DateTime.fromISO(timestamp).toFormat('LLLL dd, yyyy');
}

function daysAgo(timestamp: string): string {
  return Math.floor(Math.abs(DateTime.fromISO(timestamp).diffNow('days').days)).toString();
}

function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
function semanticDiff(dateTime1: string, dateTime2: string) {
  // Ensure dateTime1 is the earlier and dateTime2 is the later date
  const start = DateTime.fromISO(dateTime1).toUTC();
  const end = DateTime.fromISO(dateTime2).toUTC();
  const interval = Interval.fromDateTimes(start, end);
  const diff = interval.toDuration(['days', 'hours', 'minutes']);

  // Determine the largest unit of time to display
  if (diff.days >= 1) {
    return `${Math.floor(diff.days)} day${diff.days > 1 ? 's' : ''}`;
  } else if (diff.hours >= 1) {
    return `${Math.floor(diff.hours)} hour${diff.hours > 1 ? 's' : ''}`;
  } else if (diff.minutes >= 1) {
    return `${Math.floor(diff.minutes)} minute${diff.minutes > 1 ? 's' : ''}`;
  } else {
    return 'Less than a minute';
  }
}
export const formatters = {
  formatBasicDateTime,
  formatBasicDate,
  daysAgo,
  formatTime,
  semanticDiff,
};
