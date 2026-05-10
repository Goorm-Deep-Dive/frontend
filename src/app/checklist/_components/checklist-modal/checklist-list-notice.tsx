interface ChecklistListNoticeProps {
  title: string;
  description: string;
}

export default function ChecklistListNotice({
  title,
  description,
}: ChecklistListNoticeProps) {
  return (
    <div className="h4 flex flex-col gap-2.5 text-gray-900">
      <span className="pl-2.5">{title}</span>
      <div className="bg-beige rounded-lg border-2 border-gray-300 px-10 py-2.5">
        <span>{description}</span>
      </div>
    </div>
  );
}
