"use client";

import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Landmark,
  Link2,
  PlusCircle,
  FileText,
  Monitor,
  MinusCircle,
} from "lucide-react";

const calendarDays = [
  [31, 1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12, 13],
  [14, 15, 16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25, 26, 27],
  [28, 29, 30, 1, 2, 3, 4],
];

const schedules = [
  {
    icon: Link2,
    title: "Title",
    category: "금융",
    categoryColor: "bg-[#F4B16F]",
  },
  {
    icon: Monitor,
    title: "Title",
    category: "디지털",
    categoryColor: "bg-[#E38757]",
  },
  {
    icon: Landmark,
    title: "Title",
    category: "법원행정",
    categoryColor: "bg-[#35B6C4]",
  },
  {
    icon: FileText,
    title: "Title",
    category: "사무행정",
    categoryColor: "bg-[#0F7280]",
  },
  {
    icon: PlusCircle,
    title: "Title",
    category: "tagname",
    categoryColor: "bg-[#D9D9D9]",
    isGray: true,
  },
];

export default function SchedulePage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-[#F8F8F8] px-5 py-6">
      {/* header */}
      <header className="relative flex items-center justify-center">
        <h1 className="text-[22px] font-bold text-[#1E1E1E]">일정 확인</h1>

        <button className="absolute right-0">
          <Bell className="size-5 text-[#1E1E1E]" />
        </button>
      </header>

      {/* month */}
      <div className="mt-8 flex items-center justify-center gap-8">
        <button>
          <ChevronLeft className="size-4 text-[#9E9E9E]" />
        </button>

        <p className="text-[20px] font-semibold text-[#2A2A2A]">
          00월 00일 요일
        </p>

        <button>
          <ChevronRight className="size-4 text-[#2A2A2A]" />
        </button>
      </div>

      {/* calendar */}
      <section className="mt-6">
        {/* week */}
        <div className="grid grid-cols-7 text-center text-[12px] text-[#B4B4B4]">
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* days */}
        <div className="mt-4 flex flex-col gap-5">
          {calendarDays.map((week, weekIndex) => (
            <div
              key={weekIndex}
              className="grid grid-cols-7 place-items-center"
            >
              {week.map((date, index) => {
                const isSelected = date === 17 && weekIndex === 2;
                const isDisabled =
                  (weekIndex === 0 && index === 0) ||
                  (weekIndex === 4 && index >= 3);

                return (
                  <div
                    key={`${weekIndex}-${index}`}
                    className="flex flex-col items-center gap-1"
                  >
                    <div
                      className={`flex size-8 items-center justify-center rounded-full text-[15px] font-medium ${
                        isSelected
                          ? "bg-[#D7F0F5] text-[#2B9CAB]"
                          : isDisabled
                            ? "text-[#D8D8D8]"
                            : "text-[#5E5E5E]"
                      }`}
                    >
                      {date}
                    </div>

                    {/* dots */}
                    {isSelected ? (
                      <div className="flex items-center gap-1">
                        <div className="size-1 rounded-full bg-[#F4B16F]" />
                        <div className="size-1 rounded-full bg-[#E38757]" />
                        <div className="size-1 rounded-full bg-[#35B6C4]" />
                        <div className="size-1 rounded-full bg-[#0F7280]" />
                      </div>
                    ) : (
                      <div className="h-1" />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* category legend */}
        <div className="mt-6 flex items-center justify-center gap-4 rounded-xl bg-[#F1F1F1] px-4 py-3">
          {[
            { label: "금융", color: "#F4B16F" },
            { label: "디지털", color: "#E38757" },
            { label: "법원행정", color: "#35B6C4" },
            { label: "사무행정", color: "#0F7280" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1">
              <div
                className="size-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[11px] text-[#7A7A7A]">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* detail schedule */}
      <section className="mt-10">
        <h2 className="text-[18px] font-bold text-[#1E1E1E]">상세 일정</h2>

        <div className="mt-5 flex flex-col gap-3">
          {schedules.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="flex items-center justify-between rounded-2xl border border-[#E5E5E5] bg-white px-4 py-4"
              >
                <div className="flex items-center gap-3">
                  <Icon className="size-5 text-[#6A6A6A]" />

                  <p className="text-[15px] font-medium text-[#2B2B2B]">
                    {item.title}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <div
                      className={`size-2 rounded-full ${item.categoryColor}`}
                    />

                    <span className="text-[12px] text-[#8B8B8B]">
                      {item.category}
                    </span>
                  </div>

                  {!item.isGray && (
                    <div className="rounded-md border border-[#FF7A8A] bg-[#FFF1F3] px-2 py-0.5 text-[12px] font-semibold text-[#FF5A6D]">
                      D-Day
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* empty */}
          <div className="flex items-center gap-3 rounded-2xl border border-[#E5E5E5] bg-white px-4 py-4">
            <MinusCircle className="size-5 text-[#B9B9B9]" />

            <p className="text-[15px] text-[#8A8A8A]">추가된 일정이 없습니다</p>
          </div>
        </div>
      </section>
    </div>
  );
}
