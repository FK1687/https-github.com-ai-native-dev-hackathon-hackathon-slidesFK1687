# T-017: Appointment & Contact API Endpoints

## Description

Implement the backend API endpoints for the contact feature: available appointment slots, appointment booking, and contact message submission. Includes validation, conflict detection, and data persistence.

## Spec Reference

`docs/specs/us-05-contact-sales.md`

## Agent Assignment

Agent: `backend`

## Dependencies

- T-001 (Database schema & seed data)
- T-002 (Shared TypeScript types)

## Acceptance Criteria

- [ ] GET /appointments/available returns next 10 business days (excluding weekends) with available 30-minute time slots
- [ ] Already-booked slots are excluded from available times
- [ ] Time slots: 09:00–11:30 (morning) and 13:00–16:30 (afternoon) in 30-min intervals
- [ ] POST /appointments/book accepts { name, email, date, time, message? }
- [ ] Booking validates required fields (name, email, date, time) and email format
- [ ] Booking checks slot availability — returns 409 Conflict if already booked
- [ ] Booking stores appointment and links to email for lookup
- [ ] Booking response: { success: true, appointment: { id, date, time, status: "confirmed" } }
- [ ] POST /contact accepts { name, email, company?, subject?, message }
- [ ] Contact validates required fields (name, email, message) and email format
- [ ] Contact stores the request and returns { success: true, contactId }
- [ ] All business logic in service functions, not route handlers
- [ ] Consistent error response shapes

## Technical Notes

- Store bookings in KV or database
- Key pattern for booked slots: `appointments:booked:{date}` → string array of times
- Key pattern for appointment details: `appointments:detail:{appointmentId}`
- Key pattern for email lookup: `appointments:email:{email}` → appointmentId array

---

# T-018: Contact Sales Page

## Description

Build the Contact Sales page with sales expert profile card, appointment booking (3-step guided flow), and contact message form in a tabbed layout.

## Spec Reference

`docs/specs/us-05-contact-sales.md`

## Agent Assignment

Agent: `frontend`

## Dependencies

- T-003 (UI primitive components)
- T-006 (API client layer)
- T-007 (App shell & routing)

## Acceptance Criteria

- [ ] Page header: badge ("Sales & Support"), heading ("Contact Sales"), description
- [ ] Two-column layout: sales expert card (sticky on desktop) + tabbed forms
- [ ] Sales expert card: photo, name, title, email, phone, office, expertise tags, availability
- [ ] Tab 1 "Book Appointment": 3-step flow (Select Date → Select Time → Your Details)
- [ ] Step 1: horizontal scrollable date buttons with slot counts, loading skeletons, first date pre-selected
- [ ] Step 2: grid of 30-min time slots, "Please select a date first" if no date
- [ ] Step 3: name (required), email (required), discussion topic (optional)
- [ ] Summary banner when date + time selected
- [ ] Submit disabled until required fields filled; shows "Booking..." during submission
- [ ] Success: confirmation screen with date, time, email, "Book Another" button
- [ ] Tab 2 "Send Message": name, email, company, subject, message fields
- [ ] Submit disabled until name + email + message filled; shows "Sending..." during submission
- [ ] Success: "Message Sent" screen with "Send Another Message" button
- [ ] Error states: validation error banners for both forms
- [ ] All form inputs have visible labels with `htmlFor`, required fields marked with *
- [ ] Responsive: stacked layout on mobile

## Technical Notes

- Place in `src/features/contact-sales/`
- Add API functions to `src/api/`: `fetchAvailableSlots()`, `bookAppointment()`, `submitContact()`
- Sales expert data can be hardcoded (static content, not from API)

---

# T-019: E2E Testing & Accessibility Audit

## Description

Write end-to-end tests for all major user flows and perform an accessibility audit to ensure WCAG 2.2 AA compliance across all pages.

## Spec Reference

All specs (US-01 through US-05)

## Agent Assignment

Agent: `frontend`

## Dependencies

- T-013 (Product Finder page)
- T-014 (Product Catalog page)
- T-015 (Product Detail page)
- T-016 (Product Compare page)
- T-017 (Appointment & contact API endpoints)
- T-018 (Contact Sales page)

## Acceptance Criteria

- [ ] E2E test: Navigate between all pages via header navigation
- [ ] E2E test: Search and filter products on the Product Finder page
- [ ] E2E test: Browse catalog, switch views, paginate
- [ ] E2E test: View product detail, navigate via breadcrumbs
- [ ] E2E test: Add products to comparison, view comparison table
- [ ] E2E test: Book an appointment (3-step flow)
- [ ] E2E test: Send a contact message
- [ ] Accessibility: All interactive elements have keyboard navigation
- [ ] Accessibility: All form inputs have associated labels
- [ ] Accessibility: Focus indicators visible on all focusable elements
- [ ] Accessibility: Color is not the sole indicator of state
- [ ] Accessibility: Minimum touch target sizes met

## Technical Notes

- Use Playwright for E2E tests
- Place tests in `tests/e2e/`
- Run accessibility checks with `@axe-core/playwright`
