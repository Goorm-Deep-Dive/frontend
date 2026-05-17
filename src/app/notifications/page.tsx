import Header from "@/components/common/header";

import Content from "./_components/content";

export const dynamic = "force-dynamic";

export default function NotificationsPage() {
  return (
    <>
      <Header title="알림" variant="detail" />
      <Content />
    </>
  );
}
