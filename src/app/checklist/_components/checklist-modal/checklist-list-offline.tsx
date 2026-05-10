interface ChecklistListOfflineProps {
  title: string;
  description: string;
}

export default function ChecklistListOffline({
  title,
  description,
}: ChecklistListOfflineProps) {
  return (
    <div className="h4 flex flex-col gap-2.5 text-gray-900">
      <span className="pl-2.5">{title}</span>
      <div className="bg-beige flex items-center justify-center gap-2.5 rounded-lg p-4">
        <span>{description}</span>
      </div>
    </div>
  );
}
