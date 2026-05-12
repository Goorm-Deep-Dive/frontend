import { useState } from "react";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Input({ value, onChange }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isFilled = value.length > 0;

  return (
    <div className="w-full rounded-lg bg-gray-200 p-5">
      <div className="bg-primary-10 rounded-lg border border-white/30 px-5 py-2.5 backdrop-blur-md">
        <input
          value={value}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => onChange(e.target.value)}
          placeholder="성명 또는 명칭"
          className={`h3 focus:text-primary-1 w-full outline-none ${
            isFocused || isFilled
              ? "text-primary-1 placeholder:text-primary-1"
              : "text-primary-2 placeholder:text-primary-2"
          }`}
        />
      </div>
    </div>
  );
}
