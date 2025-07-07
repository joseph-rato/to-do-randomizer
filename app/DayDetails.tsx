"use client";
import { useState } from "react";
import { format } from "date-fns";
import AppointmentModal from "./AppointmentModal";
import GoalModal from "./GoalModal";
import EventDetails from "./EventDetails";

interface DayDetailsProps {
  selectedDay: string | null;
  selectedDayItems: { id: number; date: string; title: string; type: string; description?: string; notes?: string; time?: string; priority?: string }[];
  onItemUpdate?: (updatedItem: { id: number; date: string; title: string; type: string; description?: string; notes?: string; time?: string; priority?: string }) => void;
}

interface AppointmentForm {
  title: string;
  time: string;
  description: string;
}

interface Task {
  id: string;
  description: string;
  notes: string;
  expectedTimeMinutes: number;
}

interface GoalForm {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  tasks: Task[];
}

export default function DayDetails({ selectedDay, selectedDayItems, onItemUpdate }: DayDetailsProps) {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [expandedItemId, setExpandedItemId] = useState<number | null>(null);
  const [appointmentForm, setAppointmentForm] = useState<AppointmentForm>({
    title: '',
    time: '',
    description: ''
  });
  const [goalForm, setGoalForm] = useState<GoalForm>({
    title: '',
    description: '',
    priority: 'medium',
    tasks: []
  });

  if (!selectedDay) return null;

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating appointment:', { ...appointmentForm, date: selectedDay });
    // Here you would typically make an API call to create the appointment
    setAppointmentForm({ title: '', time: '', description: '' });
    setShowAppointmentModal(false);
  };

  const handleGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating goal:', { ...goalForm, date: selectedDay });
    // Here you would typically make an API call to create the goal
    setGoalForm({ title: '', description: '', priority: 'medium', tasks: [] });
    setShowGoalModal(false);
  };

  const toggleItemExpansion = (itemId: number) => {
    setExpandedItemId(expandedItemId === itemId ? null : itemId);
  };

  const handleItemUpdate = (updatedItem: { id: number; date: string; title: string; type: string; description?: string; notes?: string; time?: string; priority?: string }) => {
    if (onItemUpdate) {
      onItemUpdate(updatedItem);
    }
  };

  return (
    <>
      <div className="flex-1 max-w-xs w-full bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-6 mt-8 sm:mt-0">
        <h3 className="text-lg font-semibold mb-2">Details for {format(new Date(selectedDay), 'MMMM d, yyyy')}</h3>
        {selectedDayItems.length === 0 ? (
          <div className="text-gray-400">No events or appointments.</div>
        ) : (
          <ul className="space-y-2">
            {selectedDayItems.map(item => (
              <EventDetails
                key={item.id}
                item={item}
                isExpanded={expandedItemId === item.id}
                onToggle={() => toggleItemExpansion(item.id)}
                onUpdate={handleItemUpdate}
              />
            ))}
          </ul>
        )}
        
        <div className="mt-6 flex gap-2">
          <button
            onClick={() => setShowAppointmentModal(true)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Add Appointment
          </button>
          <button
            onClick={() => setShowGoalModal(true)}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Add Goal
          </button>
        </div>
      </div>

      <AppointmentModal
        isOpen={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
        form={appointmentForm}
        onFormChange={setAppointmentForm}
        onSubmit={handleAppointmentSubmit}
      />

      <GoalModal
        isOpen={showGoalModal}
        onClose={() => setShowGoalModal(false)}
        form={goalForm}
        onFormChange={setGoalForm}
        onSubmit={handleGoalSubmit}
      />
    </>
  );
} 