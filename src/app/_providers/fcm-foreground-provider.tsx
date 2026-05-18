"use client";

import FcmForegroundBanner from "@/components/common/fcm-foreground-banner";
import { useFcmBootstrap } from "@/hooks/use-fcm-bootstrap";
import { useFcmForegroundMessages } from "@/hooks/use-fcm-foreground-messages";

const FcmForegroundProvider = ({ children }: { children: React.ReactNode }) => {
  useFcmBootstrap();
  useFcmForegroundMessages();

  return (
    <>
      {children}
      <FcmForegroundBanner />
    </>
  );
};

export default FcmForegroundProvider;
