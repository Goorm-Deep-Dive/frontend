import { format, isToday, isValid, parseISO } from "date-fns";

const parseNotificationDate = (value?: string) => {
  if (!value) return null;

  const parsed = parseISO(value);
  return isValid(parsed) ? parsed : null;
};

export const formatNotificationCreatedAt = (value?: string) => {
  const date = parseNotificationDate(value);
  if (!date) return "";

  if (isToday(date)) return format(date, "HH:mm");

  return format(date, "yyyy.MM.dd");
};

export const formatNotificationDueDate = (value?: string) => {
  const date = parseNotificationDate(value);
  if (!date) return "";

  return format(date, "yyyy.MM.dd");
};
