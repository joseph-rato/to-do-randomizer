import { format } from "date-fns";

// Updated interfaces to match OpenAPI schemas
export interface Appointment {
  id?: number;
  // Add other properties as defined in the OpenAPI schema
}

export interface Goal {
  id?: number;
  description: string;
  actualGoalDescription: string;
  completed: boolean;
}

export interface Task {
  id?: number;
  description: string;
  completed: boolean;
}

export interface CalendarUser {
  id?: number;
}

export interface Calendar {
  id?: number;
  name: string;
  description: string;
}

// Legacy interfaces for backward compatibility
export interface Event {
  id: number;
  date: string;
  title: string;
  type: 'event';
  description?: string;
  notes?: string;
  priority?: string;
}

const API_BASE = 'http://localhost:8080';
const USE_DUMMY_DATA = true; // Set to false to use real API

const dummyAppointments: Appointment[] = [
  {
    id: 1,
  },
];

const dummyEvents: Event[] = [
  {
    id: 3,
    date: format(new Date(), 'yyyy-MM-12'),
    title: 'Birthday Party',
    type: 'event',
    description: "Celebrating Sarah's 30th birthday",
    notes: 'Bring gift and RSVP by end of week',
    priority: 'high'
  },
  {
    id: 4,
    date: format(new Date(), 'yyyy-MM-20'),
    title: 'Conference',
    type: 'event',
    description: 'Annual tech conference with industry leaders',
    notes: 'Book hotel and prepare presentation slides',
    priority: 'medium'
  },
];

// Appointment functions
export async function fetchAppointments(month: Date): Promise<Appointment[]> {
  if (USE_DUMMY_DATA) {
    return new Promise(resolve => setTimeout(() => resolve(dummyAppointments), 400));
  }
  // Note: The OpenAPI spec doesn't show a GET endpoint for appointments
  // You may need to add this endpoint to your backend
  const res = await fetch(`${API_BASE}/appointments`);
  if (!res.ok) throw new Error('Failed to fetch appointments');
  const data = await res.json();
  return data;
}

export async function postAppointment(appointment: Appointment) {
    console.log("postAppointment", appointment);
  if (USE_DUMMY_DATA) {
    return new Promise(resolve => setTimeout(() => resolve({ success: true, appointment }), 500));
  }
  const res = await fetch(`${API_BASE}/scheduler/createAppointment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(appointment),
  });
  if (!res.ok) throw new Error('Failed to post appointment');
  return await res.json();
}

// Goal functions
export async function fetchGoals(userId: number): Promise<Goal[]> {
  if (USE_DUMMY_DATA) {
    return new Promise(resolve => setTimeout(() => resolve([]), 400));
  }
  const res = await fetch(`${API_BASE}/AdhdAssistant/v1/getGoals?userId=${userId}`);
  if (!res.ok) throw new Error('Failed to fetch goals');
  const data = await res.json();
  return data;
}

export async function postGoal(goal: Goal) {
  if (USE_DUMMY_DATA) {
    return new Promise(resolve => setTimeout(() => resolve({ success: true, goal }), 500));
  }
  const res = await fetch(`${API_BASE}/manifestor/v1/addGoal`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(goal),
  });
  if (!res.ok) throw new Error('Failed to post goal');
  return await res.json();
}

// Task functions
export async function postTask(task: Task) {
  if (USE_DUMMY_DATA) {
    return new Promise(resolve => setTimeout(() => resolve({ success: true, task }), 500));
  }
  const res = await fetch(`${API_BASE}/manifestor/v1/addTask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Failed to post task');
  return await res.json();
}

// User functions
export async function addUser(user: CalendarUser) {
  if (USE_DUMMY_DATA) {
    return new Promise(resolve => setTimeout(() => resolve({ success: true, user }), 500));
  }
  const res = await fetch(`${API_BASE}/onboard/v1/addUser`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error('Failed to add user');
  return await res.json();
}

export async function updateUser(user: CalendarUser) {
  if (USE_DUMMY_DATA) {
    return new Promise(resolve => setTimeout(() => resolve({ success: true, user }), 500));
  }
  const res = await fetch(`${API_BASE}/onboard/v1/updateUser`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error('Failed to update user');
  return await res.json();
}

// Calendar functions
export async function createCalendar(calendar: Calendar) {
  if (USE_DUMMY_DATA) {
    return new Promise(resolve => setTimeout(() => resolve({ success: true, calendar }), 500));
  }
  const res = await fetch(`${API_BASE}/scheduler/createCalendar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(calendar),
  });
  if (!res.ok) throw new Error('Failed to create calendar');
  return await res.json();
}

// ADHD Assistant functions
export async function getSchedule(userId: number) {
  if (USE_DUMMY_DATA) {
    return new Promise(resolve => setTimeout(() => resolve({ schedule: [] }), 400));
  }
  const res = await fetch(`${API_BASE}/AdhdAssistant/v1/getSchedule?userId=${userId}`);
  if (!res.ok) throw new Error('Failed to fetch schedule');
  return await res.json();
}

export async function getCurrentTask(userId: number) {
  if (USE_DUMMY_DATA) {
    return new Promise(resolve => setTimeout(() => resolve({ currentTask: null }), 400));
  }
  const res = await fetch(`${API_BASE}/AdhdAssistant/v1/getCurrentTask?userId=${userId}`);
  if (!res.ok) throw new Error('Failed to fetch current task');
  return await res.json();
}

export async function setCurrentTask(userId: number, newTaskId: number) {
  if (USE_DUMMY_DATA) {
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 500));
  }
  const res = await fetch(`${API_BASE}/AdhdAssistant/v1/setCurrentTask?userId=${userId}&newTaskId=${newTaskId}`);
  if (!res.ok) throw new Error('Failed to set current task');
  return await res.json();
}

export async function getRandomTask(userId: number) {
  if (USE_DUMMY_DATA) {
    return new Promise(resolve => setTimeout(() => resolve({ randomTask: null }), 400));
  }
  const res = await fetch(`${API_BASE}/AdhdAssistant/v1/getRandomTask?userId=${userId}`);
  if (!res.ok) throw new Error('Failed to get random task');
  return await res.json();
}

// Legacy functions for backward compatibility
export async function fetchEvents(month: Date): Promise<Event[]> {
  if (USE_DUMMY_DATA) {
    return new Promise(resolve => setTimeout(() => resolve(dummyEvents), 400));
  }
  // Note: The OpenAPI spec doesn't show a GET endpoint for events
  // You may need to add this endpoint to your backend
  const res = await fetch(`${API_BASE}/events`);
  if (!res.ok) throw new Error('Failed to fetch events');
  const data = await res.json();
  return data;
}

export async function postEvent(event: Event) {
  if (USE_DUMMY_DATA) {
    return new Promise(resolve => setTimeout(() => resolve({ success: true, event }), 500));
  }
  const res = await fetch(`${API_BASE}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
  });
  if (!res.ok) throw new Error('Failed to post event');
  return await res.json();
} 