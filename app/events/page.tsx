'use client';

import { useState, useEffect } from 'react';
import { X, ArrowRight, Mail, Smartphone, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import { useEvents } from '@/hooks/useEvents';
import { useEventEmailSubmit } from '@/hooks/useEventEmailSubmit';
import type { EventiniEvent, EventRole } from '@/types/events';

// --------------- Helpers ---------------

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// --------------- EventCardSkeleton ---------------

function EventCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
      <CardHeader>
        <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-full mt-2" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3 mt-1" />
      </CardHeader>
    </Card>
  );
}

// --------------- EventCard ---------------

function EventCard({
  event,
  role,
  onClick,
}: {
  event: EventiniEvent;
  role: EventRole;
  onClick: () => void;
}) {
  const imgSrc = role === 'host' ? event.hostimg : event.providerimg;

  return (
    <Card
      className="overflow-hidden cursor-pointer transition-shadow hover:shadow-md"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        {imgSrc ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={imgSrc}
            alt={event.eventname}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-base">{event.eventname}</CardTitle>
        <CardDescription className="line-clamp-2">
          {event.eventDescription}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

// --------------- Modal Steps ---------------

type ModalStep = 'email' | 'download' | 'eventlink';

function EventFlowModal({
  event,
  role,
  onClose,
}: {
  event: EventiniEvent;
  role: EventRole;
  onClose: () => void;
}) {
  const isMobile = useIsMobile();
  const { submitEmail, isSubmitting } = useEventEmailSubmit();

  const hasEventLink = role === 'host' && event.eventlink.trim() !== '';
  const [step, setStep] = useState<ModalStep>('email');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  async function handleEmailSubmit() {
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    try {
      await submitEmail(email, event.id, event.eventname, role);
      setStep('download');
    } catch {
      setEmailError('Something went wrong. Please try again.');
    }
  }

  function handleDownloadNext() {
    if (hasEventLink) {
      setStep('eventlink');
    } else {
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="p-6 pt-10">
          {/* ---------- Email Step ---------- */}
          {step === 'email' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-purple-600">
                <Mail className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Enter your email</h2>
              </div>
              <p className="text-sm text-gray-600">
                Enter your email to get access to <strong>{event.eventname}</strong>.
              </p>
              <div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleEmailSubmit();
                  }}
                  className={cn(
                    'w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-purple-500 focus:ring-1 focus:ring-purple-500',
                    emailError ? 'border-red-400' : 'border-gray-300'
                  )}
                />
                {emailError && (
                  <p className="mt-1 text-xs text-red-500">{emailError}</p>
                )}
              </div>
              <Button
                className="w-full"
                onClick={handleEmailSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Continue'}
                {!isSubmitting && <ArrowRight className="w-4 h-4 ml-1" />}
              </Button>
            </div>
          )}

          {/* ---------- Download Step ---------- */}
          {step === 'download' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-purple-600">
                <Download className="w-5 h-5" />
                <h2 className="text-lg font-semibold">
                  {hasEventLink ? 'Step 1: Download the app' : 'Download the app'}
                </h2>
              </div>
              <p className="text-sm text-gray-600">
                {isMobile
                  ? 'Tap the button below to download Eventini.'
                  : 'Scan the QR code with your phone to download Eventini.'}
              </p>

              {isMobile ? (
                <Button asChild className="w-full">
                  <a href={event.applink} target="_blank" rel="noopener noreferrer">
                    <Smartphone className="w-4 h-4 mr-1" />
                    Download Eventini
                  </a>
                </Button>
              ) : (
                <div className="flex justify-center py-4">
                  <QRCodeSVG value={event.applink} size={180} />
                </div>
              )}

              <Button
                variant="outline"
                className="w-full"
                onClick={handleDownloadNext}
              >
                {hasEventLink ? 'Next' : 'Done'}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}

          {/* ---------- Event Link Step (Hosts only) ---------- */}
          {step === 'eventlink' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-purple-600">
                <ArrowRight className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Step 2: Join the event</h2>
              </div>
              <p className="text-sm text-gray-600">
                {isMobile
                  ? 'Tap the button below to join your event in the app.'
                  : 'Scan this QR code with your phone to join the event.'}
              </p>

              {isMobile ? (
                <Button asChild className="w-full">
                  <a href={event.eventlink} target="_blank" rel="noopener noreferrer">
                    <Smartphone className="w-4 h-4 mr-1" />
                    Join Event
                  </a>
                </Button>
              ) : (
                <div className="flex justify-center py-4">
                  <QRCodeSVG value={event.eventlink} size={180} />
                </div>
              )}

              <Button
                variant="outline"
                className="w-full"
                onClick={onClose}
              >
                Done
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --------------- Events Page ---------------

export default function EventsPage() {
  const { events, isLoading, error } = useEvents();
  const [activeRole, setActiveRole] = useState<EventRole>('host');
  const [selectedEvent, setSelectedEvent] = useState<EventiniEvent | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-30">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-20 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Events</h1>
        </div>
      </header>

      {/* Pill Tabs */}
      <div className="px-4 sm:px-6 lg:px-10 xl:px-20 pt-6 pb-2">
        <div className="inline-flex rounded-full border border-gray-200 p-1 bg-gray-50">
          <button
            onClick={() => setActiveRole('host')}
            className={cn(
              'px-5 py-1.5 rounded-full text-sm font-medium transition-colors',
              activeRole === 'host'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            Hosts
          </button>
          <button
            onClick={() => setActiveRole('provider')}
            className={cn(
              'px-5 py-1.5 rounded-full text-sm font-medium transition-colors',
              activeRole === 'provider'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            Providers
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-10 xl:px-20 py-6">
        {error && (
          <p className="text-red-500 text-sm mb-4">
            Failed to load events. Please try again later.
          </p>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : events.length === 0 ? (
          <p className="text-gray-500 text-sm">No events found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                role={activeRole}
                onClick={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />

      {/* Modal */}
      {selectedEvent && (
        <EventFlowModal
          event={selectedEvent}
          role={activeRole}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}
