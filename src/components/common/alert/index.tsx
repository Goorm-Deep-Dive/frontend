import { cn } from "@/lib/cn";
import Image from "next/image";

interface AlertButton {
  variant: "primary" | "secondary";
  label: string;
  onClick: () => void;
}

interface AlertProps {
  title: string | React.ReactNode;
  description: string;
  onClose: () => void;
  buttons: AlertButton[];
}

export default function Alert({
  title,
  description,
  onClose,
  buttons,
}: AlertProps) {
  return (
    <div className="relative h-[236px] w-[350px] rounded-xl border border-black bg-white">
      <button className="absolute top-4 right-4" onClick={onClose}>
        <Image
          src="/icons/alert/close.svg"
          alt="close"
          width={30}
          height={30}
        />
      </button>
      <div className="flex flex-col items-center gap-5 py-10">
        <div className="flex flex-col items-center gap-2.5">
          <h2 className="h2 text-primary-1">{title}</h2>
          <span className="body text-gray-700">{description}</span>
        </div>
        <div className="flex justify-center gap-5">
          {buttons.map((button) => (
            <button
              key={button.label}
              className={cn(
                "h4 rounded-2xl px-5 py-1.5",
                button.variant === "primary"
                  ? "bg-primary-1 text-white"
                  : "bg-gray-700 text-white",
              )}
              onClick={button.onClick}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
