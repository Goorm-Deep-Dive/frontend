import { PcCase } from "lucide-react";
import ProgressBar from "@/components/common/progress-bar";

interface Props {
  name: string;
  completedCount: number;
  totalCount: number;
  progressRate: number;
}
export default function CategoryCard({
  name,
  completedCount,
  totalCount,
  progressRate,
}: Props) {
  return (
    <button className="bg-tab-bg flex flex-col gap-2 rounded-md px-2.5 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-1.5">
          <PcCase />
          <span className="h4">{name}</span>
        </div>

        <span className="other2 text-gray-700">
          {completedCount}/{totalCount} 완료
        </span>
      </div>
      <ProgressBar value={progressRate} />
    </button>
  );
}
