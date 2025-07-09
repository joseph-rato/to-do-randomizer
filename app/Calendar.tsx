"use client";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";

interface CalendarItem {
  id: number;
  date: string;
  title: string;
  type: string;
}

interface CalendarProps {
  appointments: CalendarItem[];
  events: CalendarItem[];
  selectedDay: string | null;
  onDaySelect: (date: string) => void;
  currentMonth: Date;
  onMonthChange: (date: Date, dayToSelect?: string) => void;
}

export default function Calendar({ appointments, events, selectedDay, onDaySelect, currentMonth, onMonthChange }: CalendarProps) {
  const prevMonth = () => onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () => onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-4">
      <button
        onClick={prevMonth}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        aria-label="Previous Month"
      >
        <span className="text-xl">&#8592;</span>
      </button>
      <h2 className="text-xl font-semibold">
        {format(currentMonth, "MMMM yyyy")}
      </h2>
      <button
        onClick={nextMonth}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        aria-label="Next Month"
      >
        <span className="text-xl">&#8594;</span>
      </button>
    </div>
  );

  const renderDays = () => (
    <div className="grid grid-cols-7 mb-2">
      {daysOfWeek.map((day) => (
        <div
          key={day}
          className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-1"
        >
          {day}
        </div>
      ))}
    </div>
  );

  const handleDayClick = (day: Date, currentMonth: Date, isoDate: string) => {
    if (!isSameMonth(day, currentMonth)) {
      // Change to the month of the clicked day and select the day
      onMonthChange(startOfMonth(day), isoDate);
    } else {
      // Just select the day
      onDaySelect(isoDate);
    }
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        let currentDay=day;
        formattedDate = format(day, "d");
        const isoDate = format(day, 'yyyy-MM-dd');
        const dayAppointments = appointments.filter(item => item.date === isoDate);
        const dayEvents = events.filter(item => item.date === isoDate);
        const isSelected = selectedDay === isoDate;
        days.push(
          <div
            key={day.toString()}
            onClick={() => handleDayClick(currentDay, currentMonth, isoDate)}
            className={`h-16 flex flex-col items-center justify-center border border-gray-100 dark:border-gray-800 cursor-pointer rounded-lg m-0.5 transition-colors
              ${!isSameMonth(day, monthStart) ? "bg-gray-50 text-gray-300 dark:bg-gray-900 dark:text-gray-700 cursor-pointer" : "bg-white dark:bg-black"}
              ${isSameDay(day, new Date()) ? "border-blue-500 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-bold" : ""}
              ${isSelected ? "ring-2 ring-blue-400 ring-offset-2" : ""}
              hover:bg-blue-100 dark:hover:bg-blue-800`}
          >
            <span>{formattedDate}</span>
            <div className="flex flex-col gap-0.5 mt-1 w-full items-center">
              {dayAppointments.map(item => (
                <span
                  key={item.id}
                  className="block w-2 h-2 rounded-full mb-0.5 bg-blue-500"
                  title={item.title}
                ></span>
              ))}
              {dayEvents.map(item => (
                <span
                  key={item.id}
                  className="block w-2 h-2 rounded-full mb-0.5 bg-green-500"
                  title={item.title}
                ></span>
              ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-6">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
} 