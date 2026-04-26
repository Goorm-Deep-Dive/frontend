import { useState } from "react";

export default function Input() {
  const [value, setValue] = useState("");
  const isFilled = value.length > 0;

  return (
    <div
      className={`h3 caret-primary-1 bg-primary-bg flex justify-between rounded-lg px-2.5 py-2.5 ${isFilled ? "text-primary-1" : "text-primary-2"}`}
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="성명 또는 명칭"
        className={`outline-none`}
      />
    </div>
  );
}
