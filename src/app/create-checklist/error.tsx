"use client";

export default function CreateChecklistError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 p-6">
      <p className="body text-red-600">설문을 불러오지 못했습니다.</p>
      <button
        type="button"
        className="body w-fit rounded-lg border border-gray-300 px-4 py-2"
        onClick={() => reset()}
      >
        다시 시도
      </button>
    </div>
  );
}
