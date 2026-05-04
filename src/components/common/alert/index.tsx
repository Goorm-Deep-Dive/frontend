import { Button } from "@/components/ui/button";
import Image from "next/image";

interface AlertButton {
  variant: "primary" | "secondary";
  label: string;
  onClick: () => void;
}

interface AlertProps {
  icon?: React.ReactNode;
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  onClose: () => void;
  buttons: AlertButton[];
}

export default function Alert({
  icon,
  title,
  description,
  onClose,
  buttons,
}: AlertProps) {
  return (
    <div className="relative w-[350px] rounded-xl border border-black bg-white">
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
          {icon && (
            <div className="flex items-center justify-center">{icon}</div>
          )}
          <h2 className="h2 text-primary-1">{title}</h2>
          <span className="body text-gray-700">{description}</span>
        </div>
        <div className="flex justify-center gap-5">
          {buttons.map((button) => (
            <Button
              key={button.label}
              variant={button.variant}
              onClick={() => {
                button.onClick();
                onClose();
              }}
              rounded
              size="small"
              className="h-10"
            >
              {button.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
