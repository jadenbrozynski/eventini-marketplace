'use client';

import { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Users,
  MapPin,
  Calendar,
  X,
  Check,
} from 'lucide-react';

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const EVENT_TYPES = [
  { id: 'wedding', label: 'Wedding', color: 'bg-pink-500' },
  { id: 'corporate', label: 'Corporate', color: 'bg-blue-500' },
  { id: 'party', label: 'Party', color: 'bg-purple-500' },
  { id: 'special', label: 'Special', color: 'bg-amber-500' },
];

const TIME_OPTIONS = [
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
  '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM',
];

interface Event {
  id: string;
  title: string;
  time: string;
  type: string;
  client: string;
  guests: number;
  status: string;
  location: string;
}

const typeStyles: Record<string, { dot: string; bg: string; text: string }> = {
  wedding: { dot: 'bg-pink-500', bg: 'bg-pink-50', text: 'text-pink-700' },
  corporate: { dot: 'bg-blue-500', bg: 'bg-blue-50', text: 'text-blue-700' },
  party: { dot: 'bg-purple-500', bg: 'bg-purple-50', text: 'text-purple-700' },
  special: { dot: 'bg-amber-500', bg: 'bg-amber-50', text: 'text-amber-700' },
};

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMonth, setPickerMonth] = useState(new Date());
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [events, setEvents] = useState<Record<string, Event[]>>({
    '2026-02-03': [
      { id: '1', title: 'Wedding Reception', time: '4:00 PM', type: 'wedding', client: 'Sarah Johnson', guests: 150, status: 'confirmed', location: 'Grand Ballroom' },
    ],
    '2026-02-04': [
      { id: '2', title: 'Corporate Event', time: '9:00 AM', type: 'corporate', client: 'Tech Corp Inc.', guests: 75, status: 'pending', location: 'Conference Center' },
    ],
    '2026-02-05': [
      { id: '7', title: 'Team Meeting', time: '2:00 PM', type: 'corporate', client: 'Internal', guests: 12, status: 'confirmed', location: 'Office' },
    ],
    '2026-02-06': [
      { id: '8', title: 'Site Visit', time: '10:00 AM', type: 'special', client: 'New Venue', guests: 4, status: 'confirmed', location: 'TBD' },
    ],
    '2026-02-08': [
      { id: '3', title: 'Birthday Party', time: '6:00 PM', type: 'party', client: 'Mike Thompson', guests: 40, status: 'confirmed', location: 'Rooftop Lounge' },
    ],
    '2026-02-14': [
      { id: '4', title: 'Valentine Dinner', time: '7:00 PM', type: 'special', client: 'Restaurant Event', guests: 80, status: 'confirmed', location: 'Private Dining' },
    ],
    '2026-02-15': [
      { id: '5', title: 'Anniversary', time: '5:00 PM', type: 'special', client: 'The Garcias', guests: 25, status: 'pending', location: 'Garden Terrace' },
      { id: '6', title: 'Corporate Lunch', time: '12:00 PM', type: 'corporate', client: 'ABC Company', guests: 50, status: 'confirmed', location: 'Main Hall' },
    ],
  });

  // New event form state
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'wedding',
    date: '',
    time: '10:00 AM',
    client: '',
    guests: '',
    location: '',
  });

  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Set default date when opening modal
  useEffect(() => {
    if (showNewEventModal) {
      setNewEvent(prev => ({
        ...prev,
        date: formatDateKey(selectedDate),
      }));
    }
  }, [showNewEventModal, selectedDate]);

  const getWeekDates = (date: Date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startingDay = firstDay.getDay();

    const days: (Date | null)[] = [];
    for (let i = 0; i < startingDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  };

  const formatDateKey = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const formatDateForInput = (dateKey: string) => {
    const [year, month, day] = dateKey.split('-');
    return `${MONTHS[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
  };

  const weekDates = getWeekDates(selectedDate);
  const pickerDays = getDaysInMonth(pickerMonth);

  const isToday = (date: Date) => new Date().toDateString() === date.toDateString();
  const isSelected = (date: Date) => selectedDate.toDateString() === date.toDateString();
  const isInWeek = (date: Date) => weekDates.some(d => d.toDateString() === date.toDateString());

  const selectedEvents = events[formatDateKey(selectedDate)] || [];
  const weekEvents = weekDates.flatMap(date => {
    const key = formatDateKey(date);
    return (events[key] || []).map(e => ({ ...e, date }));
  });

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.client || !newEvent.date) return;

    const eventToAdd: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      time: newEvent.time,
      type: newEvent.type,
      client: newEvent.client,
      guests: parseInt(newEvent.guests) || 0,
      status: 'pending',
      location: newEvent.location || 'TBD',
    };

    setEvents(prev => ({
      ...prev,
      [newEvent.date]: [...(prev[newEvent.date] || []), eventToAdd],
    }));

    // Reset form and close modal
    setNewEvent({
      title: '',
      type: 'wedding',
      date: '',
      time: '10:00 AM',
      client: '',
      guests: '',
      location: '',
    });
    setShowNewEventModal(false);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10 xl:px-20 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - 7))}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 7))}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          <div className="relative ml-2" ref={pickerRef}>
            <button
              onClick={() => { setShowPicker(!showPicker); setPickerMonth(selectedDate); }}
              className="text-xl font-semibold text-gray-900 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              {MONTHS[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </button>

            {showPicker && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 z-50 w-80">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setPickerMonth(new Date(pickerMonth.getFullYear(), pickerMonth.getMonth() - 1, 1))}
                    className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-semibold">{MONTHS[pickerMonth.getMonth()]} {pickerMonth.getFullYear()}</span>
                  <button
                    onClick={() => setPickerMonth(new Date(pickerMonth.getFullYear(), pickerMonth.getMonth() + 1, 1))}
                    className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-7 mb-2">
                  {DAYS.map((d, i) => (
                    <div key={i} className="text-center text-xs font-medium text-gray-400 py-2">{d}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {pickerDays.map((date, i) => {
                    if (!date) return <div key={`e-${i}`} className="h-9" />;
                    const hasEvent = events[formatDateKey(date)]?.length > 0;
                    return (
                      <button
                        key={formatDateKey(date)}
                        onClick={() => { setSelectedDate(date); setShowPicker(false); }}
                        className={`h-9 w-9 rounded-full text-sm font-medium mx-auto flex items-center justify-center relative transition-all
                          ${isSelected(date) ? 'bg-[#44646c] text-white' : ''}
                          ${!isSelected(date) && isInWeek(date) ? 'bg-[#44646c]/10' : ''}
                          ${!isSelected(date) && isToday(date) ? 'ring-2 ring-[#44646c] ring-offset-2' : ''}
                          ${!isSelected(date) && !isInWeek(date) && !isToday(date) ? 'hover:bg-gray-100' : ''}
                        `}
                      >
                        {date.getDate()}
                        {hasEvent && !isSelected(date) && (
                          <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#44646c]" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => { setSelectedDate(new Date()); setShowPicker(false); }}
                  className="w-full mt-4 py-2.5 text-sm font-semibold text-[#44646c] bg-[#44646c]/10 rounded-full hover:bg-[#44646c]/20 transition-colors"
                >
                  Go to today
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setShowNewEventModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#44646c] text-white rounded-full hover:bg-[#3a565d] transition-colors text-sm font-semibold shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New event
        </button>
      </div>

      {/* Week Strip */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {weekDates.map((date, i) => {
          const dayEvents = events[formatDateKey(date)] || [];
          const hasEvents = dayEvents.length > 0;

          return (
            <button
              key={i}
              onClick={() => setSelectedDate(date)}
              className={`flex-1 min-w-[100px] py-4 px-3 rounded-2xl text-center transition-all
                ${isSelected(date)
                  ? 'bg-[#44646c] text-white shadow-lg'
                  : isToday(date)
                  ? 'bg-[#44646c]/10 hover:bg-[#44646c]/20'
                  : 'bg-white border border-gray-200 hover:border-[#44646c]/30 hover:shadow-md'
                }`}
            >
              <p className={`text-xs font-medium uppercase tracking-wider ${isSelected(date) ? 'text-white/70' : 'text-gray-500'}`}>
                {DAYS_SHORT[date.getDay()]}
              </p>
              <p className={`text-2xl font-semibold mt-1 ${isSelected(date) ? 'text-white' : isToday(date) ? 'text-[#44646c]' : 'text-gray-900'}`}>
                {date.getDate()}
              </p>
              {hasEvents && (
                <div className="flex justify-center gap-1 mt-2">
                  {dayEvents.slice(0, 3).map((e, idx) => (
                    <div key={idx} className={`w-1.5 h-1.5 rounded-full ${isSelected(date) ? 'bg-white/60' : typeStyles[e.type].dot}`} />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h2>
            <p className="text-sm text-gray-500">{selectedEvents.length} event{selectedEvents.length !== 1 ? 's' : ''} scheduled</p>
          </div>

          {selectedEvents.length === 0 ? (
            <div className="bg-[#44646c]/5 rounded-3xl p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-7 h-7 text-[#44646c]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No events today</h3>
              <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
                Your schedule is clear. Perfect time to add something new.
              </p>
              <button
                onClick={() => setShowNewEventModal(true)}
                className="px-6 py-3 bg-[#44646c] text-white rounded-full text-sm font-semibold hover:bg-[#3a565d] transition-colors"
              >
                Create an event
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedEvents.map((event) => {
                const styles = typeStyles[event.type];
                return (
                  <div
                    key={event.id}
                    className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg hover:border-[#44646c]/20 transition-all cursor-pointer group"
                  >
                    <div className="flex gap-4">
                      <div className={`w-1.5 rounded-full ${styles.dot}`} />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{event.title}</h3>
                            <p className="text-sm text-gray-500 mt-0.5">{event.client}</p>
                          </div>
                          <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                            event.status === 'confirmed'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}>
                            {event.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-gray-400" />
                            {event.time}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users className="w-4 h-4 text-gray-400" />
                            {event.guests} guests
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            {event.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2">
          <div className="sticky top-32">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">This week</h3>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              {weekEvents.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-sm text-gray-500">No events this week</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {weekEvents.map((event) => {
                    const styles = typeStyles[event.type];
                    return (
                      <div
                        key={event.id}
                        onClick={() => setSelectedDate(event.date)}
                        className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-center min-w-[36px]">
                            <p className="text-[10px] font-medium text-gray-400 uppercase">{DAYS_SHORT[event.date.getDay()]}</p>
                            <p className="text-lg font-semibold text-gray-900">{event.date.getDate()}</p>
                          </div>
                          <div className={`w-1 h-10 rounded-full ${styles.dot}`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                            <p className="text-xs text-gray-500">{event.time}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="bg-[#44646c]/5 rounded-2xl p-4">
                <p className="text-2xl font-bold text-[#44646c]">{weekEvents.length}</p>
                <p className="text-xs text-gray-500 mt-1">Total events</p>
              </div>
              <div className="bg-[#44646c]/5 rounded-2xl p-4">
                <p className="text-2xl font-bold text-[#44646c]">
                  {weekEvents.reduce((sum, e) => sum + e.guests, 0)}
                </p>
                <p className="text-xs text-gray-500 mt-1">Total guests</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Event Modal */}
      {showNewEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowNewEventModal(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">New Event</h2>
              <button
                onClick={() => setShowNewEventModal(false)}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Event Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event name
                </label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Wedding Reception"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#44646c] focus:ring-2 focus:ring-[#44646c]/20 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {/* Event Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event type
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {EVENT_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setNewEvent(prev => ({ ...prev, type: type.id }))}
                      className={`py-3 px-2 rounded-xl text-sm font-medium transition-all flex flex-col items-center gap-2 ${
                        newEvent.type === type.id
                          ? 'bg-[#44646c] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full ${newEvent.type === type.id ? 'bg-white' : type.color}`} />
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#44646c] focus:ring-2 focus:ring-[#44646c]/20 outline-none transition-all text-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <select
                    value={newEvent.time}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#44646c] focus:ring-2 focus:ring-[#44646c]/20 outline-none transition-all text-gray-900 bg-white"
                  >
                    {TIME_OPTIONS.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Client Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client name
                </label>
                <input
                  type="text"
                  value={newEvent.client}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, client: e.target.value }))}
                  placeholder="e.g., Sarah Johnson"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#44646c] focus:ring-2 focus:ring-[#44646c]/20 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {/* Guests & Location */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of guests
                  </label>
                  <input
                    type="number"
                    value={newEvent.guests}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, guests: e.target.value }))}
                    placeholder="e.g., 100"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#44646c] focus:ring-2 focus:ring-[#44646c]/20 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., Grand Ballroom"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#44646c] focus:ring-2 focus:ring-[#44646c]/20 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
              <button
                onClick={() => setShowNewEventModal(false)}
                className="flex-1 py-3 px-4 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateEvent}
                disabled={!newEvent.title || !newEvent.client}
                className="flex-1 py-3 px-4 rounded-full bg-[#44646c] text-white font-medium hover:bg-[#3a565d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Create event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
