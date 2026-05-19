import ChecklistList from "./checklist-list";

interface ChecklistSectionProps {
  subTitle?: string;
  children?: React.ReactNode;
  onToggle?: () => void;

  procedureId: number;
  userProcedureChecklistId: number;
  title: string;
  index: number;
  listDate?: number; // D-30
  isDone?: boolean;
  isClicked?: boolean;
  onClick?: () => void;
}

export default function ChecklistSection({
  subTitle,
  children,
  onToggle,

  procedureId,
  userProcedureChecklistId,
  title,
  index,
  listDate,
  isDone,
  isClicked,
  onClick,
}: ChecklistSectionProps) {
  return (
    <>
      <ChecklistList
        procedureId={procedureId}
        userProcedureChecklistId={userProcedureChecklistId}
        title={title}
        index={index}
        listDate={listDate}
        isDone={isDone}
      />
    </>
  );
}
