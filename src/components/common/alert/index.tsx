import Image from "next/image";

interface AlertProps {
  date: string; // 고인 날짜
  name: string; // 고인 이름
  description: string;
  onClose: () => void; // x 버튼
  onCancel: () => void; // 아니요
  onConfirm: () => void; // 네
}

export default function Test({
  date,
  name,
  description,
  onClose,
  onCancel,
  onConfirm,
}: AlertProps) {
  return (
    <div className="relative h-[236px] w-[350px] rounded-xl border border-black bg-white">
      <div className="flex justify-end">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <Image
            src="/icons/alert/close.svg"
            alt="close"
            width={30}
            height={30}
          />
        </button>
      </div>
      <div className="flex flex-col items-center gap-5 py-10">
        <div className="flex flex-col items-center gap-2.5">
          <h2 className="h2 text-primary-1">{date}</h2>
          <h2 className="h2 text-primary-1">
            {name} <span className="h2 text-gray-700">태그로</span>
          </h2>
          <span className="body text-gray-700">{description}</span>
        </div>
        <div className="flex justify-center gap-5">
          <button
            className="h4 rounded-2xl bg-gray-700 px-5 py-1.5"
            onClick={onCancel}
          >
            아니요
          </button>
          <button
            className="h4 flex items-center rounded-2xl bg-gray-700 px-5 py-1"
            onClick={onConfirm}
          >
            네<span className="body ml-1">(튜토리얼 확인하기)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
