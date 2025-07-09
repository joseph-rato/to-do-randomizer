import { format } from "date-fns";

export interface Appointment {
  id: number;
  date: string;
  title: string;
  type: 'appointment';
  description?: string;
  notes?: string;
  time?: string;
}

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
    date: format(new Date(), 'yyyy-MM-05'),
    title: 'Dentist',
    type: 'appointment',
    time: '10:00 AM',
    description: 'Regular dental checkup and cleaning',
    notes: 'Bring insurance card and remember to floss before appointment'
  },
  {
    id: 2,
    date: format(new Date(), 'yyyy-MM-12'),
    title: 'Team Meeting',
    type: 'appointment',
    time: '2:00 PM',
    description: 'Weekly team sync to discuss project progress',
    notes: 'Prepare quarterly report for discussion'
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

export async function fetchAppointments(month: Date): Promise<Appointment[]> {
  if (USE_DUMMY_DATA) {
    // Optionally filter by month here if needed
    return new Promise(resolve => setTimeout(() => resolve(dummyAppointments), 400));
  }
  const res = await fetch(`${API_BASE}/appointments`);
  if (!res.ok) throw new Error('Failed to fetch appointments');
  const data = await res.json();
  return data;
}

export async function fetchEvents(month: Date): Promise<Event[]> {
  if (USE_DUMMY_DATA) {
    // Optionally filter by month here if needed
    return new Promise(resolve => setTimeout(() => resolve(dummyEvents), 400));
  }
  const res = await fetch(`${API_BASE}/events`);
  if (!res.ok) throw new Error('Failed to fetch events');
  const data = await res.json();
  return data;
}

export async function postAppointment(appointment: Appointment) {
  if (USE_DUMMY_DATA) {
    return new Promise(resolve => setTimeout(() => resolve({ success: true, appointment }), 500));
  }
  const res = await fetch(`${API_BASE}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(appointment),
  });
  if (!res.ok) throw new Error('Failed to post appointment');
  return await res.json();
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