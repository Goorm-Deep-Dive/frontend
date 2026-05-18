import NotificationIcon from "@/components/icons/notification-icon";

export default function CalendarHeader() {
  return (
    <div className="relative flex items-center justify-center">
      <span className="h2">일정 관리</span>
      <button className="absolute right-0">
        <NotificationIcon width={44} height={44} />
      </button>
    </div>
  );
}
