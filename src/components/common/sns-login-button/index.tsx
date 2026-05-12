import { cn } from "@/lib/cn";
import Image from "next/image";

const SNS_CONFIG = {
  kakao: {
    name: "카카오 로그인",
    icon: "/icons/kakao.svg",
    className: "bg-yellow-300 text-black",
  },
  naver: {
    name: "네이버 로그인",
    icon: "/icons/naver.svg",
    className: "bg-green-600 text-white",
  },
  google: {
    name: "구글 로그인",
    icon: "/icons/google.svg",
    className: "bg-white text-black",
  },
} as const;

type SnsType = keyof typeof SNS_CONFIG;

interface Props {
  sns: SnsType;
  onClick?: () => void;
  disabled?: boolean;
}

export default function SnsLoginButton({
  sns,
  onClick,
  disabled = false,
}: Props) {
  const { name, icon, className } = SNS_CONFIG[sns];

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-full py-2.5 shadow-md",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      <Image src={icon} alt={name} width={18} height={18} />
      <span className="h4 font-semibold">{name}</span>
    </button>
  );
}
