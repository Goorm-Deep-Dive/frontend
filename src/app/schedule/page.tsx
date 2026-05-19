"use client";

import Calendar from "./_components/calendar";
import CalendarTag from "./_components/calendar-tag";
import CalendarSchedule from "./_components/calendar-schedule";
import CalendarNotSchedule from "./_components/calendar-not-schedule";
import BottomNavigation from "@/components/common/bottom-navigation";
import { useState } from "react";
import Header from "@/components/common/header";

type Mode = "monthly" | "weekly" | "daily";

export default function SchedulePage() {
  const [mode, setMode] = useState<Mode>("daily");

  return (
    <>
      <Header title="일정 관리" variant="default" />
      <div className="mt-3 flex w-full flex-col gap-10.5">
        <div className="flex flex-col gap-10 px-5">
          <div className="flex w-full flex-col gap-2.5">
            <Calendar />
            <CalendarTag />
          </div>
          <div className="flex flex-col gap-10">
            <CalendarSchedule mode={mode} setMode={setMode} />
            <CalendarNotSchedule />
          </div>
        </div>
      </div>
      <BottomNavigation />
    </>
  );
}
