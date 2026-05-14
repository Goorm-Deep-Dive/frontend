type ChatDateDividerProps = {
  label: string;
};

const ChatDateDivider = ({ label }: ChatDateDividerProps) => {
  return (
    <div className="flex items-center gap-3 py-2" aria-hidden>
      <span className="h-px flex-1 bg-gray-300" />
      <span className="caption text-gray-500">{label}</span>
      <span className="h-px flex-1 bg-gray-300" />
    </div>
  );
};

export default ChatDateDivider;
