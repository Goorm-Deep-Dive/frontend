import { startOfDay } from "date-fns";

type DateInputLimitOptions = {
  dateLimit?: "past" | "future";
  today?: Date;
};

const getYearBounds = (options?: DateInputLimitOptions) => {
  const today = startOfDay(options?.today ?? new Date());
  const currentYear = today.getFullYear();

  return {
    maxYear: options?.dateLimit === "past" ? currentYear : undefined,
  };
};

const isYearDigitsValid = (
  yearDigits: string,
  maxYear?: number,
): boolean => {
  if (yearDigits.length === 0) {
    return true;
  }

  if (maxYear === undefined) {
    return true;
  }

  const minPossibleYear = Number(yearDigits.padEnd(4, "0"));

  return minPossibleYear <= maxYear;
};

export const parseDateFromDigits = (
  digits: string,
  options?: DateInputLimitOptions,
): Date | null => {
  if (digits.length !== 8 || !/^\d{8}$/.test(digits)) {
    return null;
  }

  const year = Number(digits.slice(0, 4));
  const month = Number(digits.slice(4, 6));
  const day = Number(digits.slice(6, 8));
  const { maxYear } = getYearBounds(options);

  if (maxYear !== undefined && year > maxYear) {
    return null;
  }

  if (month < 1 || month > 12) {
    return null;
  }

  if (day < 1 || day > 31) {
    return null;
  }

  const parsedDate = new Date(year, month - 1, day);

  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    return null;
  }

  return parsedDate;
};

export const isPartialDateDigitsValid = (
  digits: string,
  options?: DateInputLimitOptions,
): boolean => {
  if (!/^\d*$/.test(digits) || digits.length > 8) {
    return false;
  }

  const { maxYear } = getYearBounds(options);
  const yearDigits = digits.slice(0, Math.min(4, digits.length));

  if (!isYearDigitsValid(yearDigits, maxYear)) {
    return false;
  }

  if (digits.length <= 4) {
    return true;
  }

  const monthTens = Number(digits[4]);

  if (digits.length === 5) {
    return monthTens <= 1;
  }

  const monthOnes = Number(digits[5]);

  if (digits.length === 6) {
    if (monthTens === 0) {
      return monthOnes >= 1;
    }

    if (monthTens === 1) {
      return monthOnes <= 2;
    }

    return false;
  }

  const month = Number(digits.slice(4, 6));

  if (month < 1 || month > 12) {
    return false;
  }

  const dayTens = Number(digits[6]);

  if (digits.length === 7) {
    return dayTens <= 3;
  }

  const day = Number(digits.slice(6, 8));

  if (day < 1 || day > 31) {
    return false;
  }

  return parseDateFromDigits(digits, options) !== null;
};

export const sanitizeDateDigits = (
  input: string,
  options?: DateInputLimitOptions,
): string => {
  const digits = input.replace(/\D/g, "").slice(0, 8);
  let valid = "";

  for (const digit of digits) {
    const next = valid + digit;

    if (isPartialDateDigitsValid(next, options)) {
      valid = next;
    }
  }

  return valid;
};

export const formatDateFromDigits = (digits: string): string => {
  if (digits.length < 5) {
    return digits;
  }

  if (digits.length < 7) {
    return `${digits.slice(0, 4)} - ${digits.slice(4)}`;
  }

  return `${digits.slice(0, 4)} - ${digits.slice(4, 6)} - ${digits.slice(6)}`;
};
