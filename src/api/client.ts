import type {
  Product,
  FilterConfiguration,
  OptionsData,
  AvailableSlot,
  AppointmentBookingRequest,
  AppointmentBookingResponse,
  ContactRequest,
  ContactResponse,
} from '@/types';
import { generateProducts, generateOptions, generateFilters } from './seed-data';

// In-memory data store (simulates backend)
let products: Product[] | null = null;
let options: OptionsData | null = null;
let filters: FilterConfiguration | null = null;
const bookedSlots: Map<string, string[]> = new Map();
let appointmentCounter = 0;
let contactCounter = 0;

function ensureSeeded(): void {
  if (!products) {
    products = generateProducts(796);
    options = generateOptions();
    filters = generateFilters();
  }
}

// Simulate network delay
function delay(ms: number = 200): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchProducts(): Promise<Product[]> {
  await delay();
  ensureSeeded();
  return products!;
}

export async function fetchProduct(id: string): Promise<Product | undefined> {
  await delay(100);
  ensureSeeded();
  return products!.find((p) => p.id === id);
}

export async function fetchFilters(): Promise<FilterConfiguration> {
  await delay(100);
  ensureSeeded();
  return filters!;
}

export async function fetchOptions(): Promise<OptionsData> {
  await delay(100);
  ensureSeeded();
  return options!;
}

export async function fetchAvailableSlots(): Promise<AvailableSlot[]> {
  await delay(300);
  const slots: AvailableSlot[] = [];
  const now = new Date();
  let daysAdded = 0;
  const current = new Date(now);
  current.setDate(current.getDate() + 1);

  while (daysAdded < 10) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const dateStr = current.toISOString().split('T')[0]!;
      const booked = bookedSlots.get(dateStr) ?? [];
      const allTimes = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
      ];
      const available = allTimes.filter((t) => !booked.includes(t));
      if (available.length > 0) {
        slots.push({ date: dateStr, times: available });
      }
      daysAdded++;
    }
    current.setDate(current.getDate() + 1);
  }

  return slots;
}

export async function bookAppointment(req: AppointmentBookingRequest): Promise<AppointmentBookingResponse> {
  await delay(500);

  if (!req.name || !req.email || !req.date || !req.time) {
    throw new Error('Missing required fields: name, email, date, time');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(req.email)) {
    throw new Error('Invalid email format');
  }

  const booked = bookedSlots.get(req.date) ?? [];
  if (booked.includes(req.time)) {
    throw new Error('This time slot is no longer available. Please select another time.');
  }

  booked.push(req.time);
  bookedSlots.set(req.date, booked);
  appointmentCounter++;

  return {
    success: true,
    appointment: {
      id: `apt-${appointmentCounter}`,
      date: req.date,
      time: req.time,
      status: 'confirmed',
    },
  };
}

export async function submitContact(req: ContactRequest): Promise<ContactResponse> {
  await delay(500);

  if (!req.name || !req.email || !req.message) {
    throw new Error('Missing required fields: name, email, message');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(req.email)) {
    throw new Error('Invalid email format');
  }

  contactCounter++;

  return {
    success: true,
    contactId: `contact-${contactCounter}`,
  };
}
