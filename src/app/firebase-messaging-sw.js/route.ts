import "server-only";

import { buildFirebaseMessagingSwScript } from "@/services/build-firebase-messaging-sw-script";

export const dynamic = "force-dynamic";

export const GET = () => {
  const script = buildFirebaseMessagingSwScript();

  return new Response(script, {
    status: 200,
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Service-Worker-Allowed": "/",
    },
  });
};
