"use client";

import { cn } from "@/lib/cn";
import Image from "next/image";

interface CheckboxItem {
  label: string;
  value: string;
  description?: string;
  nextQuestionId?: number;
}

interface Props {
  value: string | string[];
  onChange: (value: string | string[], nextQuestionId?: number) => void;
  multiple?: boolean;
  items: CheckboxItem[];
  idPrefix?: string;
}

export default function CheckboxList({
  items,
  value,
  onChange,
  multiple = false,
  idPrefix = "checkbox-list",
}: Props) {
  const selectedValues = (Array.isArray(value) ? value : [value]).filter(
    Boolean,
  );

  const handleToggle = (itemValue: string, nextQuestionId?: number) => {
    const isChecked = selectedValues.includes(itemValue);

    if (!multiple) {
      onChange(isChecked ? "" : itemValue, nextQuestionId);
      return;
    }

    if (isChecked) {
      onChange(
        selectedValues.filter((v) => v !== itemValue),
        nextQuestionId,
      );
      return;
    }

    onChange([...selectedValues, itemValue], nextQuestionId);
  };

  return (
    <div className="flex w-full flex-col gap-1.25">
      {items.map((item) => {
        const isChecked = selectedValues.includes(item.value);
        const inputId = `${idPrefix}-checkbox-${item.value}`;
        const descriptionId = item.description
          ? `${idPrefix}-checkbox-description-${item.value}`
          : undefined;

        return (
          <label
            key={item.value}
            className={cn(
              "flex w-full cursor-pointer items-center justify-start gap-5 rounded-md border border-gray-300 bg-white px-5 py-2.5",
              isChecked ? "bg-primary-bg border-primary-2" : "border-gray-300",
              "focus-within:ring-primary-1 focus-within:ring-2 focus-within:ring-offset-2",
            )}
            aria-label={item.label}
            aria-describedby={descriptionId}
            htmlFor={inputId}
            onClick={(event) => {
              event.preventDefault();
              handleToggle(item.value, item.nextQuestionId);
            }}
          >
            <div
              className={cn(
                "flex h-5 min-h-5 w-5 min-w-5 items-center justify-center rounded-md border-2 border-gray-900",
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
              onChange={() => {}}
              className="sr-only"
              checked={isChecked}
              readOnly
            />
          </label>
        );
      })}
    </div>
  );
}
