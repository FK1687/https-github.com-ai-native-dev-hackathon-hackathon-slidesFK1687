import { useState, useEffect } from 'react';
import type { AvailableSlot } from '@/types';
import { fetchAvailableSlots, bookAppointment, submitContact } from '@/api';
import { Button, Input, Separator, Skeleton } from '@/components/ui';

type Tab = 'message' | 'appointment';
type Step = 'form' | 'slots' | 'confirm' | 'success';

export function ContactSalesPage(): JSX.Element {
  const [tab, setTab] = useState<Tab>('message');

  // Message form
  const [msgName, setMsgName] = useState('');
  const [msgEmail, setMsgEmail] = useState('');
  const [msgCompany, setMsgCompany] = useState('');
  const [msgSubject, setMsgSubject] = useState('');
  const [msgMessage, setMsgMessage] = useState('');
  const [msgSubmitting, setMsgSubmitting] = useState(false);
  const [msgError, setMsgError] = useState<string | null>(null);
  const [msgSuccess, setMsgSuccess] = useState(false);

  // Appointment flow
  const [aptStep, setAptStep] = useState<Step>('form');
  const [aptName, setAptName] = useState('');
  const [aptEmail, setAptEmail] = useState('');
  const [aptMessage, setAptMessage] = useState('');
  const [slots, setSlots] = useState<AvailableSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [aptSubmitting, setAptSubmitting] = useState(false);
  const [aptError, setAptError] = useState<string | null>(null);
  const [aptResult, setAptResult] = useState<{ id: string; date: string; time: string } | null>(null);

  async function handleMsgSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setMsgSubmitting(true);
    setMsgError(null);
    try {
      await submitContact({ name: msgName, email: msgEmail, company: msgCompany, subject: msgSubject, message: msgMessage });
      setMsgSuccess(true);
    } catch (err) {
      setMsgError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setMsgSubmitting(false);
    }
  }

  function handleAptContinue(): void {
    if (!aptName || !aptEmail) return;
    setAptStep('slots');
    setSlotsLoading(true);
    fetchAvailableSlots()
      .then(setSlots)
      .catch(() => setAptError('Failed to load slots'))
      .finally(() => setSlotsLoading(false));
  }

  function handleDateSelect(date: string): void {
    setSelectedDate(date);
    setSelectedTime('');
  }

  function handleTimeSelect(time: string): void {
    setSelectedTime(time);
    setAptStep('confirm');
  }

  async function handleAptBook(): Promise<void> {
    setAptSubmitting(true);
    setAptError(null);
    try {
      const res = await bookAppointment({ name: aptName, email: aptEmail, date: selectedDate, time: selectedTime, message: aptMessage });
      setAptResult(res.appointment);
      setAptStep('success');
    } catch (err) {
      setAptError(err instanceof Error ? err.message : 'Booking failed');
      setAptStep('slots');
    } finally {
      setAptSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-kleb-gray-900">Contact Sales</h1>
        <p className="text-sm text-kleb-gray-500 mt-1">
          Get in touch with our sales team or book an appointment with a technical expert.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales expert card */}
        <div className="lg:col-span-1">
          <div className="border border-kleb-gray-300 p-6">
            <div className="w-16 h-16 bg-kleb-gray-100 mb-4 flex items-center justify-center">
              <span className="text-2xl text-kleb-gray-400">👤</span>
            </div>
            <h3 className="text-sm font-bold text-kleb-gray-900">Dr. Sarah Fischer</h3>
            <p className="text-xs text-kleb-gray-500 mt-0.5">Technical Sales Manager</p>
            <Separator className="my-4" />
            <div className="space-y-2 text-xs text-kleb-gray-600">
              <p>📧 s.fischer@kleb.com</p>
              <p>📞 +49 211 555 0100</p>
              <p>📍 Düsseldorf, Germany</p>
            </div>
            <Separator className="my-4" />
            <p className="text-xs text-kleb-gray-500">
              15+ years in industrial adhesive solutions. Specializes in automotive, aerospace, and electronics applications.
            </p>
          </div>
        </div>

        {/* Contact forms */}
        <div className="lg:col-span-2">
          {/* Tab bar */}
          <div className="flex border-b border-kleb-gray-300 mb-6">
            <button
              onClick={() => setTab('message')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                tab === 'message'
                  ? 'border-kleb-gray-900 text-kleb-gray-900'
                  : 'border-transparent text-kleb-gray-400 hover:text-kleb-gray-600'
              }`}
            >
              Send Message
            </button>
            <button
              onClick={() => setTab('appointment')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                tab === 'appointment'
                  ? 'border-kleb-gray-900 text-kleb-gray-900'
                  : 'border-transparent text-kleb-gray-400 hover:text-kleb-gray-600'
              }`}
            >
              Book Appointment
            </button>
          </div>

          {/* Message form */}
          {tab === 'message' && !msgSuccess && (
            <form onSubmit={handleMsgSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-kleb-gray-700 mb-1">Name *</label>
                  <Input value={msgName} onChange={(e) => setMsgName(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-kleb-gray-700 mb-1">Email *</label>
                  <Input type="email" value={msgEmail} onChange={(e) => setMsgEmail(e.target.value)} required />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-kleb-gray-700 mb-1">Company</label>
                  <Input value={msgCompany} onChange={(e) => setMsgCompany(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-kleb-gray-700 mb-1">Subject</label>
                  <Input value={msgSubject} onChange={(e) => setMsgSubject(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-kleb-gray-700 mb-1">Message *</label>
                <textarea
                  value={msgMessage}
                  onChange={(e) => setMsgMessage(e.target.value)}
                  required
                  rows={5}
                  className="w-full border border-kleb-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-kleb-gray-900 bg-kleb-white"
                />
              </div>
              {msgError && <p className="text-xs text-red-600">{msgError}</p>}
              <Button type="submit" disabled={msgSubmitting}>
                {msgSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          )}

          {tab === 'message' && msgSuccess && (
            <div className="border border-kleb-green bg-kleb-green/5 p-8 text-center">
              <p className="text-lg font-bold text-kleb-gray-900 mb-2">Message Sent!</p>
              <p className="text-sm text-kleb-gray-500">We'll get back to you within 1 business day.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => { setMsgSuccess(false); setMsgName(''); setMsgEmail(''); setMsgCompany(''); setMsgSubject(''); setMsgMessage(''); }}
              >
                Send Another
              </Button>
            </div>
          )}

          {/* Appointment booking */}
          {tab === 'appointment' && aptStep === 'form' && (
            <div className="space-y-4">
              <p className="text-sm text-kleb-gray-500">Step 1 of 3 — Your Details</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-kleb-gray-700 mb-1">Name *</label>
                  <Input value={aptName} onChange={(e) => setAptName(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-kleb-gray-700 mb-1">Email *</label>
                  <Input type="email" value={aptEmail} onChange={(e) => setAptEmail(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-kleb-gray-700 mb-1">Message (optional)</label>
                <textarea
                  value={aptMessage}
                  onChange={(e) => setAptMessage(e.target.value)}
                  rows={3}
                  className="w-full border border-kleb-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-kleb-gray-900 bg-kleb-white"
                />
              </div>
              <Button onClick={handleAptContinue} disabled={!aptName || !aptEmail}>
                Continue to Select Time
              </Button>
            </div>
          )}

          {tab === 'appointment' && aptStep === 'slots' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-kleb-gray-500">Step 2 of 3 — Select a Time</p>
                <button onClick={() => setAptStep('form')} className="text-xs text-kleb-green-dark hover:underline">
                  ← Back
                </button>
              </div>

              {slotsLoading ? (
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              ) : (
                <div className="space-y-3">
                  {slots.map((slot) => (
                    <div key={slot.date} className="border border-kleb-gray-300 p-4">
                      <p className="text-sm font-medium text-kleb-gray-900 mb-2">
                        {new Date(slot.date + 'T00:00:00').toLocaleDateString('en-US', {
                          weekday: 'long', month: 'long', day: 'numeric',
                        })}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {slot.times.map((time) => (
                          <button
                            key={time}
                            onClick={() => { handleDateSelect(slot.date); handleTimeSelect(time); }}
                            className={`px-3 py-1.5 text-xs border transition-colors ${
                              selectedDate === slot.date && selectedTime === time
                                ? 'bg-kleb-gray-900 text-kleb-white border-kleb-gray-900'
                                : 'border-kleb-gray-300 hover:bg-kleb-gray-50'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {aptError && <p className="text-xs text-red-600 mt-3">{aptError}</p>}
            </div>
          )}

          {tab === 'appointment' && aptStep === 'confirm' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-kleb-gray-500">Step 3 of 3 — Confirm</p>
                <button onClick={() => setAptStep('slots')} className="text-xs text-kleb-green-dark hover:underline">
                  ← Change Time
                </button>
              </div>
              <div className="border border-kleb-gray-300 p-6 space-y-3">
                <p className="text-sm"><span className="text-kleb-gray-400">Name:</span> {aptName}</p>
                <p className="text-sm"><span className="text-kleb-gray-400">Email:</span> {aptEmail}</p>
                <p className="text-sm">
                  <span className="text-kleb-gray-400">Date:</span>{' '}
                  {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
                  })}
                </p>
                <p className="text-sm"><span className="text-kleb-gray-400">Time:</span> {selectedTime}</p>
                {aptMessage && <p className="text-sm"><span className="text-kleb-gray-400">Note:</span> {aptMessage}</p>}
              </div>
              {aptError && <p className="text-xs text-red-600 mt-3">{aptError}</p>}
              <Button className="mt-4" onClick={handleAptBook} disabled={aptSubmitting}>
                {aptSubmitting ? 'Booking...' : 'Confirm Appointment'}
              </Button>
            </div>
          )}

          {tab === 'appointment' && aptStep === 'success' && aptResult && (
            <div className="border border-kleb-green bg-kleb-green/5 p-8 text-center">
              <p className="text-lg font-bold text-kleb-gray-900 mb-2">Appointment Confirmed!</p>
              <p className="text-sm text-kleb-gray-500 mb-1">
                {new Date(aptResult.date + 'T00:00:00').toLocaleDateString('en-US', {
                  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
                })} at {aptResult.time}
              </p>
              <p className="text-xs text-kleb-gray-400 font-[var(--font-family-mono)]">
                Booking ID: {aptResult.id}
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => { setAptStep('form'); setAptResult(null); setSelectedDate(''); setSelectedTime(''); }}
              >
                Book Another
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactSalesPage;
