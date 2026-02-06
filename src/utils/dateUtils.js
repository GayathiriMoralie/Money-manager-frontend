export const isSameWeek = (date) => {
  const now = new Date();
  const start = new Date(now.setDate(now.getDate() - now.getDay()));
  const end = new Date(now.setDate(now.getDate() - now.getDay() + 6));
  return date >= start && date <= end;
};

export const isSameMonth = (date) => {
  const now = new Date();
  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
};

export const isSameYear = (date) => {
  const now = new Date();
  return date.getFullYear() === now.getFullYear();
};
