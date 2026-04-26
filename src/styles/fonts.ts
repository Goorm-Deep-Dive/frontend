import localFont from "next/font/local";

export const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
  declarations: [{ prop: "unicode-range", value: "U+0000-00FF, U+AC00-D7AF" }],
});
