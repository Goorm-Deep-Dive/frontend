import OrganizationIcon from "@/components/icons/organization-icon";
import SearchIcon from "@/components/icons/search-icon";

interface ChecklistListAddressProps {
  title: string;
  description: string;
}

export default function ChecklistListAddress({
  title,
  description,
}: ChecklistListAddressProps) {
  return (
    <div className="h4 flex flex-col gap-2.5 text-gray-900">
      <span className="pl-2.5">{title}</span>
      <div className="bg-beige flex items-center justify-center gap-2.5 rounded-lg p-4">
        <OrganizationIcon width={24} height={24} />
        <span>{description}</span>
      </div>
      <div className="relative">
        <SearchIcon
          width={22}
          height={22}
          className="absolute top-1/2 right-5 -translate-y-1/2"
        />
        <input
          type="text"
          placeholder="주소를 입력해 주세요."
          className="body w-full rounded-lg border border-gray-300 px-5 py-4 text-gray-500"
        />
      </div>
    </div>
  );
}
