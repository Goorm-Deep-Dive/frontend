export const getBadgeLabel = (dueDateType?: string) => {
  switch (dueDateType) {
    case "IMMEDIATE":
      return "긴급";
    case "NONE":
      return "빠른처리";
    case "완료":
      return "완료";
    default:
      return undefined;
  }
};

/** remainingDays > 0 → D-xxx, remainingDays === 0 → D-day */
export const getRemainingDaysLabel = (remainingDays?: number) => {
  if (typeof remainingDays !== "number") return undefined;
  if (remainingDays > 0) return `D-${remainingDays}`;
  if (remainingDays === 0) return "D-DAY";

  return `D+${Math.abs(remainingDays)}`;
};
