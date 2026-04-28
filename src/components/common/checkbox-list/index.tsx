"use client";

import { cn } from "@/lib/cn";
import Image from "next/image";

interface CheckboxItem {
  label: string;
  value: string;
  description?: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  items: CheckboxItem[];
}

export default function CheckboxList({ items, value, onChange }: Props) {
  return (
    <div className="flex w-full flex-col gap-1.25">
      {items.map((item) => {
        const isChecked = value === item.value;
        const inputId = `checkbox-${item.value}`;
        const descriptionId = item.description
          ? `checkbox-description-${item.value}`
          : undefined;

        return (
          <label
            key={item.value}
            className={cn(
              "flex w-full cursor-pointer items-center justify-start gap-5 rounded-2xl border border-gray-300 bg-white px-5 py-2.5",
              isChecked ? "bg-primary-bg border-primary-2" : "border-gray-300",
              "focus-within:ring-primary-1 focus-within:ring-2 focus-within:ring-offset-2",
            )}
            aria-label={item.label}
            aria-describedby={descriptionId}
            htmlFor={inputId}
          >
            <div
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-md border-2 border-gray-900",
                isChecked
                  ? "bg-primary-1 border-primary-1"
                  : "border-gray-900 bg-white",
              )}
            >
              {isChecked && (
                <Image
                  src="/icons/check-icon.svg"
                  className="text-white"
                  alt="check"
                  width={10}
                  height={8}
                />
              )}
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  "h4",
                  isChecked ? "text-primary-1" : "text-gray-900",
                )}
              >
                {item.label}
              </span>
              {item.description && (
                <span
                  id={descriptionId}
                  className={cn(
                    "caption",
                    isChecked ? "text-primary-1" : "text-gray-700",
                  )}
                >
                  {item.description}
                </span>
              )}
            </div>

            <input
              id={inputId}
              type="checkbox"
              value={item.value}
              onChange={() => onChange(item.value)}
              className="sr-only"
              checked={isChecked}
            />
          </label>
        );
      })}
    </div>
  );
}
