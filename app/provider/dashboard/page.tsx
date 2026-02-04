'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Plus,
  TrendingUp,
  Users,
  Star,
  ChevronRight,
  Eye,
  MessageSquare,
  DollarSign,
  ArrowUpRight,
  MapPin,
} from 'lucide-react';

const mockBookings = [
  {
    id: '1',
    clientName: 'Sarah Johnson',
    eventType: 'Wedding Reception',
    type: 'wedding',
    date: 'Today',
    time: '4:00 PM',
    status: 'confirmed',
    guestCount: 150,
    location: 'Grand Ballroom',
  },
  {
    id: '2',
    clientName: 'Tech Corp Inc.',
    eventType: 'Corporate Event',
    type: 'corporate',
    date: 'Tomorrow',
    time: '9:00 AM',
    status: 'pending',
    guestCount: 75,
    location: 'Conference Center',
  },
  {
    id: '3',
    clientName: 'Mike Thompson',
    eventType: 'Birthday Party',
    type: 'party',
    date: 'Sat, Feb 8',
    time: '6:00 PM',
    status: 'confirmed',
    guestCount: 40,
    location: 'Rooftop Lounge',
  },
];

const mockMessages = [
  {
    id: '1',
    name: 'Emily Chen',
    message: 'Hi! I wanted to confirm the menu for next Saturday...',
    time: '10m',
    unread: true,
    avatar: 'EC',
  },
  {
    id: '2',
    name: 'David Park',
    message: 'Thank you for the quote. We would like to proceed...',
    time: '1h',
    unread: true,
    avatar: 'DP',
  },
  {
    id: '3',
    name: 'Lisa Martinez',
    message: 'Can you accommodate 20 additional guests?',
    time: '3h',
    unread: false,
    avatar: 'LM',
  },
];

const typeStyles: Record<string, string> = {
  wedding: 'bg-pink-500',
  corporate: 'bg-blue-500',
  party: 'bg-purple-500',
  special: 'bg-amber-500',
};

export default function TodayPage() {
  const [greeting, setGreeting] = useState('Good morning');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    setCurrentDate(new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }));
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-10 xl:px-20 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-sm text-gray-500 mb-1">{currentDate}</p>
          <h1 className="text-2xl font-semibold text-gray-900">
            {greeting}!
          </h1>
        </div>
        <Link
          href="/provider/dashboard/listings/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#44646c] text-white rounded-full hover:bg-[#3a565d] transition-colors text-sm font-semibold shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add listing
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg hover:border-[#44646c]/20 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#44646c]/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#44646c]" />
            </div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" />
              12%
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">8</p>
          <p className="text-sm text-gray-500 mt-1">Upcoming bookings</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg hover:border-[#44646c]/20 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#44646c]/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[#44646c]" />
            </div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" />
              23%
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">$4,280</p>
          <p className="text-sm text-gray-500 mt-1">Revenue this month</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg hover:border-[#44646c]/20 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#44646c]/10 flex items-center justify-center">
              <Eye className="w-5 h-5 text-[#44646c]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">342</p>
          <p className="text-sm text-gray-500 mt-1">Profile views</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg hover:border-[#44646c]/20 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#44646c]/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-[#44646c]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">4.9</p>
          <p className="text-sm text-gray-500 mt-1">Average rating</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Upcoming Bookings */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming bookings</h2>
            <Link
              href="/provider/dashboard/calendar"
              className="text-sm font-medium text-[#44646c] hover:text-[#3a565d] flex items-center gap-1 transition-colors"
            >
              View calendar
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {mockBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg hover:border-[#44646c]/20 transition-all cursor-pointer group"
              >
                <div className="flex gap-4">
                  <div className={`w-1.5 rounded-full ${typeStyles[booking.type]}`} />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{booking.eventType}</h3>
                        <p className="text-sm text-gray-500 mt-0.5">{booking.clientName}</p>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        booking.status === 'confirmed'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {booking.date} · {booking.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-gray-400" />
                        {booking.guestCount} guests
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {booking.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <Link
              href="/provider/dashboard/calendar"
              className="bg-[#44646c]/5 rounded-2xl p-5 hover:bg-[#44646c]/10 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm">
                <Calendar className="w-5 h-5 text-[#44646c]" />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-[#44646c] transition-colors">Manage calendar</h3>
              <p className="text-sm text-gray-500 mt-1">View and edit your schedule</p>
            </Link>
            <Link
              href="/provider/dashboard/listings"
              className="bg-[#44646c]/5 rounded-2xl p-5 hover:bg-[#44646c]/10 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm">
                <TrendingUp className="w-5 h-5 text-[#44646c]" />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-[#44646c] transition-colors">Your listings</h3>
              <p className="text-sm text-gray-500 mt-1">Manage your services</p>
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2">
          <div className="sticky top-32">
            {/* Messages */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
              <Link
                href="/provider/dashboard/messages"
                className="text-sm font-medium text-[#44646c] hover:text-[#3a565d] flex items-center gap-1 transition-colors"
              >
                View all
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              {mockMessages.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500">No new messages</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {mockMessages.map((message) => (
                    <Link
                      key={message.id}
                      href="/provider/dashboard/messages"
                      className="p-4 hover:bg-gray-50 transition-colors flex items-start gap-3 group"
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        message.unread ? 'bg-[#44646c]' : 'bg-gray-200'
                      }`}>
                        <span className={`text-xs font-semibold ${message.unread ? 'text-white' : 'text-gray-600'}`}>
                          {message.avatar}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className={`text-sm ${message.unread ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                            {message.name}
                          </h3>
                          <span className="text-xs text-gray-400 shrink-0">{message.time}</span>
                        </div>
                        <p className={`text-sm truncate mt-0.5 ${message.unread ? 'text-gray-700' : 'text-gray-500'}`}>
                          {message.message}
                        </p>
                      </div>
                      {message.unread && (
                        <div className="w-2 h-2 rounded-full bg-[#44646c] shrink-0 mt-2" />
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Activity Summary */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">This week</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#44646c]/5 rounded-2xl p-4">
                  <p className="text-2xl font-bold text-[#44646c]">3</p>
                  <p className="text-xs text-gray-500 mt-1">Events completed</p>
                </div>
                <div className="bg-[#44646c]/5 rounded-2xl p-4">
                  <p className="text-2xl font-bold text-[#44646c]">265</p>
                  <p className="text-xs text-gray-500 mt-1">Guests served</p>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="mt-6 bg-amber-50 rounded-2xl p-4 border border-amber-100">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-amber-800">Pending confirmation</p>
                  <p className="text-xs text-amber-600 mt-0.5">You have 1 booking waiting for your response</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
