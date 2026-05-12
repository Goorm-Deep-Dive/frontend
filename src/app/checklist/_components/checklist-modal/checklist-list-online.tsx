import LinkIcon from "@/components/icons/link-icon";

interface ChecklistListOnlineProps {
  title: string;
  description: string;
}

export default function ChecklistListOnline({
  title,
  description,
}: ChecklistListOnlineProps) {
  return (
    <div className="h4 flex flex-col gap-2.5 text-gray-900">
      <span className="pl-2.5">{title}</span>
      <div className="bg-primary-bg flex items-center justify-center gap-2.5 rounded-[3rem] p-4">
        <LinkIcon width={24} height={24} />
        <span>
          {description} <span className="text-sementic-info">신청하기</span>
        </span>
      </div>
    </div>
  );
}
