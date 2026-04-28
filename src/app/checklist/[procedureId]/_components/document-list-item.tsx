import Link from "next/link";

interface Props {
  index: number;
  title: string;
  checked?: boolean;
  link?: string;
}
export default function DocumentListItem({
  index,
  title,
  checked,
  link,
}: Props) {
  return (
    <div className="bg-primary-bg flex rounded-xl px-5 py-2.5">
      <div className="flex gap-2.5">
        <span className="bg-primary-1 caption flex h-6 w-6 items-center justify-center rounded-full text-white">
          {index + 1}
        </span>
        <span className="h4 text-gray-900">{title}</span>
        <input type="checkbox" checked={checked} />
      </div>

      <Link href="#" target="_blank" className="ml-auto">
        발급처 알아보기 {">"}
      </Link>
    </div>
  );
}
