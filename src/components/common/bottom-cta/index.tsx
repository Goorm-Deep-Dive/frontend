import { cn } from "@/lib/cn";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function BottomCTA({ children, className }: Props) {
  return (
    <>
      <div className="h-26" />
      <div
        className={cn(
          "fixed right-0 bottom-0 left-0 z-40 mx-auto flex max-w-[var(--app-max-width)] items-center justify-center px-5 pt-5 pb-[calc(env(safe-area-inset-bottom)+20px)]",
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}
