# US-05: Contact Sales Expert

## Overview

A contact page that allows users to reach a dedicated sales engineer through two channels: booking a consultation appointment (3-step guided flow) or sending a direct message. Includes a sales expert profile card and backend endpoints for appointment scheduling and contact form submission.

## User Stories

- As a user interested in a KLEB. adhesive solution, I want to book a consultation appointment with a sales engineer or send a direct message, so that I can get expert advice tailored to my specific application requirements.

## Functional Requirements

1. The contact page must display a header section with a badge ("Sales & Support"), heading ("Contact Sales"), and a description about getting expert advice.
2. The page must use a two-column layout: a sales expert card on the left (sticky on desktop), and tabbed forms on the right.
3. The sales expert card must display:
   - Expert profile photo, name ("Ji-Young Park"), and title ("Senior Sales Engineer")
   - Contact details: email (j.park@kleb.com), phone (+49 (0) 211 555 0142), office (Düsseldorf, Germany)
   - Expertise tags: Industrial Bonding, Automotive, Electronics, Surface Protection
   - Availability: Mon – Fri, 09:00 – 17:00 CET, average response time: 2h
4. Two form tabs must be available: "Book Appointment" and "Send Message".

### Book Appointment (3-Step Flow)

5. **Step 1 — Select a Date:** Display a horizontal scrollable row of available dates (next 10 business days). Each date button shows the short date and available slot count. The first available date must be pre-selected. Show loading skeletons while dates are being fetched.
6. **Step 2 — Select a Time (CET):** Display a grid of 30-minute time slots for the selected date. Morning slots: 09:00–11:30, afternoon slots: 13:00–16:30. Show "Please select a date first" if no date is selected.
7. **Step 3 — Your Details:** Collect the user's full name (required), email address (required), and an optional message about what they'd like to discuss.
8. A summary banner must appear when both date and time are selected, showing the formatted date and time.
9. The "Confirm Appointment" submit button must be disabled until name, email, date, and time are all provided. Show "Booking..." during submission.
10. On success, display a confirmation screen with the appointment details (date, time, email) and a "Book Another" button that resets the form and re-fetches available slots.
11. On error, display a validation error banner with a clear message.

### Send Message Form

12. The message form must collect: full name (required), email address (required), company (optional), subject (optional), and message (required, multi-line textarea with 5 rows).
13. The "Send Message" submit button must be disabled until name, email, and message are provided. Show "Sending..." during submission.
14. On success, display a confirmation screen with "Message Sent", a note about the 2-hour response time, and a "Send Another Message" button that resets the form.
15. On error, display a validation error banner.

## Data Model

### Available Appointment Slot

| Attribute | Type | Description |
|-----------|------|-------------|
| date | string (ISO date) | The available date (YYYY-MM-DD) |
| times | string[] | Available 30-minute time slots for that date |

### Appointment Booking Request

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Full name of the person booking |
| email | string | Yes | Email address (validated format) |
| date | string | Yes | Selected date (YYYY-MM-DD) |
| time | string | Yes | Selected time slot (HH:MM) |
| message | string | No | Optional discussion topic |

### Appointment Booking Response

| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Whether booking succeeded |
| appointment.id | string | Unique appointment identifier |
| appointment.date | string | Confirmed date |
| appointment.time | string | Confirmed time |
| appointment.status | string | "confirmed" |

### Contact Message Request

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Sender's full name |
| email | string | Yes | Sender's email (validated format) |
| company | string | No | Sender's company name |
| subject | string | No | Message subject |
| message | string | Yes | Message body |

### Contact Message Response

| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Whether submission succeeded |
| contactId | string | Unique contact request identifier |

## Backend API Endpoints

### GET /appointments/available

Returns the next 10 available business days (excluding weekends) with their available 30-minute time slots. Already-booked slots are excluded.

**Response:** `{ slots: [{ date: "2026-03-17", times: ["09:00", "09:30", ...] }] }`

### POST /appointments/book

Books an appointment for a specific date and time.

**Request:** `{ name, email, date, time, message? }`

**Validation:**
- Required fields: name, email, date, time
- Email format validation
- Slot availability check (returns 409 Conflict if already booked)

**Response:** `{ success: true, appointment: { id, date, time, status: "confirmed" } }`

### POST /contact

Submits a general contact message.

**Request:** `{ name, email, company?, subject?, message }`

**Validation:**
- Required fields: name, email, message
- Email format validation

**Response:** `{ success: true, contactId }`

## User Flows

### Book an Appointment
1. User navigates to the contact page.
2. The "Book Appointment" tab is active by default.
3. Available dates are fetched and displayed; the first date is pre-selected.
4. User selects a date; available time slots for that date are shown.
5. User selects a time slot.
6. A summary banner appears confirming the chosen date and time.
7. User enters their name and email.
8. User clicks "Confirm Appointment".
9. System validates and submits the booking.
10. On success, a confirmation screen is shown.
11. User can click "Book Another" to start over.

### Send a Message
1. User switches to the "Send Message" tab.
2. User fills in name, email, and message (plus optional company and subject).
3. User clicks "Send Message".
4. System validates and submits the contact request.
5. On success, a confirmation screen is shown.
6. User can click "Send Another Message" to start over.

## Business Rules

- BR-01: Available appointment slots exclude weekends (Saturday, Sunday).
- BR-02: Available appointment slots exclude already-booked times.
- BR-03: Appointment time slots are 30-minute intervals: 09:00–11:30 (morning), 13:00–16:30 (afternoon).
- BR-04: The system returns the next 10 available business days starting from the day after the current date.
- BR-05: A booked time slot becomes unavailable for subsequent booking requests (409 Conflict).
- BR-06: Email validation uses format checking on both frontend and backend.
- BR-07: All required fields must be filled before the submit button becomes enabled.
- BR-08: The sales expert's availability is Mon–Fri, 09:00–17:00 CET with an average 2-hour response time.

## Acceptance Criteria

- [ ] AC-01: Contact page displays the sales expert card with profile, contact info, expertise, and availability.
- [ ] AC-02: "Book Appointment" tab shows a 3-step guided flow (date → time → details).
- [ ] AC-03: Available dates are fetched from the backend and displayed as selectable buttons.
- [ ] AC-04: Time slots update when a date is selected; already-booked slots are excluded.
- [ ] AC-05: Summary banner shows the selected date and time.
- [ ] AC-06: Appointment booking succeeds and shows a confirmation screen.
- [ ] AC-07: Booking a taken slot returns an appropriate conflict error.
- [ ] AC-08: "Send Message" tab collects name, email, company, subject, and message.
- [ ] AC-09: Contact submission succeeds and shows a confirmation screen.
- [ ] AC-10: Submit buttons are disabled until required fields are filled.
- [ ] AC-11: Error states display clear messages for validation and network failures.
- [ ] AC-12: All form inputs have visible labels, required field indicators, and ARIA attributes.
- [ ] AC-13: Layout is responsive: two-column on desktop, stacked on mobile.
- [ ] AC-14: Sales expert card is sticky on desktop viewports.

## Cross-References

- Related: US-01 (App Shell & Filters) — contact page is accessible via the main navigation "Contact" link.
