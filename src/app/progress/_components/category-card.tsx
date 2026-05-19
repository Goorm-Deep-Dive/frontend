import ProgressBar from "@/components/common/progress-bar";
import ChartDocumentIcon from "@/components/icons/chart-document-icon";
import ChartDocumentCourtNoticeIcon from "@/components/icons/chart-document-court-notice-icon";
import ChartDocumentDigitalIcon from "@/components/icons/chart-document-digital-icon";
import ChartDocumentFinanceIcon from "@/components/icons/chart-document-finance-icon";

function getIcon(name: string) {
  switch (name) {
    case "사무행정":
      return <ChartDocumentIcon className="h-6 w-6" />;
    case "금융":
      return <ChartDocumentFinanceIcon className="h-6 w-6" />;
    case "디지털":
      return <ChartDocumentDigitalIcon className="h-6 w-6" />;
    case "법원행정":
      return <ChartDocumentCourtNoticeIcon className="h-6 w-6" />;
  }
}

function getColor(name: string) {
  switch (name) {
    case "사무행정":
      return "bg-tag-office";
    case "금융":
      return "bg-tag-digital";
    case "디지털":
      return "bg-tag-finance";
    case "법원행정":
      return "bg-tag-court";
    default:
      return "bg-primary-1";
  }
}

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
          {getIcon(name)}
          <span className="h4">{name}</span>
        </div>

        <span className="other2 text-gray-700">
          {completedCount}/{totalCount} 완료
        </span>
      </div>
      <ProgressBar value={progressRate} indicatorClassName={getColor(name)} />
    </button>
  );
}
