"use client";
import { useState, useEffect } from "react";
import { addMonths, subMonths, format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";
import Image from "next/image";
import Calendar from "./Calendar";
import DayDetails from "./DayDetails";

// Dummy fetch functions
function fetchAppointments(month: Date) {
  return new Promise<{ id: number; date: string; title: string; type: 'appointment' }[]>(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, date: format(month, 'yyyy-MM-05'), title: 'Dentist', type: 'appointment' },
        { id: 2, date: format(month, 'yyyy-MM-12'), title: 'Team Meeting', type: 'appointment' },
      ]);
    }, 400);
  });
}

function fetchEvents(month: Date) {
  return new Promise<{ id: number; date: string; title: string; type: 'event' }[]>(resolve => {
    setTimeout(() => {
      resolve([
        { id: 3, date: format(month, 'yyyy-MM-12'), title: 'Birthday Party', type: 'event' },
        { id: 4, date: format(month, 'yyyy-MM-20'), title: 'Conference', type: 'event' },
      ]);
    }, 400);
  });
}

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [items, setItems] = useState<{ id: number; date: string; title: string; type: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchAppointments(currentMonth),
      fetchEvents(currentMonth)
    ]).then(([appointments, events]) => {
      setItems([...appointments, ...events]);
      setLoading(false);
    });
  }, [currentMonth]);

  const handleDaySelect = (date: string) => {
    setSelectedDay(date);
  };

  const handleMonthChange = (date: Date, dayToSelect?: string) => {
    setCurrentMonth(date);
    setSelectedDay(dayToSelect ?? null);
  };

  const selectedDayItems = selectedDay ? items.filter(item => item.date === selectedDay) : [];

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

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

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
        formattedDate = format(day, "d");
        const cloneDay = day;
        days.push(
          <div
            key={day.toString()}
            className={`h-16 flex flex-col items-center justify-center border border-gray-100 dark:border-gray-800 cursor-pointer rounded-lg m-0.5 transition-colors
              ${!isSameMonth(day, monthStart) ? "bg-gray-50 text-gray-300 dark:bg-gray-900 dark:text-gray-700" : "bg-white dark:bg-black"}
              ${isSameDay(day, new Date()) ? "border-blue-500 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-bold" : ""}
              hover:bg-blue-100 dark:hover:bg-blue-800`}
          >
            <span>{formattedDate}</span>
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
    <div className="flex flex-col sm:flex-row items-start justify-center min-h-screen bg-gray-50 dark:bg-black p-4 sm:p-10 gap-8">
      <div className="flex-1 flex justify-center w-full">
        {loading ? (
          <div className="flex justify-center items-center h-40 text-gray-400">Loading...</div>
        ) : (
          <Calendar
            items={items}
            selectedDay={selectedDay}
            onDaySelect={handleDaySelect}
            currentMonth={currentMonth}
            onMonthChange={handleMonthChange}
          />
        )}
      </div>
      {selectedDay && (
        <DayDetails selectedDay={selectedDay} selectedDayItems={selectedDayItems} />
      )}
    </div>
  );
}
