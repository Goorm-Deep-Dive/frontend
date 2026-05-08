import TellIcon from "@/components/icons/tell-icon";

interface ChecklistListCableProps {
  title: string;
  description: string;
  tel: string;
}

export default function ChecklistListCable({
  title,
  description,
  tel,
}: ChecklistListCableProps) {
  return (
    <div className="h4 flex flex-col gap-2.5 text-gray-900">
      <span className="pl-2.5">{title}</span>
      <div className="bg-primary-bg flex items-center justify-center gap-2.5 rounded-[3rem] p-4">
        <TellIcon width={24} height={24} />
        <span>
          {description} <span className="text-sementic-info">{tel}</span>
        </span>
      </div>
    </div>
  );
}
