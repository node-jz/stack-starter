import { getTimeZones } from '@vvo/tzdb';
export type TimeZone = {
  alternativeName: string;
  abbreviation: string;
  continentName: string;
};

export const getBrowserTimeZone = () => {
  const timezones = getTimeZones();
  const timeZoneQuery = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return timezones.find((tz) => {
    return timeZoneQuery === tz.name || tz.group.includes(timeZoneQuery);
  });
};
