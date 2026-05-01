interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Input({ value, onChange }: InputProps) {
  const isFilled = value.length > 0;
  return (
    <div className="rounded-lg bg-gray-200 p-5">
      <div className="bg-primary-10 rounded-lg border border-white/30 px-5 py-2.5 backdrop-blur-md">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="성명 또는 명칭"
          className={`h3 focus:text-primary-1 outline-none ${isFilled ? "text-primary-1" : "text-primary-2"}`}
        />
      </div>
    </div>
  );
}
