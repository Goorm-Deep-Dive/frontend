export default function Banner() {
  return (
    <div className="flex h-7.5 w-full items-center justify-center rounded-lg bg-[linear-gradient(to_bottom,var(--color-tab-bg-start),var(--color-tab-bg-end))]">
      <span className="label">
        가장 빠른 기한까지 <span className="text-red-400">D-N</span> 일
        남았어요.
      </span>
    </div>
  );
}
