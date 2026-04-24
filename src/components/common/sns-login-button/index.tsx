import Image from "next/image";

const SNS_CONFIG = {
  kakao: {
    name: "카카오 로그인",
    icon: "/icons/sns-login-button/kakao.svg",
    className: "bg-yellow-300 text-black",
  },
  naver: {
    name: "네이버 로그인",
    icon: "/icons/sns-login-button/naver.svg",
    className: "bg-green-600 text-white",
  },
  google: {
    name: "Sign in with Google",
    icon: "/icons/sns-login-button/google.svg",
    className: "bg-white text-black",
  },
} as const;

type SnsType = keyof typeof SNS_CONFIG;

interface SnsLoginButtonProps {
  sns: SnsType;
  onClick?: () => void;
}

export default function SnsLoginButton({ sns, onClick }: SnsLoginButtonProps) {
  const { name, icon, className } = SNS_CONFIG[sns];

  return (
    <button
      className={`flex w-full items-center justify-center gap-2 rounded-full py-2.5 shadow-md ${className}`}
    >
      <Image src={icon} alt={name} width={18} height={18} />
      <span className="text-sm font-semibold">{name}</span>
    </button>
  );
}
