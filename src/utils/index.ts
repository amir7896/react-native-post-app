import {formatDistanceToNowStrict} from 'date-fns';

export const formatAndAbbreviateDate = (date: Date | number): string => {
  const formattedDate = formatDistanceToNowStrict(date, {
    addSuffix: false,
    roundingMethod: 'round',
  });

  const [value, unit] = formattedDate.split(' ');

  let abbreviatedUnit = '';
  switch (unit) {
    case 'seconds':
    case 'second':
      abbreviatedUnit = 's';
      break;
    case 'minutes':
    case 'minute':
      abbreviatedUnit = 'm';
      break;
    case 'hours':
    case 'hour':
      abbreviatedUnit = 'h';
      break;
    case 'days':
    case 'day':
      abbreviatedUnit = 'd';
      break;
    case 'weeks':
    case 'week':
      abbreviatedUnit = 'w';
      break;
    case 'months':
    case 'month':
      abbreviatedUnit = 'mo';
      break;
    case 'years':
    case 'year':
      abbreviatedUnit = 'y';
      break;
    default:
      abbreviatedUnit = unit;
  }

  return `${value}${abbreviatedUnit}`;
};
