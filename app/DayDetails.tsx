"use client";
import { format } from "date-fns";

interface DayDetailsProps {
  selectedDay: string | null;
  selectedDayItems: { id: number; date: string; title: string; type: string }[];
}

export default function DayDetails({ selectedDay, selectedDayItems }: DayDetailsProps) {
  if (!selectedDay) return null;
  return (
    <div className="flex-1 max-w-xs w-full bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-6 mt-8 sm:mt-0">
      <h3 className="text-lg font-semibold mb-2">Details for {format(new Date(selectedDay), 'MMMM d, yyyy')}</h3>
      {selectedDayItems.length === 0 ? (
        <div className="text-gray-400">No events or appointments.</div>
      ) : (
        <ul className="space-y-2">
          {selectedDayItems.map(item => (
            <li key={item.id} className="flex items-center gap-2">
              <span className={`inline-block w-2 h-2 rounded-full ${item.type === 'appointment' ? 'bg-blue-500' : 'bg-green-500'}`}></span>
              <span className="font-medium">{item.title}</span>
              <span className="text-xs text-gray-400">({item.type})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 