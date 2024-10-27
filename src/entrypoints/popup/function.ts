import { differenceInDays } from 'date-fns';

const diffString = (days: number): string => {
  const str = (() => {
    switch (days) {
      case 7:
        return '1週間';
      case 14:
        return '2週間';
      default:
        return `${days}日`;
    }
  })();
  return str;
};

export const getTabElapsedTime = (from: number, to: number): string => {
  const diffDays = differenceInDays(new Date(from), new Date(to));
  return diffString(diffDays);
};
