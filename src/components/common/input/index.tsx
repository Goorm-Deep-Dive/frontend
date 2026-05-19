import { useState } from "react";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Input({ value, onChange }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isFilled = value.length > 0;

  return (
    <div className="w-full rounded-lg border border-gray-300 px-5 py-2.5">
      <input
        value={value}
        onFocus={() => setIsFocused(true)}
        onChange={(e) => onChange(e.target.value)}
        placeholder="성명 또는 명칭"
        className={`h3 w-full outline-none ${
          isFocused || isFilled
            ? "text-text-gray-800 placeholder:text-gray-800"
            : "text-text-gray-400 placeholder:text-gray-400"
        }`}
      />
    </div>
  );
}
