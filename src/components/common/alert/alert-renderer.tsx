"use client";

import { useAlertStore } from "@/store/useAlertStore";
import Alert from "@/components/common/alert";

export default function AlertRenderer() {
  const { stack, pop } = useAlertStore();

  if (stack.length === 0) return null;

  const current = stack[stack.length - 1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Alert
        title={current.title}
        description={current.description ?? ""}
        onClose={pop}
        buttons={current.buttons}
      />
    </div>
  );
}
