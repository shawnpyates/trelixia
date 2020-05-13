import dayjs from 'dayjs';

const replaceDateString = (date) => {
  if (dayjs().isSame(dayjs(date), 'day')) {
    return 'Today';
  }
  if (dayjs().add(1, 'day').isSame(dayjs(date), 'day')) {
    return 'Tomorrow';
  }
  return null;
};

export const formatDate = (date) => {
  const dateString = replaceDateString(date) || dayjs(date).format('MMM D, YYYY');
  const timeString = dayjs(date).format('h:mm a');
  return `${dateString} at ${timeString}`;
};

export const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
