import { cn } from "@/lib/cn";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function BottomCTA({ children, className }: Props) {
  return (
    <>
      <div aria-hidden className="h-37.5 min-h-37.5" />
      <div
        className={cn(
          "fixed right-0 bottom-0 left-0 z-40 mx-auto flex h-37.5 max-w-(--app-max-width) flex-col items-center justify-center gap-2.5 rounded-tl-2xl rounded-tr-2xl bg-gray-200 px-5 pt-5 pb-[calc(env(safe-area-inset-bottom)+20px)]",
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}
