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
  priority?: string;
  isEditMode?: boolean;
}

export default function ChecklistSection({
  procedureId,
  userProcedureChecklistId,
  title,
  index,
  listDate,
  isDone,
  priority,
  isEditMode = false,
}: ChecklistSectionProps) {
  return (
    <ChecklistList
      procedureId={procedureId}
      userProcedureChecklistId={userProcedureChecklistId}
      title={title}
      index={index}
      listDate={listDate}
      isDone={isDone}
      priority={priority}
      isEditMode={isEditMode}
    />
  );
}
