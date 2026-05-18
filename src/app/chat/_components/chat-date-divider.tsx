type ChatDateDividerProps = {
  label: string;
};

const ChatDateDivider = ({ label }: ChatDateDividerProps) => {
  return (
    <div
      role="separator"
      aria-label={`날짜: ${label}`}
      className="flex items-center gap-3 py-2"
    >
      <span className="h-px flex-1 bg-gray-300" aria-hidden />
      <span className="caption text-gray-500">{label}</span>
      <span className="h-px flex-1 bg-gray-300" aria-hidden />
    </div>
  );
};

export default ChatDateDivider;
