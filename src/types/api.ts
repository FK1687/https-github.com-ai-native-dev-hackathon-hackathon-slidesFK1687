export interface ApiError {
  error: string;
  code: string;
}

export interface AvailableSlot {
  date: string;
  times: string[];
}

export interface AppointmentBookingRequest {
  name: string;
  email: string;
  date: string;
  time: string;
  message?: string;
}

export interface AppointmentBookingResponse {
  success: boolean;
  appointment: {
    id: string;
    date: string;
    time: string;
    status: 'confirmed';
  };
}

export interface ContactRequest {
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  contactId: string;
}
