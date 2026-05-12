import type { Metadata, Viewport } from "next";
import "./globals.css";
import QueryClientProvider from "@/app/_providers/query-client-provider";
import { pretendard } from "@/styles/fonts";
import AlertRenderer from "@/components/common/alert/alert-renderer";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),

  title: "동행",
  description: "장례 이후 행정 절차를 함께하는 서비스",

  icons: {
    icon: "/icons/donghaeng_favicon.svg",
  },

  openGraph: {
    title: "동행",
    description: "장례 이후 행정 절차를 함께하는 서비스",
    images: [
      {
        url: "/icons/donghaengOg.png",
        width: 1200,
        height: 630,
        alt: "동행 오픈그래프 이미지",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full`}>
      <body className="flex h-dvh max-h-dvh min-h-0 w-full flex-col overflow-hidden bg-black font-sans antialiased">
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />

            <Script id="google-analytics" strategy="afterInteractive">
              {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;

        gtag('js', new Date());

        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
      `}
            </Script>
          </>
        )}
        <QueryClientProvider>
          <div className="mx-auto flex min-h-0 w-full max-w-(--app-max-width) flex-1 flex-col overflow-hidden bg-white">
            <main className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto overscroll-y-contain bg-white [-webkit-overflow-scrolling:touch]">
              <div className="flex min-h-full w-full flex-1 flex-col bg-white">
                {children}
              </div>
            </main>
          </div>
        </QueryClientProvider>
        <AlertRenderer />
      </body>
    </html>
  );
}
